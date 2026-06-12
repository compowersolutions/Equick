import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  listResources,
  createResource,
  deleteResource,
  checkIsAdmin,
} from "@/lib/api/resources.functions";
import { Upload, Trash2, FileText, LogOut, Loader2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Highsystem Botswana" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type SessionState = "loading" | "anonymous" | "non-admin" | "admin";

const CATEGORIES = [
  { value: "catalog", label: "Product Catalog" },
  { value: "generator", label: "Generators" },
  { value: "solar", label: "Solar" },
  { value: "rectifier", label: "Rectifiers" },
  { value: "other", label: "Other" },
] as const;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
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
      if (!session) {
        setState("anonymous");
      } else {
        checkAdminFn({}).then((r) => mounted && setState(r.isAdmin ? "admin" : "non-admin"));
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        setState("anonymous");
        navigate({ to: "/auth" });
        return;
      }
      checkAdminFn({}).then((r) => mounted && setState(r.isAdmin ? "admin" : "non-admin"));
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [navigate, checkAdminFn]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth" });
  }

  if (state === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (state === "anonymous") {
    return null;
  }

  if (state === "non-admin") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-card border border-border rounded-xl p-8">
          <ShieldAlert className="h-10 w-10 text-destructive mx-auto" />
          <h1 className="mt-4 text-xl font-bold text-foreground font-display">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but does not have admin access. Ask the site owner to grant you the <code className="px-1 py-0.5 rounded bg-muted text-xs">admin</code> role.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onSignOut={handleSignOut} />;
}

function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const qc = useQueryClient();
  const listFn = useServerFn(listResources);
  const createFn = useServerFn(createResource);
  const deleteFn = useServerFn(deleteResource);

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => listFn({}),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["value"]>("catalog");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;
    setUploadError(null);
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const filePath = `${category}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("resources")
        .upload(filePath, file, { contentType: file.type || "application/octet-stream" });
      if (upErr) throw upErr;

      await createFn({
        data: {
          title: title.trim(),
          description: description.trim() || undefined,
          category,
          file_path: filePath,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type || "application/octet-stream",
        },
      });

      setTitle("");
      setDescription("");
      setCategory("catalog");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      qc.invalidateQueries({ queryKey: ["resources"] });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)]">
      <div className="bg-navy-900 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-display sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-navy-200">Manage downloadable resources</p>
          </div>
          <button
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-md border border-navy-600 px-3 py-2 text-sm text-white hover:bg-navy-800"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Upload form */}
        <div className="bg-card border border-border rounded-xl p-6 h-fit">
          <h2 className="text-lg font-bold text-foreground font-display flex items-center gap-2">
            <Upload className="h-5 w-5 text-teal-500" />
            Upload resource
          </h2>
          <form onSubmit={handleUpload} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Title</label>
              <input
                required
                maxLength={200}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Description</label>
              <textarea
                rows={3}
                maxLength={1000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">File (max 50 MB)</label>
              <input
                ref={fileInputRef}
                required
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1.5 block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
              />
              {file && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {file.name} ({formatBytes(file.size)})
                </p>
              )}
            </div>

            {uploadError && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
                {uploadError}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload
                </>
              )}
            </button>
          </form>
        </div>

        {/* Resources list */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground font-display">
            Resources ({resources?.length ?? 0})
          </h2>
          <div className="mt-4 divide-y divide-border">
            {isLoading && (
              <div className="py-8 flex items-center justify-center text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            )}
            {!isLoading && (!resources || resources.length === 0) && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No resources yet. Upload your first file using the form on the left.
              </p>
            )}
            {resources?.map((r) => (
              <div key={r.id} className="py-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                  <FileText className="h-5 w-5 text-teal-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{r.title}</p>
                  {r.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                  )}
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-navy-50 px-2 py-0.5 font-medium text-navy-700">
                      {CATEGORIES.find((c) => c.value === r.category)?.label ?? r.category}
                    </span>
                    <span>{formatBytes(r.file_size)}</span>
                    <span className="truncate">{r.file_name}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${r.title}"? This cannot be undone.`)) {
                      deleteMutation.mutate(r.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
