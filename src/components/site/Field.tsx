import type { ReactNode } from "react";

export const fieldClass =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-0 aria-[invalid=true]:border-destructive";

export function Field({ id, label, error, children, className }: { id: string; label: string; error?: string | undefined; children: ReactNode; className?: string | undefined }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block text-muted-foreground">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
