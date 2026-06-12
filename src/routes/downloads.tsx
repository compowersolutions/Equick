import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { listResources, getResourceDownloadUrl } from "@/lib/api/resources.functions";
import { FileText, Download, Loader2, FileArchive, FileImage, FileSpreadsheet } from "lucide-react";

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

const FILTERS = [
  { value: "all", label: "All" },
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

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => listFn({}),
  });

  const downloadMutation = useMutation({
    mutationFn: (id: string) => signFn({ data: { id } }),
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });

  const filtered = resources?.filter((r) => filter === "all" || r.category === filter) ?? [];

  return (
    <div>
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
            Downloads
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            Product catalogs, technical datasheets, and installation manuals for our generators, solar systems, and rectifiers.
          </p>
        </div>
      </section>

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

          {/* List */}
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
        </div>
      </section>
    </div>
  );
}
