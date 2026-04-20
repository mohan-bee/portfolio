import fs from "node:fs";
import path from "node:path";

import { AUTHOR, ORGS } from "../src/contrib-config.js";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_PATH = path.join(ROOT, "src", "data", "contrib-impact.json");

function die(msg) {
  process.stderr.write(`${msg}\n`);
  process.exit(1);
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function parseRepoFullFromHtmlUrl(htmlUrl) {
  const m = String(htmlUrl || "").match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/(pull|issues)\//);
  return m?.[1] || null;
}

async function ghSearch(org, q) {
  // Example: org:tscircuit is:pr is:merged author:mohan-bee
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(`org:${org} ${q} author:${AUTHOR}`)}&per_page=100`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : null),
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.items || [];
}

async function geminiGenerate({ org, number, title, url }) {
  if (!API_KEY) die("GEMINI_API_KEY is required to generate impact (set it in env).");

  const prompt = [
    "You are helping write a portfolio contribution summary.",
    "Given a GitHub pull request title, infer the likely impact in simple org terms.",
    "Return ONLY valid JSON with keys: impactLevel, impactSummary.",
    "impactLevel must be one of: High, Medium, Low.",
    "impactSummary must be 1 short sentence (max 14 words), easy to understand.",
    "Avoid jargon and do not mention AI.",
    "If unsure, pick Medium.",
    "",
    `Org: ${org}`,
    `PR: #${number}`,
    `Title: ${title}`,
    `URL: ${url}`,
  ].join("\n");

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const res = await fetch(MODEL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gemini API ${res.status} ${res.statusText}: ${t}`);
  }

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.map(p => p?.text).filter(Boolean).join("\n") || "";

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Try to extract a JSON object if model wrapped it.
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) throw new Error(`Gemini returned non-JSON: ${text.slice(0, 200)}`);
    parsed = JSON.parse(text.slice(start, end + 1));
  }

  const level = String(parsed.impactLevel || "").trim();
  const summary = String(parsed.impactSummary || "").trim();

  const allowed = new Set(["High", "Medium", "Low"]);
  return {
    impactLevel: allowed.has(level) ? level : "Medium",
    impactSummary: summary ? summary.replace(/\s+/g, " ") : "Improves reliability for the organization.",
  };
}

async function main() {
  if (!API_KEY) {
    process.stdout.write("GEMINI_API_KEY not set. Skipping impact generation.\n");
    return;
  }

  const existing = readJson(OUT_PATH, { version: 1, items: {} });
  const items = existing.items || {};

  // Only score merged PRs.
  const mergedPRs = [];
  for (const o of ORGS) {
    const prs = await ghSearch(o.org, "is:pr is:merged");
    for (const pr of prs) {
      const repoFull = parseRepoFullFromHtmlUrl(pr.html_url);
      if (!repoFull) continue;
      mergedPRs.push({
        org: o.org,
        repoFull,
        number: pr.number,
        title: pr.title,
        url: pr.html_url,
        createdAt: pr.created_at,
        orgName: o.name,
      });
    }
  }

  // Detect new PRs not in cache.
  const missing = mergedPRs.filter(pr => !items[`${pr.repoFull}#${pr.number}`]);
  if (missing.length === 0) {
    process.stdout.write("No new merged PRs. Impact cache unchanged.\n");
    return;
  }

  process.stdout.write(`Generating impact for ${missing.length} new merged PR(s)…\n`);
  for (const pr of missing) {
    const key = `${pr.repoFull}#${pr.number}`;
    const impact = await geminiGenerate(pr);
    items[key] = {
      org: pr.org,
      repoFull: pr.repoFull,
      id: pr.number,
      title: pr.title,
      url: pr.url,
      orgName: pr.orgName,
      impactLevel: impact.impactLevel,
      impactSummary: impact.impactSummary,
      generatedAt: new Date().toISOString(),
    };
    // Write incrementally so we don't lose progress on failures.
    writeJson(OUT_PATH, { version: 1, items });
  }

  process.stdout.write(`Wrote ${OUT_PATH}\n`);
}

main().catch((e) => {
  process.stderr.write(`${e?.stack || e}\n`);
  process.exit(1);
});
