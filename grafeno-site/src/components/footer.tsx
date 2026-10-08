import Link from "next/link";
import { Brand } from "./brand";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Brand />
          <p>Sites, aplicativos e sistemas sob medida, feitos para durar.</p>
        </div>
        <nav className="footer-col" aria-label="Covalia">
          <h2>Covalia</h2>
          <Link href="/solucoes">Soluções</Link>
          <Link href="/orcamento">Pedir orçamento</Link>
        </nav>
        <nav className="footer-col" aria-label="Na rede">
          <h2>Na rede</h2>
          <a href="https://thiagoheckler.com.br" target="_blank" rel="noreferrer">thiagoheckler.com.br</a>
          <a href="https://devdiary.cloud" target="_blank" rel="noreferrer">devdiary.cloud</a>
          <a href="https://jornaldoti.com" target="_blank" rel="noreferrer">jornaldoti.com</a>
        </nav>
        <nav className="footer-col" aria-label="Informações">
          <h2>Informações</h2>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos de uso</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© <CurrentYear /> <span translate="no">Covalia Software</span></span>
        <span>CNPJ 00.000.000/0001-00 (dado demonstrativo)</span>
      </div>
    </footer>
  );
}
