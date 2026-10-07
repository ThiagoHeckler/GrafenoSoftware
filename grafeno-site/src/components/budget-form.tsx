"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cloneElement, FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

const segments = ["Comércio e varejo", "Alimentação", "Saúde e bem-estar", "Serviços", "Indústria", "Educação", "Outro"];
const companySizes = ["Sou só eu", "2 a 5 pessoas", "6 a 20 pessoas", "21 a 50 pessoas", "Mais de 50 pessoas"];
const needs = ["Site institucional", "Loja virtual", "Aplicativo", "Sistema de gestão", "Integração ou automação", "Outro"];
const deadlines = ["O quanto antes", "Nos próximos 3 meses", "Em 3 a 6 meses", "Estou pesquisando, sem prazo definido"];
const budgets = ["Até R$ 5 mil", "R$ 5 mil a R$ 15 mil", "R$ 15 mil a R$ 40 mil", "Acima de R$ 40 mil", "Quero entender as possibilidades"];

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  segment: "",
  size: "",
  need: "",
  details: "",
  deadline: "",
  budget: "",
};

type FormState = typeof emptyForm;
type FormKey = keyof FormState;
type Errors = Record<string, string>;

/* A ordem das chaves é a ordem dos campos na tela: o primeiro erro recebe o foco. */
function stepOneErrors(form: FormState): Errors {
  const next: Errors = {};
  if (!form.name.trim()) next.name = "Conte seu nome para a gente.";
  if (!form.company.trim()) next.company = "Informe o nome da empresa.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Confira o e-mail: falta o @ ou o domínio.";
  if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Informe o WhatsApp com DDD, por exemplo (49) 99999-9999.";
  return next;
}

function stepTwoErrors(form: FormState): Errors {
  const next: Errors = {};
  if (!form.segment) next.segment = "Selecione o segmento da empresa.";
  if (!form.size) next.size = "Selecione o tamanho da equipe.";
  if (!form.need) next.need = "Escolha o que você precisa.";
  if (!form.deadline) next.deadline = "Selecione um prazo desejado.";
  if (!form.budget) next.budget = "Selecione uma faixa de investimento.";
  return next;
}

const fieldIdFor = (key: string) => (key === "need" ? "need-0" : key);

export function BudgetForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [announcement, setAnnouncement] = useState("");
  const [form, setForm] = useState(emptyForm);
  const cardRef = useRef<HTMLDivElement>(null);
  const pushedStepTwo = useRef(false);

  // A etapa vive na URL (?etapa=2), então o voltar do navegador volta uma etapa.
  // Sem os dados da primeira etapa, a segunda não abre.
  const wantsStepTwo = searchParams.get("etapa") === "2";
  const step = wantsStepTwo && Object.keys(stepOneErrors(form)).length === 0 ? 2 : 1;

  const dirty = !submitted && JSON.stringify(form) !== JSON.stringify(emptyForm);

  useEffect(() => {
    if (!dirty) return;
    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  function update(key: FormKey, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: "" }));
  }

  function showErrors(next: Errors) {
    setErrors(next);
    const keys = Object.keys(next);
    setAnnouncement(
      keys.length === 1 ? "1 campo precisa de atenção." : `${keys.length} campos precisam de atenção.`,
    );
    requestAnimationFrame(() => document.getElementById(fieldIdFor(keys[0]))?.focus());
  }

  function goTo(nextStep: number) {
    setAnnouncement("");
    if (nextStep === 2 && !wantsStepTwo) {
      pushedStepTwo.current = true;
      router.push(`${pathname}?etapa=2`, { scroll: false });
    } else if (nextStep === 1 && pushedStepTwo.current) {
      pushedStepTwo.current = false;
      router.back();
    } else {
      router.replace(nextStep === 2 ? `${pathname}?etapa=2` : pathname, { scroll: false });
    }
    requestAnimationFrame(() => cardRef.current?.focus());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = step === 1 ? stepOneErrors(form) : stepTwoErrors(form);
    if (Object.keys(next).length) {
      showErrors(next);
      return;
    }
    if (step === 1) goTo(2);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-card form-done" role="status">
        <svg className="done-mark" aria-hidden="true" viewBox="0 0 100 100" width="64" height="64">
          <circle cx="50" cy="50" r="48" />
          <path d="m32 51 12 12 24-26" />
        </svg>
        <h2>Respostas preenchidas</h2>
        <p>
          Obrigado, {form.name.split(" ")[0]}. Esta página é uma demonstração: nada foi enviado nem
          armazenado.
        </p>
        <Link className="btn btn-primary" href="/">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="form-card" ref={cardRef} tabIndex={-1} aria-labelledby="form-step-title">
      <ol className="form-steps" aria-label="Etapas do formulário">
        <li className="is-done" aria-current={step === 1 ? "step" : undefined}>Seus dados</li>
        <li className={step === 2 ? "is-done" : ""} aria-current={step === 2 ? "step" : undefined}>Sobre o projeto</li>
      </ol>

      <p className="sr-only" aria-live="polite">{announcement}</p>

      <form onSubmit={handleSubmit} noValidate>
        {step === 1 ? (
          <div key="step-one">
            <div className="form-heading">
              <h2 id="form-step-title">Como podemos chamar você?</h2>
              <p>Usamos estes dados só para responder a você.</p>
            </div>
            <div className="field-grid">
              <Field label="Seu nome" error={errors.name} required>
                <input id="name" name="name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Ana Souza" />
              </Field>
              <Field label="Empresa" error={errors.company} required>
                <input id="company" name="company" autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Padaria da Ana" />
              </Field>
              <Field label="E-mail" error={errors.email} required>
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="ana@empresa.com.br" />
              </Field>
              <Field label="WhatsApp com DDD" error={errors.phone} required>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(49) 99999-9999" />
              </Field>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" type="submit">Continuar para o projeto</button>
            </div>
          </div>
        ) : (
          <div key="step-two">
            <div className="form-heading">
              <h2 id="form-step-title">O que sua empresa precisa?</h2>
              <p>Uma estimativa já ajuda a entender por onde começar.</p>
            </div>
            <div className="field-grid">
              <Field label="Segmento" error={errors.segment} required>
                <select id="segment" name="segment" autoComplete="off" value={form.segment} onChange={(event) => update("segment", event.target.value)}>
                  <option value="">Selecione</option>
                  {segments.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
              <Field label="Tamanho da equipe" error={errors.size} required>
                <select id="size" name="size" autoComplete="off" value={form.size} onChange={(event) => update("size", event.target.value)}>
                  <option value="">Selecione</option>
                  {companySizes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
            </div>
            <fieldset className="need-fieldset" aria-describedby={errors.need ? "need-error" : undefined}>
              <legend>O que você mais precisa agora? <span className="required-mark" aria-hidden="true">*</span></legend>
              <div className="choice-grid">
                {needs.map((item, index) => (
                  <label className="choice" key={item}>
                    <input
                      id={`need-${index}`}
                      name="need"
                      value={item}
                      type="radio"
                      checked={form.need === item}
                      onChange={() => update("need", item)}
                    />
                    <span className="choice-box" aria-hidden="true"><Icon name="check" size={13} /></span>
                    {item}
                  </label>
                ))}
              </div>
              {errors.need && <span className="field-error" id="need-error">{errors.need}</span>}
            </fieldset>
            <Field label="Conte um pouco mais (opcional)">
              <textarea id="details" name="details" autoComplete="off" value={form.details} onChange={(event) => update("details", event.target.value)} placeholder="Ex.: quero que meus clientes agendem pelo celular…" rows={3} />
            </Field>
            <div className="field-grid">
              <Field label="Prazo desejado" error={errors.deadline} required>
                <select id="deadline" name="deadline" autoComplete="off" value={form.deadline} onChange={(event) => update("deadline", event.target.value)}>
                  <option value="">Selecione</option>
                  {deadlines.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
              <Field label="Faixa de investimento" error={errors.budget} required>
                <select id="budget" name="budget" autoComplete="off" value={form.budget} onChange={(event) => update("budget", event.target.value)}>
                  <option value="">Selecione</option>
                  {budgets.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" type="button" onClick={() => goTo(1)}>Voltar</button>
              <button className="btn btn-primary" type="submit">Enviar respostas</button>
            </div>
            <p className="fine-print">Demonstração: nenhuma informação é enviada ou armazenada.</p>
          </div>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactElement<{ id: string }>;
}) {
  const inputId = children.props.id;
  const errorId = `${inputId}-error`;
  const control = cloneElement(children as ReactElement<Record<string, unknown>>, {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    required,
  });

  return (
    <div className="field">
      <label htmlFor={inputId}>
        {label}
        {required && <span className="required-mark" aria-hidden="true"> *</span>}
      </label>
      {control}
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </div>
  );
}
