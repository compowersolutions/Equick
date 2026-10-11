import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";

/** Layout for Privacy / Terms pages: dark header + readable text column. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div>
      <PageHero eyebrow="Legal" title={title}>
        Last updated {updated}
      </PageHero>
      <section className="bg-cream px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-xl border border-navy-100 bg-white p-6 text-[0.95rem] leading-7 text-navy-500 sm:p-10 [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-navy-950 [&_h2:first-child]:mt-0 [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:text-navy-950 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </article>
      </section>
    </div>
  );
}
