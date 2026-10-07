"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./brand";
import { Icon } from "./icon";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Início" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/#quem-faz", label: "Quem faz" },
];

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Guarda a página em que o menu foi aberto: mudou de página (inclusive pelo voltar), ele fecha.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenAt(null);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpenAt(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Brand />
        <div className="header-tools">
          <ThemeToggle />
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
        <nav id="main-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpenAt(null)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="btn btn-primary btn-small"
            href="/orcamento"
            aria-current={pathname === "/orcamento" ? "page" : undefined}
            onClick={() => setOpenAt(null)}
          >
            Pedir orçamento
          </Link>
        </nav>
      </div>
    </header>
  );
}
