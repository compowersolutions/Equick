import type { ReactNode } from "react";

/** Dark page header matching the home and about pages. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Optional second line shown in brand blue */
  highlight?: string;
  children?: ReactNode;
}) {
  return (
    <section className="cp-hero px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <span className="cp-eyebrow">{eyebrow}</span>
        <h1 className="font-display mt-2 max-w-[18ch] text-white">
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-brand">{highlight}</span>
            </>
          )}
        </h1>
        {children && (
          <div className="mt-5 max-w-[56ch] text-base leading-relaxed text-navy-300 sm:text-lg">{children}</div>
        )}
      </div>
    </section>
  );
}
