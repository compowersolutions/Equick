import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, Zap, ArrowRight, MessageCircle, Info } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { loadPresets, sizeGenerator, type LineItem } from "@/lib/generatorSizing";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/generator-sizing")({
  head: () => ({
    meta: [
      { title: "Generator Size Calculator — What kVA Do I Need? | ComPower Africa" },
      {
        name: "description",
        content:
          "Free generator sizing calculator for Botswana homes, businesses and farms. Add your appliances and pumps to get a recommended kVA, then request a quote.",
      },
      { property: "og:title", content: "Generator Size Calculator — ComPower Africa" },
      { property: "og:description", content: "Find out what size generator you need in under a minute." },
    ],
  }),
  component: SizingPage,
});

type Custom = { id: number; name: string; kw: string; motor: boolean; qty: number };

const groups = Array.from(new Set(loadPresets.map((p) => p.group)));
const fmt = (n: number) => (n >= 10 ? n.toFixed(0) : n.toFixed(1));
const fmtPower = (watts: number) => (watts < 1000 ? `${Math.round(watts)} W` : `${fmt(watts / 1000)} kW`);

function SizingPage() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [custom, setCustom] = useState<Custom[]>([]);

  const items: LineItem[] = useMemo(
    () => [
      ...loadPresets.map((p) => ({ name: p.name, watts: p.watts, qty: qty[p.id] ?? 0, startFactor: p.startFactor })),
      ...custom.map((c) => ({
        name: c.name || "Other equipment",
        watts: (parseFloat(c.kw) || 0) * 1000,
        qty: c.qty,
        startFactor: c.motor ? 4 : undefined,
      })),
    ],
    [qty, custom],
  );
  const result = sizeGenerator(items);
  const chosen = items.filter((i) => i.qty > 0 && i.watts > 0);

  const clamp = (n: number) => Math.max(0, Math.min(999, n));
  const setPreset = (id: string, next: (n: number) => number) =>
    setQty((q) => ({ ...q, [id]: clamp(next(q[id] ?? 0)) }));
  const updateCustom = (id: number, patch: Partial<Custom>) =>
    setCustom((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const summary = [
    `Generator sizing estimate: ${result.recommendedKva ? `${result.recommendedKva} kVA` : `over 3000 kVA`}`,
    `Running load ${fmt(result.runningKw)} kW, peak with motor start ${fmt(result.peakKw)} kW.`,
    "Equipment:",
    ...chosen.map((i) => `- ${i.qty} x ${i.name} (${fmtPower(i.watts)}${(i.startFactor ?? 1) > 1 ? ", motor" : ""})`),
  ].join("\n");

  return (
    <div>
      <PageHero eyebrow="Free tool" title="What size generator" highlight="do I need?">
        Add the equipment you want to run. We'll estimate the generator size in kVA — then our engineers can confirm
        it with a free site assessment.
      </PageHero>

      <section className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Equipment list */}
          <div className="space-y-6">
            {groups.map((g) => (
              <div key={g} className="rounded-xl border border-navy-100 bg-white">
                <h2 className="border-b border-navy-100 px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy-950">
                  {g}
                </h2>
                <ul className="divide-y divide-navy-100">
                  {loadPresets
                    .filter((p) => p.group === g)
                    .map((p) => {
                      const n = qty[p.id] ?? 0;
                      return (
                        <li key={p.id} className={`flex items-center gap-3 px-5 py-2.5 ${n ? "bg-brand/5" : ""}`}>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-navy-950">{p.name}</p>
                            <p className="text-xs text-navy-400">
                              {p.watts >= 1000 ? `${p.watts / 1000} kW` : `${p.watts} W`}
                              {p.startFactor ? " · motor start" : ""}
                            </p>
                          </div>
                          <Stepper value={n} onChange={(next) => setPreset(p.id, next)} label={p.name} />
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}

            {/* Custom equipment */}
            <div className="rounded-xl border border-navy-100 bg-white">
              <h2 className="border-b border-navy-100 px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy-950">
                Other equipment
              </h2>
              <div className="space-y-3 p-5">
                {custom.map((c) => (
                  <div key={c.id} className="flex flex-wrap items-center gap-2">
                    <input
                      aria-label="Equipment name"
                      placeholder="e.g. Compressor"
                      value={c.name}
                      onChange={(e) => updateCustom(c.id, { name: e.target.value })}
                      className="min-w-0 flex-1 basis-40 rounded-md border border-input px-3 py-2 text-sm"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        aria-label="Power in kW"
                        inputMode="decimal"
                        placeholder="kW"
                        value={c.kw}
                        onChange={(e) => updateCustom(c.id, { kw: e.target.value.replace(/[^\d.]/g, "") })}
                        className="w-20 rounded-md border border-input px-3 py-2 text-sm"
                      />
                      <span className="text-xs text-navy-400">kW</span>
                    </div>
                    <label className="flex items-center gap-1.5 text-xs text-navy-500">
                      <input type="checkbox" checked={c.motor} onChange={(e) => updateCustom(c.id, { motor: e.target.checked })} />
                      Motor
                    </label>
                    <Stepper
                      value={c.qty}
                      onChange={(next) => setCustom((cs) => cs.map((x) => (x.id === c.id ? { ...x, qty: clamp(next(x.qty)) } : x)))}
                      label={c.name || "equipment"}
                    />
                    <button
                      aria-label="Remove"
                      onClick={() => setCustom((cs) => cs.filter((x) => x.id !== c.id))}
                      className="rounded p-2 text-navy-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setCustom((cs) => [...cs, { id: Date.now(), name: "", kw: "", motor: false, qty: 1 }])}
                  className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-navy-300 px-3 py-2 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand"
                >
                  <Plus className="h-4 w-4" /> Add equipment
                </button>
                <p className="text-xs text-navy-400">
                  Find the kW on the equipment's rating plate. Tick "Motor" for pumps, compressors and anything with an
                  electric motor.
                </p>
              </div>
            </div>
          </div>

          {/* Result */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="cp-hero rounded-xl p-6 text-white">
              <span className="cp-eyebrow">Recommended size</span>
              {chosen.length === 0 ? (
                <p className="mt-2 text-sm text-navy-300">Add equipment on the left to see your estimate.</p>
              ) : (
                <>
                  <p className="font-display mt-1 text-6xl font-black leading-none text-white" aria-live="polite">
                    {result.recommendedKva ?? "3000+"}
                    <span className="ml-2 text-2xl text-brand">kVA</span>
                  </p>
                  <dl className="mt-5 space-y-2 border-t border-navy-700 pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-navy-300">Running load</dt>
                      <dd className="font-semibold">{fmt(result.runningKw)} kW</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-300">Peak (motor starting)</dt>
                      <dd className="font-semibold">{fmt(result.peakKw)} kW</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-300">Minimum needed</dt>
                      <dd className="font-semibold">{fmt(result.neededKva)} kVA</dd>
                    </div>
                  </dl>
                  <div className="mt-6 space-y-2">
                    <Link
                      to="/contact"
                      search={{ interest: "generators", message: summary }}
                      className="flex w-full items-center justify-center gap-2 rounded bg-brand px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-dark"
                    >
                      Get a quote for this <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={whatsappLink(`Hello ComPower, I used your sizing tool.\n${summary}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded bg-[#25D366] px-4 py-3 text-sm font-bold uppercase tracking-wider text-navy-950 hover:bg-[#1EBE5A]"
                    >
                      <MessageCircle className="h-4 w-4" /> Send on WhatsApp
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 flex gap-2 rounded-xl border border-navy-100 bg-white p-4 text-xs leading-relaxed text-navy-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <p>
                This is an estimate using typical power ratings, a 0.8 power factor and 25% headroom. Motors can draw
                several times their rating when starting. Our engineers confirm the final size, single- or
                three-phase supply and the right changeover switch on a free site assessment.
              </p>
            </div>
            <p className="mt-4 flex items-center gap-2 px-1 text-xs text-navy-400">
              <Zap className="h-3.5 w-3.5 text-brand" /> 100+ generators installed, up to 1020 kVA.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  label,
}: {
  value: number;
  /** Receives an updater so rapid clicks never use a stale count */
  onChange: (next: (current: number) => number) => void;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center rounded-md border border-navy-200 bg-white">
      <button
        aria-label={`Fewer ${label}`}
        onClick={() => onChange((v) => v - 1)}
        disabled={value === 0}
        className="p-2 text-navy-500 hover:text-brand disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        aria-label={`Number of ${label}`}
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const typed = parseInt(e.target.value.replace(/\D/g, "") || "0", 10);
          onChange(() => typed);
        }}
        className="w-9 border-x border-navy-200 py-1.5 text-center text-sm font-semibold text-navy-950 outline-none"
      />
      <button aria-label={`More ${label}`} onClick={() => onChange((v) => v + 1)} className="p-2 text-navy-500 hover:text-brand">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
