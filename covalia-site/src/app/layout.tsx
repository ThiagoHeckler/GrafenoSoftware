import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  /* Domínio público, usado para montar a URL absoluta da imagem de compartilhamento. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Covalia Software — sites, aplicativos e sistemas sob medida",
    template: "%s | Covalia Software",
  },
  description:
    "A Covalia cria sites, aplicativos e sistemas inteligentes e robustos para empresas de todos os tamanhos.",
};

export const viewport: Viewport = {
  themeColor: "#eef2f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
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
