import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { listResources, getResourceDownloadUrl } from "@/lib/api/resources.functions";
import {
  FileText, Download, Loader2, FileArchive, FileImage, FileSpreadsheet,
  LogIn, Zap, Sun, BatteryCharging, BookOpen, FolderOpen, Monitor
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/downloadsbk")({
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

const FILTERS = [
  { value: "all", label: "All" },
  { value: "catalog", label: "Product Catalog" },
  { value: "generator", label: "Generators" },
  { value: "solar", label: "Solar" },
  { value: "rectifier", label: "Rectifiers" },
  { value: "other", label: "Other" },
] as const;

const CATEGORIES = [
  {
    value: "catalog",
    label: "Product Catalog",
    icon: <BookOpen className="h-10 w-10 text-teal-500" />,
    description: "Full product brochures and company catalogs",
  },
  {
    value: "generator",
    label: "Generators",
    icon: <Zap className="h-10 w-10 text-teal-500" />,
    description: "Technical datasheets and manuals for generator sets",
  },
  {
    value: "solar",
    label: "Solar Systems",
    icon: <Sun className="h-10 w-10 text-teal-500" />,
    description: "Solar panel specs, inverter manuals, and installation guides",
  },
  {
    value: "rectifier",
    label: "Rectifiers",
    icon: <BatteryCharging className="h-10 w-10 text-teal-500" />,
    description: "Rectifier module datasheets and configuration guides",
  },
  {
    value: "other",
    label: "Other Documents",
    icon: <FolderOpen className="h-10 w-10 text-teal-500" />,
    description: "Additional technical resources and support documents",
  },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function FileIcon({ type }: { type: string }) {
  if (type.includes("zip") || type.includes("rar")) return <FileArchive className="h-6 w-6 text-teal-500" />;
  if (type.startsWith("image/")) return <FileImage className="h-6 w-6 text-teal-500" />;
  if (type.includes("sheet") || type.includes("excel")) return <FileSpreadsheet className="h-6 w-6 text-teal-500" />;
  return <FileText className="h-6 w-6 text-teal-500" />;
}

function DownloadsPage() {
  const listFn = useServerFn(listResources);
  const signFn = useServerFn(getResourceDownloadUrl);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => listFn({}),
    enabled: isLoggedIn === true,
  });

  const downloadMutation = useMutation({
    mutationFn: (id: string) => signFn({ data: { id } }),
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });

  const filtered = resources?.filter((r) => filter === "all" || r.category === filter) ?? [];

  // Loading state
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
            Downloads
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            Product catalogs, technical datasheets, and installation manuals — available free with a registered account.
          </p>
        </div>
      </section>

      {/* Logged OUT — show category cards */}
      {!isLoggedIn && (
        <section className="py-16 sm:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Sign in banner */}
            <div className="mb-12 rounded-xl border border-teal-200 bg-teal-50 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-teal-800">Free access to all downloads</p>
                <p className="text-sm text-teal-700 mt-1">
                  Create a free account or sign in to access our full library of technical documents.
                </p>
              </div>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shrink-0"
              >
                <LogIn className="h-4 w-4" />
                Sign in / Register Free
              </Link>
            </div>

            {/* Category cards */}
            <h2 className="text-xl font-bold text-foreground font-display mb-6">
              Available Document Categories
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.value}
                  className="rounded-xl border border-border bg-card p-6 flex flex-col items-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-50">
                    {cat.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{cat.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                  <Link
                    to="/auth"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Sign in to access
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Logged IN — show files */}
      {isLoggedIn && (
        <section className="py-12 sm:py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Filters */}
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* File list */}
            <div className="mt-8">
              {isLoading && (
                <div className="py-16 flex items-center justify-center text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}

              {!isLoading && filtered.length === 0 && (
                <div className="py-16 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                  <p className="mt-4 text-muted-foreground">
                    No resources available {filter !== "all" && "in this category"} yet.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Check back soon.</p>
                </div>
              )}

              {!isLoading && filtered.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((r) => (
                    <div
                      key={r.id}
                      className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md flex flex-col"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50">
                        <FileIcon type={r.file_type} />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground font-display">
                        {r.title}
                      </h3>
                      {r.description && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">
                          {r.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="rounded-full bg-navy-50 px-2 py-0.5 font-medium text-navy-700">
                          {FILTERS.find((f) => f.value === r.category)?.label ?? r.category}
                        </span>
                        <span>{formatBytes(r.file_size)}</span>
                      </div>
                      <button
                        onClick={() => downloadMutation.mutate(r.id)}
                        disabled={downloadMutation.isPending && downloadMutation.variables === r.id}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                      >
                        {downloadMutation.isPending && downloadMutation.variables === r.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sign out */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <button
                onClick={() => supabase.auth.signOut()}
                className="hover:text-foreground hover:underline"
              >
                Sign out
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
