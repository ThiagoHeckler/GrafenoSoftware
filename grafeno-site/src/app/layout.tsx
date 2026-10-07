import type { Metadata, Viewport } from "next";
import { Figtree, Unbounded } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollReveal } from "@/components/scroll-reveal";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  /* Domínio público, usado para montar a URL absoluta da imagem de compartilhamento. */
  metadataBase: new URL("https://grafenosoftware.com.br"),
  title: {
    default: "Grafeno Software — sites, aplicativos e sistemas sob medida",
    template: "%s | Grafeno Software",
  },
  description:
    "A Grafeno cria sites, aplicativos e sistemas inteligentes e robustos para empresas de todos os tamanhos.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1715" },
  ],
};

/* Aplica o tema salvo antes da primeira pintura, para não piscar. */
const themeScript = `(function(){try{var t=localStorage.getItem("tema");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline de propósito: precisa rodar antes da primeira pintura. Em dev o React
            avisa no console que scripts não rodam em renderização no cliente; aqui ele
            só precisa rodar no HTML do servidor, então o aviso pode ser ignorado. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollReveal />
      </body>
    </html>
  );
}
