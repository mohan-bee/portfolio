import { useMemo, useState, useEffect, useCallback, useRef } from "react";

import impactCache from "./data/contrib-impact.json";
import { AUTHOR, ORGS } from "./contrib-config";

const GITROLL_PROFILE_URL = "https://gitroll.io/profile/uZEvGpS36uSU2V0iQdA2VmJMQnnO2";
const BALL_BALANCER_URL = "https://ball-balancer-1.onrender.com/";
const BALL_BALANCER_REPO = "https://github.com/mohan-bee/ball-balancer";
const CLICK_SOUND_URL = "/pixel-click.mp3";
const RESUME_URL = "https://docs.google.com/document/d/1Y8Xy0hZumlHN0LGPVZlCUlsmw6DPk83Lfe886rsB1oY/edit?usp=sharing";
const GITROLL_FALLBACK = {
  score: "7.32",
  india: "54",
  lpu: "1",
};
const CONTRIB_CACHE_KEY = `mohan-bee:github-contribs:${ORGS.map((o) => o.org).join(",")}`;
const CONTRIB_CACHE_TTL = 1000 * 60 * 60 * 12;

const pixelPaths = {
  close: [
    [4, 4, 2, 2], [6, 6, 2, 2], [8, 8, 2, 2], [10, 10, 2, 2],
    [10, 4, 2, 2], [8, 6, 2, 2], [6, 8, 2, 2], [4, 10, 2, 2],
  ],
  email: [[2, 4, 12, 8], [4, 6, 2, 2], [10, 6, 2, 2], [6, 8, 4, 2], [2, 4, 12, 1]],
  github: [[5, 3, 6, 2], [3, 5, 10, 5], [4, 10, 3, 2], [9, 10, 3, 2], [7, 12, 2, 2], [4, 2, 2, 2], [10, 2, 2, 2]],
  linkedin: [[2, 6, 3, 8], [2, 3, 3, 2], [7, 6, 3, 8], [10, 6, 3, 2], [12, 8, 2, 6]],
  download: [[7, 2, 2, 7], [5, 7, 6, 2], [6, 9, 4, 2], [3, 12, 10, 2], [3, 10, 2, 2], [11, 10, 2, 2]],
  arrow: [[3, 7, 8, 2], [9, 5, 2, 2], [11, 7, 2, 2], [9, 9, 2, 2]],
  pr: [[3, 2, 3, 3], [4, 5, 1, 6], [3, 11, 3, 3], [10, 2, 3, 3], [11, 5, 1, 3], [8, 7, 5, 2], [8, 6, 1, 4], [7, 5, 2, 2]],
  issue: [[5, 2, 6, 2], [3, 4, 2, 6], [11, 4, 2, 6], [5, 10, 6, 2], [7, 6, 2, 2]],
  check: [[3, 8, 2, 2], [5, 10, 2, 2], [7, 8, 2, 2], [9, 6, 2, 2], [11, 4, 2, 2]],
  spark: [[7, 1, 2, 4], [7, 11, 2, 4], [1, 7, 4, 2], [11, 7, 4, 2], [6, 6, 4, 4]],
  sliders: [[2, 4, 12, 1], [4, 3, 2, 3], [2, 8, 12, 1], [9, 7, 2, 3], [2, 12, 12, 1], [6, 11, 2, 3]],
  search: [[4, 3, 5, 1], [3, 4, 1, 5], [9, 4, 1, 5], [4, 9, 5, 1], [9, 10, 2, 2], [11, 12, 2, 2]],
  sort: [[3, 3, 8, 1], [5, 5, 6, 1], [7, 7, 4, 1], [5, 10, 6, 1], [3, 12, 8, 1]],
  doc: [[3, 2, 7, 12], [10, 4, 3, 10], [10, 2, 1, 3], [6, 7, 5, 1], [6, 10, 5, 1]],
  rust: [[7, 2, 2, 12], [2, 7, 12, 2], [4, 4, 2, 2], [10, 4, 2, 2], [4, 10, 2, 2], [10, 10, 2, 2], [6, 6, 4, 4]],
  ts: [[2, 2, 12, 12], [4, 5, 8, 2], [7, 7, 2, 5], [10, 9, 3, 1], [10, 11, 3, 1]],
  py: [[4, 2, 7, 5], [3, 5, 4, 4], [5, 3, 1, 1], [5, 9, 7, 5], [9, 7, 4, 4], [10, 12, 1, 1]],
  menu: [[2, 4, 12, 2], [2, 7, 12, 2], [2, 10, 12, 2]],
  heart: [[3, 3, 3, 2], [10, 3, 3, 2], [2, 5, 12, 3], [4, 8, 8, 2], [6, 10, 4, 2], [7, 12, 2, 1]],
  trophy: [[5, 2, 6, 2], [4, 4, 8, 2], [3, 4, 2, 4], [11, 4, 2, 4], [5, 6, 6, 3], [7, 9, 2, 3], [5, 12, 6, 2]],
  flag: [[3, 2, 2, 12], [5, 3, 8, 2], [5, 5, 6, 2], [5, 7, 8, 2], [3, 13, 6, 1]],
  school: [[2, 6, 12, 2], [4, 8, 8, 5], [5, 4, 6, 2], [7, 2, 2, 2], [2, 13, 12, 1], [6, 10, 4, 3]],
  ballTilt: [[8, 3, 4, 4], [7, 4, 1, 2], [4, 11, 10, 2], [3, 10, 3, 1], [10, 9, 3, 1], [2, 13, 2, 1], [12, 13, 2, 1]],
  fullscreen: [[2, 2, 5, 2], [2, 2, 2, 5], [9, 2, 5, 2], [12, 2, 2, 5], [2, 12, 5, 2], [2, 9, 2, 5], [9, 12, 5, 2], [12, 9, 2, 5]],
  briefcase: [[3, 5, 10, 8], [5, 3, 6, 2], [2, 7, 12, 2], [7, 8, 2, 2], [3, 12, 10, 2]],
  lab: [[7, 2, 2, 5], [5, 7, 6, 2], [4, 9, 8, 4], [3, 13, 10, 1], [6, 4, 4, 1]],
};

function PxIcon({ name, size = 18, title }) {
  const rects = pixelPaths[name] || pixelPaths.spark;
  return (
    <svg className="px-icon" width={size} height={size} viewBox="0 0 16 16" role={title ? "img" : "presentation"} aria-label={title}>
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} />
      ))}
    </svg>
  );
}

function parseRepoFullFromHtmlUrl(htmlUrl) {
  const m = String(htmlUrl || "").match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/(pull|issues)\//);
  return m?.[1] || null;
}

async function fetchOrgContribs(org) {
  const h = { Accept: "application/vnd.github+json" };
  const [prRes, issRes] = await Promise.all([
    fetch(`https://api.github.com/search/issues?q=org:${org}+author:${AUTHOR}+is:pr&per_page=100`, { headers: h }),
    fetch(`https://api.github.com/search/issues?q=org:${org}+author:${AUTHOR}+is:issue&per_page=100`, { headers: h }),
  ]);

  if (!prRes.ok || !issRes.ok) {
    const s = [prRes, issRes].find((r) => !r.ok);
    const t = await s.text().catch(() => "");
    return { prs: [], issues: [], error: `GitHub API error (${s.status}): ${t || s.statusText}` };
  }

  const [prData, issData] = await Promise.all([prRes.json(), issRes.json()]);
  const msg = prData?.message || issData?.message;
  if (msg) return { prs: [], issues: [], error: `GitHub API: ${msg}` };

  return {
    prs: (prData.items || []).map((i) => ({
      gid: i.id,
      id: i.number,
      title: i.title,
      url: i.html_url,
      state: i.state,
      merged: Boolean(i.pull_request?.merged_at),
      date: i.created_at?.slice(0, 10),
      org,
      repoFull: parseRepoFullFromHtmlUrl(i.html_url),
    })),
    issues: (issData.items || []).map((i) => ({
      gid: i.id,
      id: i.number,
      title: i.title,
      url: i.html_url,
      state: i.state,
      merged: false,
      date: i.created_at?.slice(0, 10),
      org,
      repoFull: parseRepoFullFromHtmlUrl(i.html_url),
    })),
  };
}

function readContribCache({ allowStale = false } = {}) {
  try {
    const cached = JSON.parse(localStorage.getItem(CONTRIB_CACHE_KEY) || "null");
    if (!cached?.data || !cached?.savedAt) return null;
    if (!allowStale && Date.now() - cached.savedAt > CONTRIB_CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeContribCache(data) {
  try {
    localStorage.setItem(CONTRIB_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Ignore storage failures; the live GitHub result is still usable.
  }
}

async function fetchAllContribs() {
  const freshCache = readContribCache();
  if (freshCache) return { data: freshCache, cached: true };

  const results = await Promise.all(ORGS.map((o) => fetchOrgContribs(o.org)));
  if (results.some((result) => result?.error)) {
    const staleCache = readContribCache({ allowStale: true });
    if (staleCache) return { data: staleCache, cached: true, stale: true };
  } else {
    writeContribCache(results);
  }

  return { data: results, cached: false };
}

function parseGitRollStats(html) {
  const decoded = html
    .replaceAll("&amp;", "&")
    .replaceAll("\\u0026", "&");

  const score = decoded.match(/overallScore=([0-9.]+)/)?.[1]
    || decoded.match(/"score":([0-9.]+)/)?.[1];
  const india = decoded.match(/regionRank=([0-9.]+),IN/)?.[1];
  const lpu = decoded.match(/schoolRank=([0-9.]+),lpu/i)?.[1];

  return {
    score: score ? Number(score).toFixed(2) : GITROLL_FALLBACK.score,
    india: india || GITROLL_FALLBACK.india,
    lpu: lpu || GITROLL_FALLBACK.lpu,
  };
}

async function fetchGitRollStats() {
  const res = await fetch(GITROLL_PROFILE_URL);
  if (!res.ok) throw new Error(`GitRoll returned ${res.status}`);
  return parseGitRollStats(await res.text());
}

function Popup({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="pixel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-modal__bar">
          <span>{title}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <PxIcon name="close" />
          </button>
        </div>
        <div className="pixel-modal__body">{children}</div>
      </section>
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button className={`pixel-pill ${active ? "is-active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function MonoBadge({ label, tone = "subtle" }) {
  return <span className={`mono-badge mono-badge--${tone}`}>{label}</span>;
}

function ContribContent({ contribs, loading }) {
  const [org, setOrg] = useState("all");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const [impact, setImpact] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");

  const rows = useMemo(() => {
    const orgs = ORGS.map((o, i) => ({ ...o, data: contribs[i] }));
    const selected = org === "all" ? orgs : orgs.filter((o) => o.org === org);

    let out = [];
    for (const o of selected) {
      const prs = (o.data?.prs || []).map((p) => ({ ...p, _kind: "pr", _org: o.name }));
      const issues = (o.data?.issues || []).map((it) => ({ ...it, _kind: "issue", _org: o.name }));
      out = out.concat(kind === "issue" ? issues : kind === "pr" ? prs : prs.concat(issues));
    }

    const q = query.trim().toLowerCase();
    if (q) out = out.filter((r) => (r.title || "").toLowerCase().includes(q));

    if (status !== "all") {
      out = out.filter((r) => {
        if (status === "merged") return r._kind === "pr" && r.merged;
        if (status === "open") return r.state === "open" && !(r._kind === "pr" && r.merged);
        if (status === "closed") return r.state === "closed" && !(r._kind === "pr" && r.merged);
        return true;
      });
    }

    if (impact !== "all") {
      out = out.filter((r) => {
        if (r._kind !== "pr") return false;
        const key = r.repoFull ? `${r.repoFull}#${r.id}` : null;
        const lvl = key ? (impactCache?.items?.[key]?.impactLevel || "").toLowerCase() : "";
        return lvl === impact;
      });
    }

    out.sort((a, b) => {
      const da = a.date || "";
      const db = b.date || "";
      if (da === db) return 0;
      return sort === "new" ? (da < db ? 1 : -1) : da < db ? -1 : 1;
    });

    return out;
  }, [contribs, org, kind, status, impact, query, sort]);

  if (loading) {
    return (
      <div className="loading-row">
        <span className="pixel-loader" />
        Fetching GitHub data
      </div>
    );
  }

  return (
    <div className="contrib-panel">
      {contribs.some((c) => c?.error) && (
        <div className="notice">Some org data failed to load, often because of GitHub rate limits.</div>
      )}

      <div className="contrib-head">
        <MonoBadge label="18 merged PRs" tone="strong" />
        <span>Across {ORGS.map((o) => o.name).join(" / ")}</span>
      </div>

      <div className="filter-grid">
        <span className="filter-label"><PxIcon name="sliders" /> Filters</span>
        <div className="pill-group">
          <Pill active={org === "all"} onClick={() => setOrg("all")}>All orgs</Pill>
          {ORGS.map((o) => <Pill key={o.org} active={org === o.org} onClick={() => setOrg(o.org)}>{o.name}</Pill>)}
        </div>
        <div className="pill-group">
          <Pill active={kind === "all"} onClick={() => setKind("all")}><PxIcon name="spark" /> All</Pill>
          <Pill active={kind === "pr"} onClick={() => setKind("pr")}><PxIcon name="pr" /> PRs</Pill>
          <Pill active={kind === "issue"} onClick={() => setKind("issue")}><PxIcon name="issue" /> Issues</Pill>
        </div>
        <div className="pill-group">
          <Pill active={status === "all"} onClick={() => setStatus("all")}>All</Pill>
          <Pill active={status === "open"} onClick={() => setStatus("open")}>Open</Pill>
          <Pill active={status === "closed"} onClick={() => setStatus("closed")}>Closed</Pill>
          <Pill active={status === "merged"} onClick={() => setStatus("merged")}><PxIcon name="check" /> Merged</Pill>
        </div>
        <div className="pill-group">
          <Pill active={impact === "all"} onClick={() => setImpact("all")}><PxIcon name="spark" /> Impact</Pill>
          <Pill active={impact === "high"} onClick={() => setImpact("high")}>High</Pill>
          <Pill active={impact === "medium"} onClick={() => setImpact("medium")}>Medium</Pill>
          <Pill active={impact === "low"} onClick={() => setImpact("low")}>Low</Pill>
        </div>
        <div className="search-box">
          <PxIcon name="search" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search titles" />
          <button className="tiny-btn" onClick={() => setSort((s) => (s === "new" ? "old" : "new"))}>
            <PxIcon name="sort" /> {sort === "new" ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      <div className="contrib-list">
        {rows.length === 0 && <p className="empty">No results for the current filters.</p>}
        {rows.map((r) => {
          const key = r.repoFull ? `${r.repoFull}#${r.id}` : null;
          const impactInfo = r._kind === "pr" ? impactCache?.items?.[key] : null;
          const impactLevel = impactInfo?.impactLevel || null;
          const impactSummary = impactInfo?.impactSummary || null;
          const isMerged = r._kind === "pr" && r.merged;

          return (
            <a className="contrib-row" key={`${r._kind}-${r.repoFull || r.org}-${r.gid || r.id}`} href={r.url} target="_blank" rel="noopener noreferrer">
              <span className="row-icon"><PxIcon name={r._kind === "pr" ? "pr" : "issue"} /></span>
              <span className="row-main">
                <span className="row-title">{r.title}</span>
                <span className="row-badges">
                  <MonoBadge label={`#${r.id}`} />
                  {r.date && <MonoBadge label={r.date} tone="muted" />}
                  <MonoBadge label={isMerged ? "merged" : r.state} tone={isMerged ? "strong" : "subtle"} />
                  {r._kind === "pr" && <MonoBadge label={impactLevel ? `impact: ${impactLevel}` : "impact: TBD"} tone="muted" />}
                </span>
                {impactSummary && <span className="row-summary"><PxIcon name="spark" /> {impactSummary}</span>}
              </span>
              <span className="row-repo">{r.repoFull || r._org}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Resume preview is disabled for now; the Resume buttons redirect to the Google Doc.
// function ResumeViewer({ onClose }) {
//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);
//
//   return (
//     <div className="resume-viewer">
//       <div className="resume-bar">
//         <span><PxIcon name="doc" /> Resume / Mohanraj</span>
//         <div className="resume-actions">
//           <a className="pixel-button pixel-button--small" href="/Mohanraj.pdf" download><PxIcon name="download" /> Download</a>
//           <button className="pixel-button pixel-button--small" onClick={onClose}><PxIcon name="close" /> Close</button>
//         </div>
//       </div>
//       <iframe src="/Mohanraj.pdf" title="Resume" />
//     </div>
//   );
// }

function ProjectPreview({ onClose }) {
  const frameShellRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const openFullscreen = () => {
    frameShellRef.current?.requestFullscreen?.();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal__bar">
          <span><PxIcon name="ballTilt" /> Ball Balancer</span>
          <div className="project-actions">
            <a className="icon-btn" href={BALL_BALANCER_REPO} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub repository" title="GitHub repository">
              <PxIcon name="github" />
            </a>
            <button className="icon-btn" type="button" onClick={openFullscreen} aria-label="Open preview fullscreen" title="Fullscreen">
              <PxIcon name="fullscreen" />
            </button>
            <button className="icon-btn" type="button" onClick={onClose} aria-label="Close project preview" title="Close">
              <PxIcon name="close" />
            </button>
          </div>
        </div>
        <div className="project-frame-shell" ref={frameShellRef}>
          <iframe src={BALL_BALANCER_URL} title="Ball Balancer project preview" allow="fullscreen" />
        </div>
      </section>
    </div>
  );
}

function TrayBtn({ label, sub, onClick, icon }) {
  return (
    <button className="tray-btn" onClick={onClick}>
      <span className="tray-btn__icon"><PxIcon name={icon} size={22} /></span>
      <span className="tray-btn__copy">
        <span>{label}</span>
        {sub && <small>{sub}</small>}
      </span>
      <PxIcon name="arrow" />
    </button>
  );
}

function LoadingPips({ label = "Loading" }) {
  return (
    <span className="loading-pips" aria-label={label}>
      <i /><i /><i />
    </span>
  );
}

function formatPresentDuration(startYear, startMonthIndex) {
  const now = new Date();
  const months = Math.max(1, (now.getFullYear() - startYear) * 12 + now.getMonth() - startMonthIndex + 1);
  return `${months} ${months === 1 ? "mo" : "mos"}`;
}

function PixelRocket() {
  return (
    <div className="rocket-wrap" aria-hidden="true">
      <div className="bracket bracket--left" />
      <div className="bracket bracket--right" />
      <div className="mission-label">OPEN SOURCE</div>
      <div className="pixel-rocket">
        <span className="r nose" /><span className="r body" /><span className="r window" />
        <span className="r wing-left" /><span className="r wing-right" /><span className="r flame" />
      </div>
      <div className="pixel-dots"><i /><i /><i /><i /></div>
    </div>
  );
}

function ExperienceSection() {
  const maintainerDuration = formatPresentDuration(2026, 4);

  return (
    <section className="experience-section" aria-labelledby="experience-title">
      <div className="section-heading">
        <PxIcon name="briefcase" />
        <h2 id="experience-title">Experience</h2>
      </div>

      <div className="experience-grid">
        <article className="experience-card">
          <div className="experience-logo experience-logo--ts">ts</div>
          <div className="experience-copy">
            <h3>tscircuit</h3>
            <p>San Francisco Bay Area / Remote</p>
            <div className="role-list">
              <div>
                <strong>Maintainer</strong>
                <span>May 2026 - Present / {maintainerDuration}</span>
              </div>
              <div>
                <strong>Contributor</strong>
                <span>Mar 2026 - May 2026 / 3 mos</span>
              </div>
            </div>
          </div>
        </article>

        <article className="experience-card">
          <div className="experience-logo experience-logo--lab">K</div>
          <div className="experience-copy">
            <h3>Kalvium Labs</h3>
            <p>Bengaluru, Karnataka / Hybrid</p>
            <div className="role-list">
              <div>
                <strong>Software Engineer</strong>
                <span>Nov 2025 - Dec 2025 / 2 mos</span>
              </div>
            </div>
            <p className="experience-skills">GCP / Docker / +3 skills</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function App() {
  const [popup, setPopup] = useState(null);
  const [showProject, setShowProject] = useState(false);
  const [contribs, setContribs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gitRoll, setGitRoll] = useState(GITROLL_FALLBACK);
  const close = useCallback(() => setPopup(null), []);

  useEffect(() => {
    const clickTargets = [
      "button",
      "a.pixel-button",
      "a.icon-btn",
      ".tray-btn",
      ".project-card",
      ".pixel-pill",
      ".tiny-btn",
    ].join(",");

    const onClick = (event) => {
      if (!event.target.closest(clickTargets)) return;
      const sound = new Audio(CLICK_SOUND_URL);
      sound.volume = 0.35;
      sound.play().catch(() => {});
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    fetchAllContribs()
      .then(({ data }) => {
        setContribs(data);
        setLoading(false);
      })
      .catch(() => {
        const cached = readContribCache({ allowStale: true });
        if (cached) {
          setContribs(cached);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchGitRollStats()
      .then(setGitRoll)
      .catch(() => setGitRoll(GITROLL_FALLBACK));
  }, []);

  const mergedTotal = contribs.reduce((sum, d) => sum + (d?.prs || []).filter((p) => p.merged).length, 0);

  return (
    <>
      <div className="app-shell">
        <header className="topbar">
          <a className="brand" href="#home" aria-label="Mohan portfolio home">
            <span className="brand-copy">mohan-bee</span>
          </a>
          <nav className="nav-links" aria-label="Portfolio links">
            <a href="mailto:mohn08052006@gmail.com"><PxIcon name="email" /> Mail</a>
            <a href="https://github.com/mohan-bee" target="_blank" rel="noopener noreferrer"><PxIcon name="github" /> GitHub</a>
            <a href="https://www.linkedin.com/in/mohan-a-88b655318" target="_blank" rel="noopener noreferrer"><PxIcon name="linkedin" /> LinkedIn</a>
          </nav>
          <button className="icon-btn nav-menu" aria-label="Menu"><PxIcon name="menu" /></button>
        </header>

        <main className="hero" id="home">
          <section className="hero-copy">
            <button className="project-card" type="button" onClick={() => setShowProject(true)}>
              <span className="project-card__icon"><PxIcon name="ballTilt" size={30} /></span>
              <span className="project-card__copy">
                <strong>Ball Balancer</strong>
                <small>Open project preview</small>
              </span>
              <span className="project-card__repo"><PxIcon name="github" /> mohan-bee/ball-balancer</span>
              <PxIcon name="arrow" />
            </button>
            <div className="gitroll-strip" aria-label="GitRoll profile stats">
              <a href={GITROLL_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                <PxIcon name="spark" /> GitRoll
              </a>
              <span><PxIcon name="trophy" /> Score: {gitRoll.score}</span>
              <span><PxIcon name="flag" /> India: {gitRoll.india}%</span>
              <span><PxIcon name="school" /> LPU: {gitRoll.lpu}%</span>
            </div>
            <p className="eyebrow">Software Engineer | Open Source | Algorithm </p>
            {/* <h1>Minimal, Low level and graphics </h1> */}
            <p className="intro">
              Hi, <b>I am Mohan</b> , a Software Product Engineering student at LPU x Kalvium. I like game dev,
              graphics, operating systems, computer hardware, and open-source work where the logic has teeth.
            </p>
            <div className="cta-row">
              <button className="pixel-button" onClick={() => setPopup("contribs")}>
                <PxIcon name="pr" /> Contributions {loading && <LoadingPips label="Loading GitHub contributions" />}
              </button>
              <a className="pixel-button pixel-button--ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer"><PxIcon name="doc" /> Resume</a>
              <a className="pixel-button pixel-button--ghost" href="https://gitroll.io/profile/uZEvGpS36uSU2V0iQdA2VmJMQnnO2" target="_blank" rel="noopener noreferrer"><PxIcon name="spark" /> GitRoll</a>
            </div>
            <div className="skill-strip">
              <span><PxIcon name="rust" /> Rust</span>
              <span><PxIcon name="ts" /> TypeScript</span>
              <span><PxIcon name="py" /> Python</span>
            </div>
          </section>

          <aside className="side-panel" aria-label="Quick access">
            <PixelRocket />
            <div className="tray">
              <p>Quick Access</p>
              <TrayBtn
                label="Contributions"
                sub={loading ? "Fetching GitHub..." : `${mergedTotal} merged PRs`}
                onClick={() => setPopup("contribs")}
                icon="pr"
              />
              <a className="tray-btn" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                <span className="tray-btn__icon"><PxIcon name="doc" size={22} /></span>
                <span className="tray-btn__copy">
                  <span>Resume</span>
                  <small>Google Doc</small>
                </span>
                <PxIcon name="arrow" />
              </a>
            </div>
            <div className="mini-stats">
              {ORGS.map((org, i) => {
                const d = contribs[i];
                const merged = d ? d.prs.filter((p) => p.merged).length : null;
                return (
                  <div key={org.name} className={loading ? "is-loading" : ""}>
                    <strong>{org.name}</strong>
                    <span>{loading || !d ? <><LoadingPips label={`Loading ${org.name} contributions`} /> fetching</> : `${merged} merged PRs`}</span>
                  </div>
                );
              })}
            </div>
          </aside>
        </main>

        <ExperienceSection />
      </div>

      {popup === "contribs" && (
        <Popup title="Open Source Contributions" onClose={close}>
          <ContribContent contribs={contribs} loading={loading} />
        </Popup>
      )}
      {showProject && <ProjectPreview onClose={() => setShowProject(false)} />}
    </>
  );
}
