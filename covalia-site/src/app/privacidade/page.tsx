import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Covalia Software coleta, usa e protege os dados de quem visita o site.",
};

const EMAIL = "thiago@covalia.com.br";

export default function PrivacyPage() {
  return (
    <article className="legal-page" aria-labelledby="legal-title">
      <h1 id="legal-title">Política de privacidade</h1>
      <p className="legal-updated">Última atualização: 14 de outubro de 2026</p>
      <p>
        Esta política explica quais dados a Covalia Software coleta quando você visita covalia.com.br,
        para que eles servem e como você pode exercer seus direitos previstos na Lei Geral de Proteção
        de Dados (Lei nº 13.709/2018, a LGPD).
      </p>

      <h2>Quais dados coletamos</h2>
      <h3>Formulário de orçamento</h3>
      <p>
        Quando você pede um orçamento, recebemos o que você preenche: nome, empresa, e-mail,
        WhatsApp, segmento e tamanho da empresa, o que você precisa, prazo, faixa de investimento e
        os detalhes que escrever sobre o projeto.
      </p>
      <h3>Dados de navegação</h3>
      <p>
        Usamos o Google Analytics para entender como o site é usado: quantas pessoas visitam, quais
        páginas abrem, de que região, por qual dispositivo e navegador, e de onde vieram. Essas
        informações são estatísticas e não usamos para identificar você.
      </p>
      <h3>Endereço IP</h3>
      <p>
        Para evitar abuso do formulário, o servidor conta por alguns minutos quantos envios saem de
        cada endereço IP. Essa contagem fica só na memória do servidor e é apagada sozinha.
      </p>

      <h2>Para que usamos</h2>
      <ul>
        <li>Responder ao seu pedido de orçamento e conversar com você sobre o projeto.</li>
        <li>Medir o desempenho do site e melhorar o conteúdo.</li>
        <li>Proteger o formulário contra spam e envios automáticos.</li>
      </ul>
      <p>
        Não vendemos seus dados e não usamos o que você envia para publicidade. Os dados do orçamento
        são tratados para atender ao seu pedido (art. 7º, V, da LGPD), e as estatísticas de navegação
        e a proteção contra abuso, pelo nosso legítimo interesse em manter o site funcionando bem
        (art. 7º, IX).
      </p>

      <h2>Com quem compartilhamos</h2>
      <ul>
        <li>
          <strong>Hostinger</strong>, que hospeda o site e o nosso e-mail. Os pedidos de orçamento
          chegam como e-mail na caixa da Covalia e não ficam guardados em banco de dados.
        </li>
        <li>
          <strong>Google</strong>, que processa as estatísticas do Google Analytics. Veja a{" "}
          <a className="text-link" href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noreferrer">
            política de privacidade do Google
          </a>
          .
        </li>
        <li>
          <strong>WhatsApp</strong>, se você escolher falar com a gente pelo botão do site. A conversa
          segue as regras do próprio WhatsApp.
        </li>
      </ul>
      <p>Alguns desses serviços podem armazenar dados em servidores fora do Brasil.</p>

      <h2>Cookies</h2>
      <p>
        O Google Analytics grava cookies no seu navegador (como <code>_ga</code>) para contar visitas
        sem repetir a mesma pessoa. O site não usa cookies de publicidade. Você pode apagar ou
        bloquear cookies nas configurações do navegador, ou instalar o{" "}
        <a className="text-link" href="https://tools.google.com/dlpage/gaoptout?hl=pt-BR" target="_blank" rel="noreferrer">
          complemento de desativação do Google Analytics
        </a>
        . O site continua funcionando normalmente.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Os e-mails de orçamento ficam guardados enquanto conversamos sobre o projeto e, se ele for
        contratado, durante o contrato e pelo prazo que a lei exigir. Se não seguirmos juntos, você
        pode pedir que sejam apagados a qualquer momento. As estatísticas do Google Analytics seguem
        o prazo de retenção configurado na conta, de no máximo 14 meses.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Pela LGPD, você pode pedir para confirmar se temos dados seus, acessá-los, corrigi-los,
        apagá-los, saber com quem foram compartilhados e revogar o consentimento quando ele for a
        base do tratamento. Basta escrever para{" "}
        <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>. Respondemos em até 15 dias.
        Se não ficar satisfeito, você também pode procurar a Autoridade Nacional de Proteção de
        Dados (ANPD).
      </p>

      <h2>Segurança</h2>
      <p>
        O site usa conexão criptografada (HTTPS), e o acesso aos e-mails de orçamento é restrito à
        equipe da Covalia. Nenhum sistema é totalmente imune a falhas, mas cuidamos para manter seus
        dados protegidos.
      </p>

      <h2>Mudanças nesta política</h2>
      <p>
        Podemos atualizar este texto quando o site mudar. A data no topo da página mostra a versão
        mais recente.
      </p>

      <h2>Contato</h2>
      <p>
        Dúvidas sobre privacidade: <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>. Para
        falar sobre um projeto, <Link className="text-link" href="/orcamento">peça um orçamento</Link>.
      </p>
    </article>
  );
}
