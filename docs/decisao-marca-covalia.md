# Decisão: Grafeno Software passa a se chamar Covalia Software

- **Data:** 08/10/2026
- **Status:** aprovada. A troca no site depende de registrar `covalia.com.br` e da busca no INPI (ver "Pendências").
- **Onde guardar:** `docs/decisao-marca-covalia.md`, na raiz do repositório.

## Contexto

Na busca de marcas do INPI aparecem várias empresas de software com "Grafeno" no nome. Acrescentar "Software" (ou "Sistemas", "Tech" etc.) não resolve, por dois motivos:

- **"Software" não distingue nada.** É uma palavra que descreve o serviço, então o INPI compara as marcas pelo "Grafeno".
- **A lei proíbe a semelhança.** A Lei 9.279/96, art. 124, XIX, veda registrar marca que imite outra já registrada para serviços parecidos (classes 9 e 42).

Continuar com o nome trazia risco de o INPI negar o registro, de outra empresa se opor ao pedido ou de chegar uma notificação depois que a marca já estivesse em uso.

## Decisão

1. **O nome da marca passa a ser Covalia Software.** "Covalia" é uma palavra inventada e vem de *ligação covalente*, a ligação que une os átomos de carbono no grafeno. No texto corrido, usar só "Covalia". O nome completo, "Covalia Software", vai no título das páginas, no rodapé e nos documentos legais.
2. **O domínio principal passa a ser `covalia.com.br`.** `grafenosoftware.com.br` continua registrado e redireciona com 301 para o domínio novo, para não perder links já divulgados.
3. **O conceito visual do grafeno continua.** A malha hexagonal, os átomos e as ligações seguem como linguagem visual do site. O que sai é a palavra "Grafeno" como nome da empresa.
4. **O símbolo muda de forma.** O anel de carbono com três ligações para fora vira um "C": um hexágono aberto à direita, com um átomo azul solto onde estaria o sexto vértice. Esse átomo representa a ligação que se completa com o cliente.

## O que não muda

- Paleta de cores (`globals.css`, tokens `--ligacao`, `--carbono` etc.).
- Fontes: Unbounded 600 no nome, Figtree 500 no restante.
- Layout, seções, textos de serviços, preços, processo e formulário.
- Os componentes visuais de grafeno (`graphene.ts`, `graphene-lattice.tsx`, `graphene-field.tsx`, ilustrações das soluções). O material continua sendo "grafeno"; só deixa de ser o nome da empresa.
- Os nomes de arquivos e componentes internos (`GrapheneWhy`, `graphene-*.tsx`). Renomear é opcional e não afeta quem visita o site.
- O WhatsApp de contato e o número.

## Regras de texto

| Antes | Depois |
|---|---|
| Grafeno Software | Covalia Software |
| a Grafeno (a empresa) | a Covalia |
| Por que escolher a Grafeno | Por que escolher a Covalia |
| Por que Grafeno? | Por que Covalia? |
| site da Grafeno | site da Covalia |
| grafenosoftware.com.br | covalia.com.br |
| grafeno (material, na malha e nas ilustrações) | **mantém** "grafeno" |

Explicação do nome, para usar na seção "Por que Covalia?":

> Covalia vem de ligação covalente: a ligação química em que os átomos compartilham o que têm para formar algo mais forte. É ela que une o carbono no grafeno, um dos materiais mais finos, leves e resistentes já descobertos. É assim que a gente pensa software: construído lado a lado com o seu negócio.

A legenda da malha pode continuar: "Cada ponto é um átomo de carbono. Isolado em 2004, o grafeno rendeu o Nobel de Física de 2010."

## Símbolo (especificação)

O desenho fica num quadro de 64×64 e é construído sobre o mesmo hexágono do símbolo antigo.

- **Fundo:** hexágono `16,6 48,6 62,32 48,58 16,58 2,32`, cor `--ligacao` (`#2f6690`), com contorno de 4 e cantos arredondados.
- **Ligações:** traço `M40.5 17.28 L23.5 17.28 L15 32 L23.5 46.72 L40.5 46.72`, de espessura 4.2, com pontas e cantos arredondados.
- **Átomos brancos:** nos 5 vértices do traço, com raio 3.7.
- **Átomo azul:** em `49,32`, com raio 4.6, cor `--acento-carbono` (`#78b0e3`). Ele não se liga a nada.
- **Saem do símbolo antigo:** as três ligações que apontavam para fora e o sexto vértice ligado.

`src/app/icon.svg` completo:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <polygon points="16,6 48,6 62,32 48,58 16,58 2,32" fill="#2f6690" stroke="#2f6690" stroke-width="4" stroke-linejoin="round"/>
  <path d="M40.5 17.28 L23.5 17.28 L15 32 L23.5 46.72 L40.5 46.72" fill="none" stroke="#fff" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
  <g fill="#fff">
    <circle cx="40.5" cy="46.72" r="3.7"/><circle cx="23.5" cy="46.72" r="3.7"/><circle cx="15" cy="32" r="3.7"/>
    <circle cx="23.5" cy="17.28" r="3.7"/><circle cx="40.5" cy="17.28" r="3.7"/>
  </g>
  <circle cx="49" cy="32" r="4.6" fill="#78b0e3"/>
</svg>
```

`BrandMark` em `src/components/brand.tsx`:

```tsx
const bonds = "M40.5 17.28 L23.5 17.28 L15 32 L23.5 46.72 L40.5 46.72";
const atoms = [[40.5, 46.72], [23.5, 46.72], [15, 32], [23.5, 17.28], [40.5, 17.28]];

/** Anel de carbono aberto em "C": o átomo solto é a ligação que se completa com o cliente. */
export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <polygon className="brand-mark-bg" points="16,6 48,6 62,32 48,58 16,58 2,32" />
      <path className="brand-mark-bond" d={bonds} />
      {atoms.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="brand-mark-atom" cx={x} cy={y} r={3.7} />
      ))}
      <circle className="brand-mark-free" cx={49} cy={32} r={4.6} />
    </svg>
  );
}
```

No `globals.css`, criar um token para o átomo solto. No tema escuro, o fundo do símbolo (`--ligacao`) vira `#78b0e3`, a mesma cor do átomo azul, e ele sumiria. Por isso, nesse tema, o átomo fica branco; as ligações e os outros átomos já são escuros (`--sobre-ligacao`), então ele continua se destacando.

```css
/* :root (tema claro) */
--atomo-livre: #78b0e3;

/* nos dois blocos de tema escuro:
   @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }
   e :root[data-theme="dark"] { … } */
--atomo-livre: #ffffff;

/* junto das regras .brand-mark-* */
.brand-mark-bond { /* … */ stroke-width: 4.2; }
.brand-mark-free { fill: var(--atomo-livre); }
```

O nome escrito ao lado do símbolo continua como está, mudando só o texto: `covalia<span>software</span>`.

Os arquivos prontos da logo (SVG e PNG) estão no kit `identidade-covalia.zip`. O favicon é `logo-covalia/favicon.svg`.

## Mudanças no código, arquivo por arquivo

### Identidade e metadados
- [ ] `src/app/icon.svg`: trocar pelo SVG acima.
- [ ] `src/components/brand.tsx`: novo `BrandMark`; `aria-label="Covalia Software, página inicial"`; texto `covalia<span>software</span>`.
- [ ] `src/app/globals.css`: token `--atomo-livre` (claro e escuro), `stroke-width` 4.2 em `.brand-mark-bond`, nova regra `.brand-mark-free`, comentário do topo (linha 4) e comentários das linhas 542, 794 e 978 ("Por que Covalia", "O quadro é da Covalia").
- [ ] `src/app/layout.tsx`: `default: "Covalia Software — sites, aplicativos e sistemas sob medida"`, `template: "%s | Covalia Software"`, e a descrição com "A Covalia cria…".
- [ ] `src/app/opengraph-image.tsx`:
  - linha 12, `alt`: "Covalia Software: …";
  - linha 43: `covalia`;
  - o ícone embutido deve vir do novo `icon.svg`;
  - a cor `#9fb5af` de "software" está fora da paleta; trocar por `#8fa0b8`.
- [ ] `src/lib/site.ts`: `SITE_URL = "https://covalia.com.br"`. Isso também atualiza `sitemap.ts` e `robots.ts`.
- [ ] `public/llms.txt`: título, descrição, "O que a Covalia faz", todas as URLs para `covalia.com.br` e o parágrafo do nome (usar a explicação de "Regras de texto").

### Textos das páginas
- [ ] `src/app/page.tsx`: linha 75 ("A Covalia projeta…"), linha 114 ("Por que escolher a Covalia") e linha 155 ("Criei a Covalia para…").
- [ ] `src/components/graphene-why.tsx`: título "Por que Covalia?" e parágrafo novo (ver "Regras de texto"). Os comentários do topo passam a dizer "sobre o software que a Covalia entrega".
- [ ] `src/components/footer.tsx`: `aria-label` e `<h2>` passam a "Covalia"; o copyright fica "Covalia Software".
- [ ] `src/components/whatsapp-float.tsx`: mensagem "Vim pelo site da Covalia…" e `aria-label="Conversar com a Covalia pelo WhatsApp"`.
- [ ] `src/components/budget-form.tsx`, linha 291: "equipe da Covalia".
- [ ] `src/components/showcase.tsx`, linha 9 (comentário): "não a da Covalia".
- [ ] `src/app/orcamento/page.tsx`: descrição com "para a Covalia".
- [ ] `src/app/orcamento/actions.ts`, linha 106: `from: "Site Covalia"`.
- [ ] `src/app/privacidade/page.tsx` e `src/app/termos/page.tsx`: todas as menções a "Grafeno Software". Conferir também se algum texto legal cita domínio ou e-mail.
- [ ] `src/components/graphene.ts`, linha 3 (comentário): "Usada no herói e em 'Por que Covalia'".

### Infra e configuração
- [ ] `.env.example`: `SMTP_USER` e `MAIL_TO` para o e-mail novo (ex.: `contato@covalia.com.br`), depois de criar a caixa de e-mail.
- [ ] `.env` de produção na Hostinger: os mesmos valores.
- [ ] `package.json`: `"name": "covalia-site"` (opcional; rodar `npm install` para atualizar o `package-lock.json`).
- [ ] Redirecionar `grafenosoftware.com.br` para `covalia.com.br` com 301, mantendo o caminho da página (ex.: `/orcamento` → `covalia.com.br/orcamento`). Pode ser feito no painel da Hostinger ou em `next.config.ts` com `redirects()` e condição `has: [{ type: "host", value: "grafenosoftware.com.br" }]`.
- [ ] `docs/style.md`: trocar as 16 referências à Grafeno. `README.md`, `AGENTS.md` e `CLAUDE.md` não citam a marca.
- [ ] Opcional: renomear a pasta `grafeno-site` e o repositório no GitHub. O GitHub redireciona o endereço antigo, mas os remotes locais devem ser atualizados.

### Conferência final
- [ ] `grep -rni "grafeno" src public` só deve achar menções ao **material** (malha, ilustrações, legenda do Nobel).
- [ ] Rodar o build e abrir início, soluções, orçamento, privacidade e termos nos dois temas.
- [ ] Ver a prévia de compartilhamento (`/opengraph-image`) e o favicon na aba.
- [ ] Mandar um orçamento de teste e conferir o remetente e o destino do e-mail.

## Pendências fora do código

1. Buscar "Covalia" no INPI (busca.inpi.gov.br), em busca exata e por radical, nas classes 9, 35 e 42. Se aparecer algo ativo, parar e reavaliar o nome antes de publicar.
2. Registrar `covalia.com.br` no Registro.br. Estava livre em 08/10/2026.
3. Criar o e-mail no domínio novo.
4. Pedir o registro da marca no INPI: marca mista (nome + símbolo), classe 42 no mínimo. Considerar também as classes 9 e 35.
5. Usar "Covalia" como nome fantasia no CNPJ.
6. Atualizar o WhatsApp Business (nome, descrição, saudação, capa) e o Instagram com o kit novo.
7. Atualizar o arquivo do Figma "Grafeno Software — Instagram", que ainda está com o nome antigo.