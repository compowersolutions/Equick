import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listResources, createResource, deleteResource, checkIsAdmin } from "@/lib/api/resources.functions";
import { listEnquiries, setEnquiryStatus } from "@/lib/api/enquiries.functions";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { Upload, Trash2, FileText, LogOut, Loader2, ShieldAlert, Lock, Inbox, Mail, Phone, MessageCircle, Check, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ComPower Africa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
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
  muted:  "#94A3B8",
  textSm: "#5B6A80",
} as const;

const STYLES = `
  .cp-display { font-family: var(--font-display) !important; letter-spacing: -0.02em; }

  .cp-admin-input {
    display: block; width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid ${C.border};
    border-radius: 6px; color: #fff;
    font-size: 0.875rem; padding: 0.6rem 0.875rem;
    outline: none; transition: border-color 0.2s, background 0.2s;
  }
  .cp-admin-input::placeholder { color: ${C.muted}; }
  .cp-admin-input:focus { border-color: ${C.blue}; background: rgba(255,255,255,0.06); }

  .cp-admin-label {
    display: block; font-size: 0.78rem; font-weight: 600;
    color: #CBD5E0; letter-spacing: 0.03em; margin-bottom: 0.45rem;
  }

  .cp-btn-blue {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: ${C.blue}; color: ${C.dark};
    font-weight: 700; font-size: 0.82rem; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 0.7rem 1.25rem; border-radius: 6px; border: none; cursor: pointer;
    transition: background 0.2s; width: 100%;
  }
  .cp-btn-blue:hover:not(:disabled) { background: ${C.blueD}; }
  .cp-btn-blue:disabled { opacity: 0.5; cursor: not-allowed; }

  .cp-btn-outline-sm {
    display: inline-flex; align-items: center; gap: 6px;
    background: transparent; color: #fff;
    font-size: 0.8rem; font-weight: 600;
    padding: 0.55rem 1rem; border-radius: 6px;
    border: 1px solid ${C.border}; cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .cp-btn-outline-sm:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.25); }

  .cp-admin-card {
    background: ${C.dark2}; border: 1px solid ${C.border}; border-radius: 12px; padding: 1.5rem;
  }

  .cp-resource-row { border-bottom: 1px solid ${C.border}; padding: 1rem 0; display: flex; align-items: flex-start; gap: 0.875rem; }
  .cp-resource-row:last-child { border-bottom: none; }

  .cp-delete-btn {
    padding: 0.4rem; background: none; border: none; cursor: pointer;
    color: ${C.muted}; border-radius: 6px;
    transition: color 0.2s, background 0.2s;
  }
  .cp-delete-btn:hover { color: #F87171; background: rgba(248,113,113,0.1); }
  .cp-delete-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .cp-tag {
    display: inline-block; font-size: 0.72rem; font-weight: 600;
    padding: 0.2rem 0.6rem; border-radius: 99px;
    background: rgba(255,255,255,0.07); color: ${C.muted};
  }

  .cp-protected-badge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 0.7rem; font-weight: 600;
    background: rgba(45,99,168,0.15); color: ${C.blue};
    border-radius: 99px; padding: 0.2rem 0.6rem;
  }
`;

type SessionState = "loading" | "anonymous" | "non-admin" | "admin";

const CATEGORIES = [
  { value: "catalog",   label: "Product Catalog" },
  { value: "generator", label: "Generators"       },
  { value: "solar",     label: "Solar"            },
  { value: "rectifier", label: "Rectifiers"       },
  { value: "other",     label: "Other"            },
] as const;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function AdminPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [state, setState] = useState<SessionState>("loading");
  const checkAdminFn = useServerFn(checkIsAdmin);

  useEffect(() => {
    let mounted = true;
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (!session) { setState("anonymous"); }
      else { checkAdminFn({}).then((r) => mounted && setState(r.isAdmin ? "admin" : "non-admin")); }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) { setState("anonymous"); navigate({ to: "/auth" }); return; }
      checkAdminFn({}).then((r) => mounted && setState(r.isAdmin ? "admin" : "non-admin"));
    });
    return () => { mounted = false; subscription.subscription.unsubscribe(); };
  }, [navigate, checkAdminFn]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth" });
  }

  if (state === "loading") {
    return (
      <div style={{ minHeight: "calc(100vh - 4rem)", display: "flex", alignItems: "center", justifyContent: "center", background: C.dark }}>
        <Loader2 size={24} color={C.muted} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (state === "anonymous") return null;

  if (state === "non-admin") {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div style={{ minHeight: "calc(100vh - 4rem)", display: "flex", alignItems: "center", justifyContent: "center", background: C.dark, padding: "2rem 1rem" }}>
          <div style={{ maxWidth: "420px", width: "100%", background: C.dark2, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "2.25rem", textAlign: "center" }}>
            <ShieldAlert size={36} color="#F87171" style={{ margin: "0 auto" }} />
            <h1 className="cp-display" style={{ marginTop: "1rem", fontSize: "1.54rem", fontWeight: 900, textTransform: "uppercase", color: "#fff" }}>
              Not authorized
            </h1>
            <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: C.muted, lineHeight: 1.7 }}>
              Your account does not have admin access. Ask the site owner to grant you the{" "}
              <code style={{ background: "rgba(255,255,255,0.07)", padding: "0.1rem 0.4rem", borderRadius: "4px", fontSize: "0.8rem" }}>admin</code> role.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button onClick={handleSignOut} className="cp-btn-blue">
                <LogOut size={14} /> Sign out
              </button>
              <Link to="/" style={{ fontSize: "0.8rem", color: C.muted, textDecoration: "none" }}>← Back to website</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <AdminDashboard onSignOut={handleSignOut} />
    </>
  );
}

function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const qc = useQueryClient();
  const listFn  = useServerFn(listResources);
  const createFn = useServerFn(createResource);
  const deleteFn = useServerFn(deleteResource);

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => listFn({}),
  });

  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]       = useState<(typeof CATEGORIES)[number]["value"]>("catalog");
  const [file, setFile]               = useState<File | null>(null);
  const [password, setPassword]       = useState("");
  const [uploading, setUploading]     = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });

  // ── UNCHANGED upload logic ──
  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;
    setUploadError(null); setUploadSuccess(false); setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const filePath = `${category}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("resources").upload(filePath, file, { contentType: file.type || "application/octet-stream" });
      if (upErr) throw upErr;
      const passwordHash = password.trim() ? await hashPassword(password.trim()) : null;
      await createFn({ data: { title: title.trim(), description: description.trim() || undefined, category, file_path: filePath, file_name: file.name, file_size: file.size, file_type: file.type || "application/octet-stream", ...(passwordHash ? { password_hash: passwordHash } : {}) } });
      setTitle(""); setDescription(""); setCategory("catalog"); setFile(null); setPassword("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploadSuccess(true);
      qc.invalidateQueries({ queryKey: ["resources"] });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ background: C.dark, minHeight: "calc(100vh - 4rem)", fontFamily: "var(--font-body)" }}>

      {/* Header */}
      <div style={{ background: C.dark2, borderBottom: `1px solid ${C.border}`, padding: "1rem clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1 className="cp-display" style={{ fontWeight: 900, fontSize: "1.52rem", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>Admin Dashboard</h1>
            <p style={{ marginTop: "0.3rem", fontSize: "0.8rem", color: C.muted }}>Manage downloadable resources</p>
          </div>
          <button onClick={onSignOut} className="cp-btn-outline-sm">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem clamp(1.5rem,5vw,4rem)", display: "grid", gridTemplateColumns: "minmax(0,380px) 1fr", gap: "1.25rem", alignItems: "start" }}>

        {/* ── Upload form ── */}
        <div className="cp-admin-card">
          <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "1.14rem", textTransform: "uppercase", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Upload size={16} color={C.blue} /> Upload resource
          </h2>

          <form onSubmit={handleUpload} style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

            <div>
              <label className="cp-admin-label">Title</label>
              <input required maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} className="cp-admin-input" />
            </div>

            <div>
              <label className="cp-admin-label">Description</label>
              <textarea rows={3} maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)} className="cp-admin-input" style={{ resize: "vertical", minHeight: "72px" }} />
            </div>

            <div>
              <label className="cp-admin-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="cp-admin-input">
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="cp-admin-label">File (max 50 MB)</label>
              <input
                ref={fileInputRef} required type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                style={{ display: "block", width: "100%", fontSize: "0.8rem", color: C.muted }}
              />
              {file && <p style={{ marginTop: "0.35rem", fontSize: "0.75rem", color: C.muted }}>{file.name} ({formatBytes(file.size)})</p>}
            </div>

            {/* Password protection */}
            <div style={{ background: "rgba(45,99,168,0.05)", border: `1px solid rgba(45,99,168,0.2)`, borderRadius: "8px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <label className="cp-admin-label" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: 0 }}>
                <Lock size={13} color={C.blue} /> Password protection (optional)
              </label>
              <input type="text" placeholder="Leave blank for public access" value={password} onChange={(e) => setPassword(e.target.value)} className="cp-admin-input" />
              <p style={{ fontSize: "0.75rem", color: C.muted }}>If set, users must enter this password before downloading.</p>
            </div>

            {uploadError && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "6px", padding: "0.6rem 0.875rem", fontSize: "0.825rem", color: "#FCA5A5" }}>
                {uploadError}
              </div>
            )}
            {uploadSuccess && (
              <div style={{ background: "rgba(0,180,160,0.1)", border: "1px solid rgba(0,180,160,0.25)", borderRadius: "6px", padding: "0.6rem 0.875rem", fontSize: "0.825rem", color: "#5EEAD4" }}>
                File uploaded successfully!
              </div>
            )}

            <button type="submit" disabled={uploading || !file} className="cp-btn-blue">
              {uploading ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />Uploading…</> : <><Upload size={14} />Upload</>}
            </button>
          </form>
        </div>

        {/* ── Resources list ── */}
        <div className="cp-admin-card">
          <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "1.14rem", textTransform: "uppercase", color: "#fff" }}>
            Resources <span style={{ color: C.muted, fontWeight: 600 }}>({resources?.length ?? 0})</span>
          </h2>

          <div style={{ marginTop: "1rem" }}>
            {isLoading && (
              <div style={{ padding: "3rem 0", display: "flex", justifyContent: "center" }}>
                <Loader2 size={20} color={C.muted} style={{ animation: "spin 1s linear infinite" }} />
              </div>
            )}
            {!isLoading && (!resources || resources.length === 0) && (
              <p style={{ padding: "3rem 0", textAlign: "center", fontSize: "0.875rem", color: C.muted }}>
                No resources yet. Upload your first file using the form.
              </p>
            )}
            {resources?.map((r) => (
              <div key={r.id} className="cp-resource-row">
                <div style={{ width: "38px", height: "38px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={18} color={C.teal} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</p>
                    {r.password_hash && (
                      <span className="cp-protected-badge"><Lock size={10} /> Protected</span>
                    )}
                  </div>
                  {r.description && <p style={{ marginTop: "0.25rem", fontSize: "0.78rem", color: C.muted, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{r.description}</p>}
                  <div style={{ marginTop: "0.4rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span className="cp-tag">{CATEGORIES.find((c) => c.value === r.category)?.label ?? r.category}</span>
                    <span style={{ fontSize: "0.75rem", color: C.muted }}>{formatBytes(r.file_size)}</span>
                    <span style={{ fontSize: "0.75rem", color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>{r.file_name}</span>
                  </div>
                </div>
                <button
                  onClick={() => { if (confirm(`Delete "${r.title}"? This cannot be undone.`)) deleteMutation.mutate(r.id); }}
                  disabled={deleteMutation.isPending}
                  className="cp-delete-btn" aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem) 2rem" }}>
        <EnquiriesPanel />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Website enquiries inbox ──────────────────────────────────────────────────

function toWhatsAppNumber(phone: string | null) {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, "");
  // Local Botswana mobile numbers (e.g. 72 123 456) → add country code
  if (digits.length === 8) digits = WHATSAPP_NUMBER.slice(0, 3) + digits;
  return digits.length >= 10 ? digits : null;
}

function EnquiriesPanel() {
  const qc = useQueryClient();
  const listFn = useServerFn(listEnquiries);
  const statusFn = useServerFn(setEnquiryStatus);

  const { data: enquiries, isLoading, error } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => listFn({}),
  });

  const statusMutation = useMutation({
    mutationFn: (v: { id: string; status: "new" | "handled" }) => statusFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enquiries"] }),
  });

  const newCount = enquiries?.filter((e) => e.status === "new").length ?? 0;

  return (
    <div className="cp-admin-card">
      <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "1.14rem", textTransform: "uppercase", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Inbox size={16} color={C.blue} /> Website enquiries
        <span style={{ color: C.muted, fontWeight: 600 }}>({enquiries?.length ?? 0})</span>
        {newCount > 0 && <span className="cp-protected-badge" style={{ background: "rgba(0,180,160,0.15)", color: C.teal }}>{newCount} new</span>}
      </h2>

      <div style={{ marginTop: "1rem" }}>
        {isLoading && (
          <div style={{ padding: "3rem 0", display: "flex", justifyContent: "center" }}>
            <Loader2 size={20} color={C.muted} style={{ animation: "spin 1s linear infinite" }} />
          </div>
        )}
        {error && (
          <p style={{ padding: "1rem 0", fontSize: "0.85rem", color: "#FCA5A5" }}>
            Could not load enquiries: {error instanceof Error ? error.message : "unknown error"}
          </p>
        )}
        {!isLoading && !error && (!enquiries || enquiries.length === 0) && (
          <p style={{ padding: "3rem 0", textAlign: "center", fontSize: "0.875rem", color: C.muted }}>
            No enquiries yet. Messages sent from the Contact page will appear here.
          </p>
        )}
        {enquiries?.map((q) => {
          const wa = toWhatsAppNumber(q.phone);
          const handled = q.status === "handled";
          return (
            <div key={q.id} className="cp-resource-row" style={{ opacity: handled ? 0.55 : 1 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>{q.name}</p>
                  {q.interest && <span className="cp-tag">{q.interest}</span>}
                  {!handled && <span className="cp-protected-badge" style={{ background: "rgba(0,180,160,0.15)", color: C.teal }}>New</span>}
                  <span style={{ fontSize: "0.75rem", color: C.muted, marginLeft: "auto" }}>
                    {new Date(q.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                </div>
                <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#CBD5E0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{q.message}</p>
                <div style={{ marginTop: "0.6rem", display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.78rem" }}>
                  <a href={`mailto:${q.email}?subject=${encodeURIComponent("Re: your enquiry to ComPower")}`} style={{ color: C.blue, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                    <Mail size={12} /> {q.email}
                  </a>
                  {q.phone && (
                    <a href={`tel:${q.phone.replace(/\s/g, "")}`} style={{ color: C.blue, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                      <Phone size={12} /> {q.phone}
                    </a>
                  )}
                  {wa && (
                    <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hello ${q.name.split(" ")[0]}, thank you for contacting ComPower. `)}`} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                      <MessageCircle size={12} /> Reply on WhatsApp
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => statusMutation.mutate({ id: q.id, status: handled ? "new" : "handled" })}
                disabled={statusMutation.isPending}
                className="cp-btn-outline-sm"
                title={handled ? "Mark as new" : "Mark as handled"}
              >
                {handled ? <><RotateCcw size={13} /> Reopen</> : <><Check size={13} /> Done</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
