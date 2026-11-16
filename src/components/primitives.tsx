import type { ReactNode } from "react";

export function SectionHeader({
  id,
  label,
  meta,
  title,
  lead,
}: {
  id: string;
  label: string;
  meta?: string;
  title: string;
  lead?: ReactNode;
}) {
  return (
    <header>
      <p className="section-label">
        <span aria-hidden="true">{"//"}</span> {label}
        {meta && <span className="meta">{meta}</span>}
      </p>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function TerminalWindow({
  title,
  status,
  children,
}: {
  title: string;
  status?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="term">
      <div className="term-head">
        <span className="term-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="term-title">{title}</span>
        <span>{status}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

export function StatusPill({ tone = "ok", children }: { tone?: "ok" | "warn"; children: ReactNode }) {
  return (
    <span className="status-pill">
      <span className={`status-dot ${tone === "warn" ? "warn" : ""}`} aria-hidden="true" />
      {children}
    </span>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
