import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { listResources, getResourceDownloadUrl } from "@/lib/api/resources.functions";
import {
  FileText, Download, Loader2, FileArchive, FileImage, FileSpreadsheet,
  LogIn, Zap, Sun, BatteryCharging, BookOpen, FolderOpen, Lock, Eye, EyeOff,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — ComPower Africa" },
      { name: "description", content: "Download product catalogs, technical datasheets, and manuals for generators, solar systems, and rectifiers." },
      { property: "og:title", content: "Downloads — ComPower Africa" },
      { property: "og:description", content: "Download product catalogs, datasheets, and manuals." },
    ],
  }),
  component: DownloadsPage,
});

// ── All functional logic below is UNCHANGED ───────────────────────────────────

const C = {
  dark:    "#0C1018",
  dark2:   "#111827",
  dark3:   "#1A2235",
  border: "#232F45",
  blue:   "#2D63A8",
  blueD:  "#1E4F8C",
  teal:   "#00B4A0",
  cream:  "#F8F7F4",
  muted:  "#94A3B8",
  textSm: "#5B6A80",
} as const;

const STYLES = `
  .cp-display { font-family: var(--font-display) !important; letter-spacing: -0.02em; }

  .cp-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: ${C.blue};
  }
  .cp-eyebrow::before { content: ''; display: block; width: 28px; height: 2px; background: currentColor; }

  /* Category cards (logged-out view) */
  .cp-cat-card {
    background: ${C.dark2}; border: 1px solid ${C.border};
    border-radius: 12px; padding: 2rem;
    display: flex; flex-direction: column; align-items: center;
    text-align: center; position: relative;
    transition: border-color 0.2s;
  }
  .cp-cat-card::after {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px;
    background: ${C.blue}; border-radius: 12px 0 0 12px;
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.25s ease;
  }
  .cp-cat-card:hover { border-color: rgba(45,99,168,0.3); }
  .cp-cat-card:hover::after { transform: scaleY(1); }

  .cp-cat-link {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.07em;
    text-transform: uppercase; color: ${C.teal}; text-decoration: none;
    transition: gap 0.2s; margin-top: 1.25rem;
  }
  .cp-cat-link:hover { gap: 9px; }

  /* File cards (logged-in view) */
  .cp-file-card {
    background: ${C.dark2}; border: 1px solid ${C.border};
    border-radius: 10px; padding: 1.25rem;
    display: flex; flex-direction: column;
    transition: border-color 0.2s;
  }
  .cp-file-card:hover { border-color: rgba(45,99,168,0.25); }

  /* Filter pills */
  .cp-filter-btn {
    padding: 0.45rem 1rem; border-radius: 6px;
    font-size: 0.8rem; font-weight: 600;
    border: 1px solid ${C.border}; cursor: pointer;
    transition: all 0.15s;
  }
  .cp-filter-btn--active { background: ${C.blue}; color: ${C.dark}; border-color: ${C.blue}; }
  .cp-filter-btn--inactive { background: transparent; color: ${C.muted}; }
  .cp-filter-btn--inactive:hover { color: #fff; border-color: rgba(255,255,255,0.25); }

  .cp-btn-blue {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    background: ${C.blue}; color: ${C.dark};
    font-weight: 700; font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 0.65rem 1rem; border-radius: 6px; border: none; cursor: pointer;
    transition: background 0.2s; width: 100%; margin-top: auto;
  }
  .cp-btn-blue:hover:not(:disabled) { background: ${C.blueD}; }
  .cp-btn-blue:disabled { opacity: 0.5; cursor: not-allowed; }

  .cp-btn-primary-sm {
    display: inline-flex; align-items: center; gap: 6px;
    background: ${C.blue}; color: ${C.dark};
    font-weight: 700; font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 0.7rem 1.25rem; border-radius: 6px; border: none; cursor: pointer;
    transition: background 0.2s; flex-shrink: 0;
  }
  .cp-btn-primary-sm:hover { background: ${C.blueD}; }

  /* Modal */
  .cp-modal-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); padding: 1rem; backdrop-filter: blur(4px); }
  .cp-modal { width: 100%; max-width: 380px; background: ${C.dark2}; border: 1px solid ${C.border}; border-radius: 14px; padding: 1.75rem; }
  .cp-modal-input {
    display: block; width: 100%; background: rgba(255,255,255,0.04); border: 1px solid ${C.border};
    border-radius: 6px; color: #fff; font-size: 0.875rem; padding: 0.65rem 2.5rem 0.65rem 0.875rem;
    outline: none; transition: border-color 0.2s;
  }
  .cp-modal-input:focus { border-color: ${C.blue}; }
  .cp-modal-input::placeholder { color: ${C.muted}; }
  .cp-modal-cancel {
    flex: 1; padding: 0.7rem; border-radius: 6px;
    border: 1px solid ${C.border}; background: transparent;
    color: ${C.muted}; font-size: 0.825rem; font-weight: 600; cursor: pointer;
    transition: background 0.15s;
  }
  .cp-modal-cancel:hover { background: rgba(255,255,255,0.05); }
  .cp-modal-download {
    flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    background: ${C.blue}; color: ${C.dark};
    font-weight: 700; font-size: 0.825rem; padding: 0.7rem;
    border-radius: 6px; border: none; cursor: pointer;
    transition: background 0.2s;
  }
  .cp-modal-download:hover:not(:disabled) { background: ${C.blueD}; }
  .cp-modal-download:disabled { opacity: 0.5; cursor: not-allowed; }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

const FILTERS = [
  { value: "all",       label: "All"            },
  { value: "catalog",   label: "Product Catalog" },
  { value: "generator", label: "Generators"      },
  { value: "solar",     label: "Solar"           },
  { value: "rectifier", label: "Rectifiers"      },
  { value: "other",     label: "Other"           },
] as const;

const CATEGORIES = [
  { value: "catalog",   label: "Product Catalog",   icon: <BookOpen size={28} color="#2D63A8" />,        description: "Full product brochures and company catalogs"              },
  { value: "generator", label: "Generators",         icon: <Zap size={28} color="#2D63A8" />,             description: "Technical datasheets and manuals for generator sets"       },
  { value: "solar",     label: "Solar Systems",      icon: <Sun size={28} color="#2D63A8" />,             description: "Solar panel specs, inverter manuals, and installation guides" },
  { value: "rectifier", label: "Rectifiers",         icon: <BatteryCharging size={28} color="#2D63A8" />, description: "Rectifier module datasheets and configuration guides"      },
  { value: "other",     label: "Other Documents",    icon: <FolderOpen size={28} color="#2D63A8" />,      description: "Additional technical resources and support documents"     },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function FileIcon({ type }: { type: string }) {
  const color = "#00B4A0";
  if (type.includes("zip") || type.includes("rar")) return <FileArchive size={20} color={color} />;
  if (type.startsWith("image/")) return <FileImage size={20} color={color} />;
  if (type.includes("sheet") || type.includes("excel")) return <FileSpreadsheet size={20} color={color} />;
  return <FileText size={20} color={color} />;
}

// ── Password modal — logic UNCHANGED, visuals updated ──
function PasswordModal({ resourceId, resourceTitle, onClose, onSuccess }: {
  resourceId: string; resourceTitle: string;
  onClose: () => void; onSuccess: (url: string) => void;
}) {
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const signFn = useServerFn(getResourceDownloadUrl);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      const result = await signFn({ data: { id: resourceId, password } });
      onSuccess(result.url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      setError(msg === "INVALID_PASSWORD" ? "Incorrect password. Please check and try again." : "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="cp-modal-overlay">
      <div className="cp-modal">
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
          <div style={{ width: "40px", height: "40px", background: "rgba(45,99,168,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Lock size={18} color="#2D63A8" />
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.97rem", textTransform: "uppercase", color: "#fff" }}>Password Required</h3>
            <p style={{ fontSize: "0.75rem", color: "#94A3B8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "220px" }}>{resourceTitle}</p>
          </div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.65, marginBottom: "1.25rem" }}>
          This file is password protected. Enter the password provided by ComPower Africa to download.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Enter password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              required autoFocus className="cp-modal-input"
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {error && <p style={{ fontSize: "0.825rem", color: "#FCA5A5" }}>{error}</p>}
          <div style={{ display: "flex", gap: "0.625rem", marginTop: "0.25rem" }}>
            <button type="button" onClick={onClose} className="cp-modal-cancel">Cancel</button>
            <button type="submit" disabled={loading || !password} className="cp-modal-download">
              {loading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Download size={14} />}
              Download
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DownloadsPage() {
  const listFn = useServerFn(listResources);
  const signFn = useServerFn(getResourceDownloadUrl);
  const [filter, setFilter]           = useState<(typeof FILTERS)[number]["value"]>("all");
  const [isLoggedIn, setIsLoggedIn]   = useState<boolean | null>(null);
  const [passwordModal, setPasswordModal] = useState<{ id: string; title: string } | null>(null);

  // ── Auth state — UNCHANGED ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setIsLoggedIn(!!data.session); });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => { setIsLoggedIn(!!session); });
    return () => listener.subscription.unsubscribe();
  }, []);

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => listFn({}),
    enabled: isLoggedIn === true,
  });

  const downloadMutation = useMutation({
    mutationFn: (id: string) => signFn({ data: { id } }),
    onSuccess: ({ url }) => { window.location.href = url; },
  });

  function handleDownloadClick(r: { id: string; title: string; password_hash: string | null }) {
    if (r.password_hash) { setPasswordModal({ id: r.id, title: r.title }); }
    else { downloadMutation.mutate(r.id); }
  }

  const filtered = resources?.filter((r) => filter === "all" || r.category === filter) ?? [];

  if (isLoggedIn === null) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.dark }}>
          <Loader2 size={28} color={C.teal} style={{ animation: "spin 1s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ fontFamily: "var(--font-body)", background: C.dark, minHeight: "100vh" }}>

        {/* Password modal */}
        {passwordModal && (
          <PasswordModal
            resourceId={passwordModal.id} resourceTitle={passwordModal.title}
            onClose={() => setPasswordModal(null)}
            onSuccess={(url) => { setPasswordModal(null); window.location.href = url; }}
          />
        )}

        {/* ── HERO ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,5vw,4rem) clamp(1.5rem,5vw,4rem) clamp(3rem,5vw,4.5rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,180,160,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>
            <span className="cp-eyebrow" style={{ color: C.teal }}>Resource library</span>
            <h1 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.71rem,3.8vw,2.85rem)", lineHeight: 0.95, textTransform: "uppercase", color: "#fff", marginTop: "0.5rem" }}>
              Downloads
            </h1>
            <p style={{ marginTop: "1.25rem", color: C.muted, fontSize: "clamp(0.95rem,1.4vw,1.05rem)", maxWidth: "52ch", lineHeight: 1.8 }}>
              Product catalogs, technical datasheets, and installation manuals — available free with a registered account.
            </p>
          </div>
        </section>

        {/* ── LOGGED OUT — category preview ── */}
        {!isLoggedIn && (
          <section style={{ padding: "2rem clamp(1.5rem,5vw,4rem)" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

              {/* Sign-in banner */}
              <div style={{ background: "rgba(0,180,160,0.08)", border: `1px solid rgba(0,180,160,0.25)`, borderRadius: "12px", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.14rem", textTransform: "uppercase", color: "#fff" }}>Free access to all downloads</p>
                  <p style={{ marginTop: "0.35rem", fontSize: "0.875rem", color: C.muted }}>Create a free account or sign in to access our full library of technical documents.</p>
                </div>
                <Link to="/auth" className="cp-btn-primary-sm">
                  <LogIn size={14} /> Sign in / Register Free
                </Link>
              </div>

              <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "1.32rem", textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Available Categories</h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
                {CATEGORIES.map((cat) => (
                  <div key={cat.value} className="cp-cat-card">
                    <div style={{ width: "60px", height: "60px", background: "rgba(45,99,168,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {cat.icon}
                    </div>
                    <h3 className="cp-display" style={{ fontWeight: 800, fontSize: "0.97rem", textTransform: "uppercase", color: "#fff", marginTop: "1rem" }}>{cat.label}</h3>
                    <p style={{ marginTop: "0.4rem", fontSize: "0.825rem", color: C.muted, lineHeight: 1.65 }}>{cat.description}</p>
                    <Link to="/auth" className="cp-cat-link">
                      <LogIn size={12} /> Sign in to access
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ── LOGGED IN — file library ── */}
        {isLoggedIn && (
          <section style={{ padding: "2rem clamp(1.5rem,5vw,4rem)" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

              {/* Filter pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.border}` }}>
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`cp-filter-btn ${filter === f.value ? "cp-filter-btn--active" : "cp-filter-btn--inactive"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: "2rem" }}>
                {isLoading && (
                  <div style={{ padding: "4rem 0", display: "flex", justifyContent: "center" }}>
                    <Loader2 size={24} color={C.teal} style={{ animation: "spin 1s linear infinite" }} />
                  </div>
                )}

                {!isLoading && filtered.length === 0 && (
                  <div style={{ padding: "4rem 0", textAlign: "center" }}>
                    <FileText size={44} color={`${C.muted}55`} style={{ margin: "0 auto" }} />
                    <p style={{ marginTop: "1rem", color: C.muted, fontSize: "0.9rem" }}>
                      No resources available {filter !== "all" && "in this category"} yet.
                    </p>
                    <p style={{ marginTop: "0.3rem", fontSize: "0.825rem", color: C.textSm }}>Check back soon.</p>
                  </div>
                )}

                {!isLoading && filtered.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
                    {filtered.map((r) => (
                      <div key={r.id} className="cp-file-card">
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                          <div style={{ width: "42px", height: "42px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileIcon type={r.file_type} />
                          </div>
                          {r.password_hash && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(45,99,168,0.12)", color: C.blue, fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
                              <Lock size={10} /> Protected
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.97rem", textTransform: "uppercase", color: "#fff" }}>
                          {r.title}
                        </h3>
                        {r.description && (
                          <p style={{ marginTop: "0.4rem", fontSize: "0.825rem", color: C.muted, lineHeight: 1.65, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", flex: 1 }}>
                            {r.description}
                          </p>
                        )}

                        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 600, background: "rgba(255,255,255,0.06)", color: C.muted, padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
                            {FILTERS.find((f) => f.value === r.category)?.label ?? r.category}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: C.textSm }}>{formatBytes(r.file_size)}</span>
                        </div>

                        <button
                          onClick={() => handleDownloadClick(r)}
                          disabled={downloadMutation.isPending && downloadMutation.variables === r.id}
                          className="cp-btn-blue"
                          style={{ marginTop: "1rem" }}
                        >
                          {downloadMutation.isPending && downloadMutation.variables === r.id
                            ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                            : r.password_hash
                              ? <><Lock size={13} />Enter Password</>
                              : <><Download size={13} />Download</>}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "3rem", textAlign: "center" }}>
                <button onClick={() => supabase.auth.signOut()} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.825rem", color: C.textSm, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Sign out
                </button>
              </div>

            </div>
          </section>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
}
