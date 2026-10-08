import type { CSSProperties } from "react";
import { GrapheneLattice } from "./graphene-lattice";

/*
 * Por que "Covalia": o nome vem da ligação que une o carbono no grafeno, e cada
 * propriedade real do material vira uma promessa sobre o software que a Covalia entrega.
 */

const properties = [
  {
    material: "Tem a espessura de um único átomo.",
    title: "Leve",
    text: "Sites que abrem rápido no celular e sistemas que não pesam na rotina de quem usa.",
  },
  {
    material: "É até 200 vezes mais resistente que o aço.",
    title: "Robusto",
    text: "Código testado, dados protegidos e backup em dia. Aguenta o pico de acesso sem cair.",
  },
  {
    material: "Conduz eletricidade e calor muito bem.",
    title: "Conectado",
    text: "Site, app, pagamento, nota fiscal e planilha conversando, sem ninguém redigitar nada.",
  },
  {
    material: "Dobra sem quebrar.",
    title: "Flexível",
    text: "O projeto cresce junto com o negócio: novas telas, novas funções, novas integrações.",
  },
];

export function GrapheneWhy() {
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why-inner">
        <div className="why-intro" data-reveal>
          <h2 id="why-title">Por que Covalia?</h2>
          <p>
            Covalia vem de ligação covalente: a ligação química em que os átomos compartilham o que
            têm para formar algo mais forte. É ela que une o carbono no grafeno, um dos materiais mais
            finos, leves e resistentes já descobertos. É assim que a gente pensa software: construído
            lado a lado com o seu negócio.
          </p>
          <figure className="why-art" data-reveal="lattice">
            <GrapheneLattice />
            <figcaption>Cada ponto é um átomo de carbono. Isolado em 2004, o grafeno rendeu o Nobel de Física de 2010.</figcaption>
          </figure>
        </div>

        <ul className="why-list">
          {properties.map((item, index) => (
            <li key={item.title} data-reveal style={{ "--i": index } as CSSProperties}>
              <p className="why-material">{item.material}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
