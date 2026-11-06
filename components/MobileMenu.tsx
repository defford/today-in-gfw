"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const links = [
  { href: "/#stories", label: "The briefing" },
  { href: "/issues", label: "Civic tracker" },
  { href: "/#events", label: "What's on" },
  { href: "/bigger-picture", label: "The bigger picture" },
  { href: "/#about", label: "About" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="mobile-menu" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="mobile-menu-toggle"
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-menu-icon" aria-hidden="true"><i /><i /><i /></span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <div id={panelId} className="mobile-menu-panel" role="navigation" aria-label="Mobile navigation" hidden={!open}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}<span aria-hidden="true">↗</span>
          </Link>
        ))}
        <a href="https://www.facebook.com/groups/1465414595688357/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          Share an event <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
