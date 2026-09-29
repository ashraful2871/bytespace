import type { ReactNode } from "react";

type PlaceholderProps = {
  /** The design phase that builds this part of the page. */
  phase: string;
  children?: ReactNode;
  className?: string;
};

/** Stand-in body for a route skeleton until its phase builds it. Remove once no page uses it. */
export default function Placeholder({ phase, children, className = "" }: PlaceholderProps) {
  return (
    <div className={`rounded-2xl border border-dashed border-neutral-200 p-8 type-body-m text-body ${className}`}>
      {children}
      <p className="mt-2 type-body-xs text-neutral-500">Placeholder until Phase {phase}.</p>
    </div>
  );
}
