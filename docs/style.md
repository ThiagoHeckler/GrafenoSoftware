# Guia de estilo — thiagoheckler.com.br

Especificação visual do site principal (`site/`). A fonte da verdade é
`site/css/custom.css`; este arquivo explica as decisões e serve de referência
para manter o portfólio coerente com a **Covalia Software**
(`covalia.com.br`), para onde o site leva visitantes.

## 1. Identidade em uma frase

Marinho profundo, sério e técnico. Fundo quase preto azulado, texto claro,
e **só duas cores de destaque**, que sempre significam banco de dados:
azul = PostgreSQL, verde = MongoDB.

## 2. Cores

Todas as cores são variáveis CSS em `:root`. O tema escuro é o padrão; o claro
é ativado por `data-theme="light"` no `<html>`.

### 2.1 Superfícies e texto

| Token         | Escuro    | Claro     | Uso                                              |
|---------------|-----------|-----------|--------------------------------------------------|
| `--bg`        | `#0d1626` | `#eef2f7` | Fundo da página (igual ao fundo da foto de perfil) |
| `--surface`   | `#121f35` | `#ffffff` | Janela de navegador, cartões, abas ativas        |
| `--surface-2` | `#182843` | `#f3f6fa` | Barra da janela, chips, blocos internos          |
| `--line`      | `#233552` | `#d3dbe6` | Bordas, divisórias, sublinhado de links          |
| `--text`      | `#e6ecf5` | `#0f1b2d` | Texto principal e títulos                        |
| `--muted`     | `#8fa0b8` | `#55647a` | Texto secundário, legendas, links do menu        |

### 2.2 Destaques

| Token      | Escuro    | Claro     | Significado                                 |
|------------|-----------|-----------|---------------------------------------------|
| `--pg`     | `#78b0e3` | `#2f6690` | PostgreSQL. Também foco (`:focus-visible`) e hover de links |
| `--mongo`  | `#5ccb93` | `#17784a` | MongoDB                                     |
| `--warn`   | `#e8b04f` | `#9a6a10` | Só dentro das telas ilustrativas (ex.: PUT) |
| `--danger` | `#e88078` | `#b4443b` | Só dentro das telas ilustrativas (ex.: DELETE) |

Regra: azul e verde **não são decoração**. Cada projeto define `--acc` conforme
o banco que usa (`.stage[data-db="..."]`); projeto com os dois bancos usa o verde.

### 2.3 Botões e sombra

| Token        | Escuro                              | Claro                                 |
|--------------|-------------------------------------|---------------------------------------|
| `--btn-bg`   | `#e6ecf5`                           | `#0f1b2d`                             |
| `--btn-text` | `#0d1626`                           | `#ffffff`                             |
| `--shadow`   | `0 40px 80px -40px rgba(0,0,0,.7)`  | `0 40px 80px -40px rgba(15,27,45,.35)` |

O botão principal é invertido (fundo claro no tema escuro e vice-versa), sem cor
de destaque.

### 2.4 `theme-color`

A meta `theme-color` acompanha `--bg`: `#0d1626` (escuro) / `#eef2f7` (claro).
Se `--bg` mudar, atualizar também o script inline do `<head>` em `index.html`.

## 3. Tipografia

- **Fonte única:** Archivo, variável, auto-hospedada em `site/fonts/archivo-latin.woff2`
  (pesos 100–900, largura `font-stretch` 62%–125%).
- **Fallback:** `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- **Mono** (URLs e JSON nas telas): `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`.
- Corpo: `1.0625rem`, `line-height: 1.55`.
- A personalidade vem da largura condensada nos títulos, não de outra fonte:

| Elemento               | Tamanho                       | `font-stretch` | Peso |
|------------------------|-------------------------------|----------------|------|
| Título do hero         | `clamp(2.75rem, 7vw, 5.75rem)` | 68%           | 700  |
| E-mail de contato      | `clamp(1.375rem, 4.4vw, 3rem)` | 68%           | 700  |
| Títulos de seção (h2)  | `1.75rem` a `2.75rem`          | 75%           | 700  |
| Nome no header, abas   | `1.125rem` a `1.1875rem`       | 87.5%         | 600–700 |

## 4. Forma, espaço e movimento

- **Raios:** 4px (foco, etiquetas), 6px (campos, botões das telas), 8px (botões,
  cartões pequenos), 12px (janela de navegador), 16px (foto), 999px (pílulas).
- **Largura máxima:** `--wrap: 76rem`; margem lateral `--gutter: 2rem` (1rem até 640px).
- **Header:** fixo, `--header-h: 4.5rem` (4rem no celular); ganha fundo com blur ao rolar.
- **Easing único:** `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`.
- **Revelação ao rolar:** opacidade 0 → 1 e `translateY(24px)` → 0 em 0.7s,
  com atraso escalonado de 0.08s. Tudo desligado em `prefers-reduced-motion`.
- **Pontos de quebra:** 1000px (palco fixo vira abas em pílula) e 640px (celular).

## 5. Comparação com a Covalia Software

Extraído do CSS publicado em `grafenosoftware.com.br` (endereço anterior da
Covalia) em 2026-10-07, antes do alinhamento.

| Papel             | Portfólio (escuro) | Covalia (escuro) | Portfólio (claro) | Covalia (claro) |
|-------------------|--------------------|------------------|-------------------|-----------------|
| Fundo             | `#0d1626`          | `#0c1715`        | `#eef2f7`         | `#f3f6f5`       |
| Superfície        | `#121f35`          | `#13221f`        | `#ffffff`         | `#ffffff`       |
| Superfície 2      | `#182843`          | `#1a2d29`        | `#f3f6fa`         | `#e8efec`       |
| Linha             | `#233552`          | `#233632`        | `#d3dbe6`         | `#d5dedb`       |
| Texto             | `#e6ecf5`          | `#e6f0ed`        | `#0f1b2d`         | `#0f1f1c`       |
| Texto suave       | `#8fa0b8`          | `#93a8a3`        | `#55647a`         | `#4a5b57`       |
| Destaque da marca | — (azul/verde = bancos) | `#2bd497`   | —                 | `#0a8a5c`       |
| Fonte             | Archivo            | Figtree (texto) + Unbounded (títulos) | | |
| Raios             | 6–16px             | 12 / 18 / 28px   |                   |                 |

**O que já combina:** os dois sites usam a mesma estrutura de tokens (fundo,
superfície, superfície 2, linha, texto, texto suave), quase os mesmos níveis de
claridade, tema escuro com alternância para claro e respeito à preferência do
sistema.

**O que quebra a transição:** praticamente só o **matiz** dos neutros. O
portfólio puxa para o azul (matiz ≈ 218°) e a Covalia para o verde (≈ 168°).
Como fundo, superfícies e linhas mudam de tom ao mesmo tempo, a página inteira
parece "outra marca". Fontes e raios diferentes reforçam a sensação.

### Caminhos para alinhar

1. **Portfólio adota os neutros da Covalia** (trocar só os 6 tokens da seção
   2.1 pelos valores da coluna Covalia). Transição mais suave, mudança pequena
   no CSS. Ponto de atenção: o verde do MongoDB (`#5ccb93`) fica muito próximo
   do verde da Covalia (`#2bd497`) e o azul do Postgres passa a ser o elemento
   que destoa; a regra "cor = banco" precisaria ser revista ou mantida só nas
   telas dos projetos.
2. **Covalia adota os neutros do portfólio** (marinho) e mantém o verde só como
   destaque da marca. Menos mudanças na Covalia do que parece, porque a
   estrutura de tokens é a mesma.
3. **Neutro comum** sem matiz forte (cinza grafite, ex.: fundo `#111416`) nos
   dois sites, e cada um mantém o próprio destaque. Exige mexer nos dois.

**Decisão (2026-10-07): opção 2.** A opção 1 foi testada no portfólio e
descartada. O portfólio mantém o marinho; a Covalia Software passa a usar os
neutros da seção 2.1 (mesmos valores, nos dois temas) e mantém o verde
(`#2bd497` escuro / `#07754d` claro) apenas como cor de destaque da marca.
O verde claro era `#0a8a5c`; foi escurecido para passar no contraste 4.5:1
sobre o fundo `#eef2f7` e com texto branco nos botões.
Mapeamento direto de tokens na Covalia: `--fundo` = `--bg`,
`--superficie` = `--surface`, `--superficie-2` = `--surface-2`,
`--linha` = `--line`, `--texto` = `--text`, `--texto-suave` = `--muted`;
`--carbono*` e `--sombra` acompanham os mesmos tons marinho.

**Atualização (2026-10-07): destaque azul.** A Covalia deixou o verde e passou a
usar o azul do portfólio (`--pg`: `#78b0e3` escuro / `#2f6690` claro) em todo
destaque: ligações e átomos do grafeno, links, foco, seleções, ícone e chamada
final. O botão principal segue a seção 2.3 (invertido, `--btn-bg` / `--btn-text`)
e a sombra também. Na Covalia o azul é cor da marca, não indica banco de dados.
Únicas exceções: o botão do WhatsApp (verde da marca WhatsApp) e as cores
próprias dos clientes fictícios na vitrine do herói.

## 6. Ao alterar o estilo

- Toda cor nova vira token em `:root` **e** em `:root[data-theme="light"]`.
- Conferir contraste mínimo 4.5:1 para texto (`--muted` sobre `--bg` é o caso mais justo).
- Depois de mudar CSS ou JS, atualizar o `?v=` dos links em `site/index.html`:
  o Caddyfile manda cachear `*.css` e `*.js` por 1 ano (`immutable`).
