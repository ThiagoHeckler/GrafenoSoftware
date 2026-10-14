import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Regras de uso do site da Covalia Software.",
};

const EMAIL = "thiago@covalia.com.br";

export default function TermsPage() {
  return (
    <article className="legal-page" aria-labelledby="legal-title">
      <h1 id="legal-title">Termos de uso</h1>
      <p className="legal-updated">Última atualização: 14 de outubro de 2026</p>
      <p>
        Estes termos valem para quem acessa covalia.com.br, o site da Covalia Software. Ao navegar
        pelo site ou enviar o formulário de orçamento, você concorda com eles. Se não concordar, é só
        não usar o site.
      </p>

      <h2>O que é o site</h2>
      <p>
        O site apresenta os serviços da Covalia: criação de sites, aplicativos e sistemas sob medida.
        Ele serve para você conhecer o nosso trabalho e pedir um orçamento. Nenhuma contratação
        acontece pelo site.
      </p>

      <h2>Exemplos e valores</h2>
      <p>
        As telas, produtos, pedidos, preços e planos que aparecem nas demonstrações (como a padaria e
        os pedidos pagos com Pix) são ilustrativos. Eles mostram o tipo de solução que podemos
        construir e não são ofertas nem preços dos nossos serviços.
      </p>

      <h2>Pedido de orçamento</h2>
      <ul>
        <li>Enviar o formulário não cria nenhum compromisso de contratação, nem para você nem para nós.</li>
        <li>
          O orçamento é feito a partir do que você conta sobre o projeto. Prazos, valores e escopo só
          valem depois de combinados por escrito, em proposta ou contrato próprio.
        </li>
        <li>Pedimos que as informações enviadas sejam verdadeiras e que o contato seja seu ou da sua empresa.</li>
      </ul>

      <h2>Uso permitido</h2>
      <p>Ao usar o site, você se compromete a não:</p>
      <ul>
        <li>enviar spam, conteúdo ofensivo ou dados de outras pessoas sem autorização;</li>
        <li>tentar invadir, sobrecarregar ou atrapalhar o funcionamento do site;</li>
        <li>usar robôs para preencher o formulário ou copiar o conteúdo em massa.</li>
      </ul>
      <p>
        Envios que pareçam automáticos ou abusivos podem ser bloqueados por algum tempo.
      </p>

      <h2>Propriedade intelectual</h2>
      <p>
        Os textos, a marca Covalia, o logotipo, as ilustrações, as imagens e o código do site
        pertencem à Covalia Software ou são usados com permissão. Você pode compartilhar links para o
        site, mas não pode copiar, modificar ou reutilizar esse material sem autorização por escrito.
      </p>

      <h2>Links para outros sites</h2>
      <p>
        O site tem links para serviços de terceiros, como o WhatsApp, e para outros sites. Não
        controlamos esses serviços e não respondemos pelo conteúdo ou pelas regras deles.
      </p>

      <h2>Disponibilidade e responsabilidade</h2>
      <p>
        Trabalhamos para manter o site no ar e com informações corretas, mas ele pode ficar fora do
        ar, passar por manutenção ou mudar sem aviso. O conteúdo é informativo e não substitui uma
        proposta formal. A Covalia não responde por prejuízos causados por indisponibilidade do site
        ou por decisões tomadas só com base nele.
      </p>

      <h2>Privacidade</h2>
      <p>
        O tratamento dos seus dados está descrito na{" "}
        <Link className="text-link" href="/privacidade">política de privacidade</Link>.
      </p>

      <h2>Mudanças nestes termos</h2>
      <p>
        Podemos atualizar estes termos quando o site mudar. A data no topo da página mostra a versão
        mais recente, que vale a partir da publicação.
      </p>

      <h2>Lei aplicável e foro</h2>
      <p>
        Estes termos seguem as leis do Brasil, incluindo o Código de Defesa do Consumidor e o Marco
        Civil da Internet, quando aplicáveis.
      </p>
      <p>
        Fica eleito o foro da comarca que abrange Guarujá do Sul, Santa Catarina, para resolver
        qualquer questão sobre estes termos. Se você for consumidor, pode optar pelo foro do seu
        próprio domicílio, como garante o Código de Defesa do Consumidor.
      </p>

      <h2>Contato</h2>
      <p>
        Dúvidas sobre estes termos: <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        Para falar sobre um projeto, <Link className="text-link" href="/orcamento">peça um orçamento</Link>.
      </p>
    </article>
  );
}
