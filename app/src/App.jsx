import { useState, useEffect, useCallback } from "react";

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */
const AUTHOR = "mohan-bee";
const ORGS = [
  { name: "tscircuit", repo: "tscircuit/tscircuit.com" },
  { name: "GraphiteEditor", repo: "GraphiteEditor/Graphite" },
];

/* ══════════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════════ */
const Ico = {
  close: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  pr: () => (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z" />
    </svg>
  ),
  issue: () => (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  ),
  merged: () => (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="#a371f7">
      <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
    </svg>
  ),
  rust: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="9" strokeOpacity=".3" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.42 1.42M16.95 16.95l1.41 1.41M5.64 18.36l1.42-1.42M16.95 7.05l1.41-1.41" strokeOpacity=".5" />
    </svg>
  ),
  ts: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10.5 12H7.5v-1.5h7.5V12H12v5h-1.5v-5z" fill="currentColor" stroke="none" />
      <path d="M14.25 16.75c.4.25 1 .5 1.6.5 1.15 0 1.65-.55 1.65-1.3 0-.7-.4-1.1-1.4-1.5-.85-.32-1.1-.5-1.1-.85 0-.28.22-.55.78-.55.45 0 .8.15 1.1.35l.25-.75c-.35-.22-.82-.38-1.35-.38-1.05 0-1.75.6-1.75 1.42 0 .7.5 1.18 1.5 1.52.82.28 1.02.52 1.02.9 0 .42-.32.7-.92.7-.5 0-1-.2-1.38-.45l-.01.39z" fill="currentColor" stroke="none" />
    </svg>
  ),
  py: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2C8.5 2 7 3.8 7 6v2h5v.75H5.5C3.5 8.75 2 10.2 2 13c0 2.8 1.5 4.5 3.5 5l.8-2c-.7-.4-1.3-1.2-1.3-3 0-1.3.7-2.25 1.5-2.25H12v2.5c0 2.2 1.2 3.75 3 3.75h2c1.8 0 3-1.55 3-3.75V6c0-2.2-1.2-4-3-4h-5z" />
      <path d="M12 22c3.5 0 5-1.8 5-4v-2h-5v-.75h6.5c2 0 3.5-1.45 3.5-4.25 0-2.8-1.5-4.5-3.5-5l-.8 2c.7.4 1.3 1.2 1.3 3 0 1.3-.7 2.25-1.5 2.25H12v-2.5c0-2.2-1.2-3.75-3-3.75H7C5.2 7.75 4 9.3 4 11.5V18c0 2.2 1.2 4 3 4h5z" strokeOpacity=".35" />
      <circle cx="9.5" cy="6.25" r=".75" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="17.75" r=".75" fill="currentColor" stroke="none" />
    </svg>
  ),
  email: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
    </svg>
  ),
  github: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  download: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  arrowRight: () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  spin: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ animation: "spin 1s linear infinite" }}>
      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════
   STATUS BADGE
══════════════════════════════════════════════════ */
function Badge({ state, merged, isIssue }) {
  const cfg = merged
    ? { color: "#a371f7", label: "merged", Icon: Ico.merged }
    : state === "closed"
    ? { color: isIssue ? "#a371f7" : "#e5534b", label: "closed", Icon: isIssue ? Ico.merged : null }
    : { color: "#3fb950", label: "open", Icon: null };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 500, color: cfg.color, border: `1px solid ${cfg.color}55`, borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
      {cfg.Icon && <cfg.Icon />}
      {cfg.label}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   GITHUB FETCHER
══════════════════════════════════════════════════ */
async function fetchOrgContribs(repo) {
  const h = { Accept: "application/vnd.github+json" };
  const [prRes, issRes] = await Promise.all([
    fetch(`https://api.github.com/search/issues?q=repo:${repo}+author:${AUTHOR}+type:pr&per_page=20`, { headers: h }),
    fetch(`https://api.github.com/search/issues?q=repo:${repo}+author:${AUTHOR}+type:issue&per_page=20`, { headers: h }),
  ]);
  const [prData, issData] = await Promise.all([prRes.json(), issRes.json()]);
  return {
    prs: (prData.items || []).map(i => ({ id: i.number, title: i.title, url: i.html_url, state: i.state, merged: !!i.pull_request?.merged_at, date: i.created_at?.slice(0, 10) })),
    issues: (issData.items || []).map(i => ({ id: i.number, title: i.title, url: i.html_url, state: i.state, merged: false, date: i.created_at?.slice(0, 10) })),
  };
}

/* ══════════════════════════════════════════════════
   POPUP OVERLAY
══════════════════════════════════════════════════ */
function Popup({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", border: "1px solid #ccc", borderRadius: 10, width: "100%", maxWidth: 680, maxHeight: "82vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #e8e8e8", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", display: "flex", padding: 4 }}>
            <Ico.close />
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "18px 20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CONTRIBUTIONS POPUP CONTENT
══════════════════════════════════════════════════ */
function ContribContent({ contribs, loading }) {
  const [tab, setTab] = useState(0);
  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#666", fontSize: 13, padding: "20px 0" }}>
      <Ico.spin /> Fetching from GitHub API…
    </div>
  );
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {ORGS.map((org, i) => (
          <button key={org.name} onClick={() => setTab(i)}
            style={{ fontSize: 12, fontWeight: 500, padding: "5px 14px", borderRadius: 6, border: `1px solid ${tab === i ? "#111" : "#ccc"}`, background: tab === i ? "#111" : "#fff", color: tab === i ? "#fff" : "#555", cursor: "pointer", fontFamily: "inherit" }}>
            {org.name}
          </button>
        ))}
      </div>

      {contribs[tab] && (() => {
        const { prs, issues } = contribs[tab];
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#555" }}><Ico.pr /></span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>Pull Requests</span>
                <span style={{ fontSize: 11, background: "#f0f0f0", color: "#555", padding: "1px 8px", borderRadius: 20 }}>{prs.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {prs.length === 0 && <p style={{ fontSize: 13, color: "#888", padding: "8px 0" }}>No pull requests found.</p>}
                {prs.map(pr => (
                  <a key={pr.id} href={pr.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 10px", borderRadius: 6, textDecoration: "none" }}>
                    <span style={{ marginTop: 1, flexShrink: 0, color: pr.merged ? "#a371f7" : pr.state === "closed" ? "#e5534b" : "#3fb950" }}><Ico.pr /></span>
                    <span style={{ flex: 1, fontSize: 13, color: "#111", lineHeight: 1.5 }}>{pr.title}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: "#888" }}>#{pr.id}</span>
                      <Badge state={pr.state} merged={pr.merged} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#555" }}><Ico.issue /></span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>Issues</span>
                <span style={{ fontSize: 11, background: "#f0f0f0", color: "#555", padding: "1px 8px", borderRadius: 20 }}>{issues.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {issues.length === 0 && <p style={{ fontSize: 13, color: "#888", padding: "8px 0" }}>No issues found.</p>}
                {issues.map(iss => (
                  <a key={iss.id} href={iss.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 10px", borderRadius: 6, textDecoration: "none" }}>
                    <span style={{ marginTop: 1, flexShrink: 0, color: iss.state === "closed" ? "#a371f7" : "#3fb950" }}><Ico.issue /></span>
                    <span style={{ flex: 1, fontSize: 13, color: "#111", lineHeight: 1.5 }}>{iss.title}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: "#888" }}>#{iss.id}</span>
                      <Badge state={iss.state} merged={false} isIssue />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   RESUME PDF VIEWER
══════════════════════════════════════════════════ */
function ResumeViewer({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#f5f5f5", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 46, background: "#fff", borderBottom: "1px solid #d0d0d0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111", fontFamily: "inherit" }}>Resume — Mohanraj</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/Mohanraj.pdf" download style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#111", textDecoration: "none", border: "1px solid #ccc", borderRadius: 6, padding: "5px 12px", background: "#fff", fontFamily: "inherit" }}>
            <Ico.download /> Download
          </a>
          <button onClick={onClose} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#111", background: "#fff", border: "1px solid #ccc", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>
            <Ico.close /> Close
          </button>
        </div>
      </div>
      <iframe src="/Mohanraj.pdf" title="Resume" style={{ flex: 1, border: "none", width: "100%", background: "#f5f5f5" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TRAY BUTTON
══════════════════════════════════════════════════ */
function TrayBtn({ label, sub, onClick, Icon }) {
  return (
    <button onClick={onClick}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5, padding: "14px 16px", background: "#fff", border: "1px solid #d0d0d0", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <span style={{ color: "#555" }}>{Icon}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1 }}>{label}</span>
        <span style={{ color: "#bbb" }}><Ico.arrowRight /></span>
      </div>
      {sub && <span style={{ fontSize: 11, fontWeight: 400, color: "#888", paddingLeft: 22 }}>{sub}</span>}
    </button>
  );
}

/* ══════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════ */
export default function App() {
  const [popup, setPopup] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [contribs, setContribs] = useState([]);
  const [loading, setLoading] = useState(true);
  const close = useCallback(() => setPopup(null), []);

  useEffect(() => {
    Promise.all(ORGS.map(o => fetchOrgContribs(o.repo)))
      .then(results => { setContribs(results); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }
        body { font-family: 'Poppins', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; }
        @keyframes spin { to { transform: rotate(360deg) } }
        ::-webkit-scrollbar { width: 4px }
        ::-webkit-scrollbar-track { background: #f5f5f5 }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px }
      `}</style>

      <div style={{ height: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto", overflow: "hidden" }}>

        {/* TOP BAR */}
        <header style={{ padding: "0 6vw", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8e8e8", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "#111" }}>
            mohan-bee
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { icon: <Ico.email />, label: "mohan@email.com", href: "mailto:mohan@email.com" },
              { icon: <Ico.github />, label: "GitHub", href: "https://github.com/mohan-bee" },
              { icon: <Ico.linkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/mohan-a-88b655318" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 400, color: "#555", textDecoration: "none", padding: "4px 10px", borderRadius: 6, border: "1px solid #d0d0d0" }}>
                {l.icon} {l.label}
              </a>
            ))}
          </div>
        </header>

        {/* MAIN */}
        <main style={{ display: "grid", gridTemplateColumns: "1fr 320px", overflow: "hidden" }}>

          {/* LEFT — hero */}
          <div style={{ padding: "0 6vw", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid #e8e8e8", overflow: "hidden" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", fontWeight: 400, marginBottom: 14 }}>
              Software Engineer · Open Source
            </p>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 18, color: "#111" }}>
              Mohan
            </h1>
            <p style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", fontWeight: 300, color: "#555", maxWidth: 480, lineHeight: 1.85, marginBottom: 24 }}>
              Hey Hi i am mohan the second year graduate in Software Product Engineering from LPU X Kalvium. I am love game dev, graphics, low level programming and operating system. I love to contribute to open source and computer hardwares. I hate code completions with ai. In some aspect of life i try to implement a logic for a problem to solve that in computers also. 
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { Icon: Ico.rust, name: "Rust" },
                { Icon: Ico.ts, name: "TypeScript" },
                { Icon: Ico.py, name: "Python" },
              ].map(({ Icon, name }) => (
                <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 400, color: "#333", border: "1px solid #d0d0d0", borderRadius: 20, padding: "4px 12px" }}>
                  <span style={{ display: "flex" }}><Icon /></span>
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — tray */}
          <div style={{ padding: "24px 18px", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center", overflowY: "auto" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", fontWeight: 400, marginBottom: 4, paddingLeft: 2 }}>Quick Access</p>

            <TrayBtn label="Contributions" sub={ORGS.map(o => o.name).join(" · ")} onClick={() => setPopup("contribs")}
              Icon={<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z" strokeLinecap="round" /></svg>} />

            <TrayBtn label="Resume" onClick={() => setShowResume(true)}
              Icon={<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 2h6l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" /><path d="M10 2v4h4M5.5 8h5M5.5 10.5h5M5.5 13h3" strokeLinecap="round" /></svg>} />

            {!loading && (
              <div style={{ marginTop: 6, padding: "12px 14px", background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 8 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 8, fontWeight: 400 }}>Contrib Summary</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {ORGS.map((org, i) => {
                    const d = contribs[i];
                    if (!d) return null;
                    const merged = d.prs.filter(p => p.merged).length;
                    return (
                      <div key={org.name} style={{ padding: "8px 10px", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 6 }}>
                        <p style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 3 }}>{org.name}</p>
                        <p style={{ fontSize: 11, color: "#666", fontWeight: 300 }}>{d.prs.length} PRs · {merged} merged</p>
                        <p style={{ fontSize: 11, color: "#666", fontWeight: 300 }}>{d.issues.length} issues</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", color: "#888", fontSize: 12 }}>
                <Ico.spin /> Loading stats…
              </div>
            )}
          </div>
        </main>

        {/* FOOTER */}
        <footer style={{ padding: "0 6vw", height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e8e8e8", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "#999", fontWeight: 300 }}>© 2024 Mohan</span>
          <span style={{ fontSize: 11, color: "#ccc", fontWeight: 300 }}>Click any card to explore →</span>
        </footer>
      </div>

      {popup === "contribs" && (
        <Popup title="Open Source Contributions" onClose={close}>
          <ContribContent contribs={contribs} loading={loading} />
        </Popup>
      )}
      {showResume && <ResumeViewer onClose={() => setShowResume(false)} />}
    </>
  );
}
