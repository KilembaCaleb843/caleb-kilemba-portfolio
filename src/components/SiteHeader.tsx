"use client";

import { useEffect, useState } from "react";

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#timeline", label: "Timeline" },
  { href: "#knowledge", label: "Writing" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Caleb Kilemba, back to top">
          <span className="prompt" aria-hidden="true">~/</span>
          <span>caleb.kilemba</span>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "close" : "menu"}
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Primary" data-open={open}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
