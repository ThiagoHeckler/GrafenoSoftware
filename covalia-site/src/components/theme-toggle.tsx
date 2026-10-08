"use client";

import { Icon } from "./icon";

/*
 * O ícone e o texto certos aparecem via CSS (.only-light / .only-dark),
 * então o HTML do servidor é igual ao do navegador, sem erro de hidratação.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("tema", next);
    } catch {
      /* navegação privada: o tema vale só para esta visita */
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      <span className="only-light"><Icon name="moon" size={19} /><span className="sr-only">Usar tema escuro</span></span>
      <span className="only-dark"><Icon name="sun" size={19} /><span className="sr-only">Usar tema claro</span></span>
    </button>
  );
}
