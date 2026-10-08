import Link from "next/link";

export function Callout() {
  return (
    <section className="callout-wrap" aria-labelledby="callout-title">
      <div className="callout" data-reveal>
        <h2 id="callout-title">Tem um projeto em mente?</h2>
        <p>Conte o que você precisa. A primeira conversa é sem compromisso e você sai dela com um caminho claro.</p>
        <Link className="btn btn-light" href="/orcamento">Pedir orçamento</Link>
      </div>
    </section>
  );
}
