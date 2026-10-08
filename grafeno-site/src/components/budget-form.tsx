"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cloneElement, FormEvent, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { checkEmail, sendBudget } from "@/app/orcamento/actions";
import { suggestEmail } from "@/lib/email";
import {
  budgets,
  companySizes,
  deadlines,
  emptyBudget,
  needs,
  segments,
  stepOneErrors,
  stepTwoErrors,
  type BudgetErrors as Errors,
  type BudgetRequest,
} from "@/lib/budget";
import { Icon } from "./icon";
import { WHATSAPP_URL } from "./whatsapp-float";

type FormKey = keyof BudgetRequest;
type SendState = "idle" | "checking" | "sending" | "sent";

const fieldIdFor = (key: string) => (key === "need" ? "need-0" : key);

export function BudgetForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sendState, setSendState] = useState<SendState>("idle");
  const [sendError, setSendError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [announcement, setAnnouncement] = useState("");
  const [form, setForm] = useState(emptyBudget);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  // E-mail que a pessoa confirmou mesmo com sugestão de correção (ex.: domínio próprio parecido com gmail).
  const [keptEmail, setKeptEmail] = useState("");
  const emailSuggestion = emailTouched ? suggestEmail(form.email) : null;
  const cardRef = useRef<HTMLDivElement>(null);
  const pushedStepTwo = useRef(false);

  // A etapa vive na URL (?etapa=2), então o voltar do navegador volta uma etapa.
  // Sem os dados da primeira etapa, a segunda não abre.
  const wantsStepTwo = searchParams.get("etapa") === "2";
  const step = wantsStepTwo && Object.keys(stepOneErrors(form)).length === 0 ? 2 : 1;

  const submitted = sendState === "sent";
  const dirty = !submitted && JSON.stringify(form) !== JSON.stringify(emptyBudget);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendState === "sending" || sendState === "checking") return;
    const next = step === 1 ? stepOneErrors(form) : stepTwoErrors(form);
    if (Object.keys(next).length) {
      showErrors(next);
      return;
    }
    if (step === 1) {
      const suggestion = suggestEmail(form.email);
      if (suggestion && keptEmail !== form.email) {
        setEmailTouched(true);
        setKeptEmail(form.email);
        showErrors({ email: `Confira o e-mail: parece haver um erro de digitação. Se estiver certo, clique em continuar de novo.` });
        return;
      }
      setSendState("checking");
      setAnnouncement("Conferindo seu e-mail…");
      try {
        const { error } = await checkEmail(form.email);
        if (error) {
          setSendState("idle");
          showErrors({ email: error });
          return;
        }
      } catch {
        // Sem conexão com o servidor: segue; o envio confere de novo.
      }
      setSendState("idle");
      goTo(2);
      return;
    }

    setSendState("sending");
    setSendError("");
    setAnnouncement("Enviando seu pedido…");
    try {
      const result = await sendBudget({ ...form, website: honeypotRef.current?.value ?? "" });
      if (result.ok) {
        setSendState("sent");
        return;
      }
      setSendState("idle");
      if (result.errors && Object.keys(result.errors).length) {
        if (result.errors.email) goTo(1);
        showErrors(result.errors);
        return;
      }
      setSendError(result.message ?? "Não conseguimos enviar agora. Tente de novo em instantes.");
      setAnnouncement("O pedido não foi enviado.");
    } catch {
      setSendState("idle");
      setSendError("Não conseguimos enviar agora. Confira sua conexão e tente de novo.");
      setAnnouncement("O pedido não foi enviado.");
    }
  }

  if (submitted) {
    return (
      <div className="form-card form-done" role="status">
        <svg className="done-mark" aria-hidden="true" viewBox="0 0 100 100" width="64" height="64">
          <circle cx="50" cy="50" r="48" />
          <path d="m32 51 12 12 24-26" />
        </svg>
        <h2>Pedido enviado</h2>
        <p>
          Obrigado, {form.name.split(" ")[0]}. Recebemos seu pedido e respondemos em até 1 dia útil,
          pelo e-mail ou WhatsApp que você informou.
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

      <form onSubmit={handleSubmit} noValidate aria-busy={sendState === "sending"}>
        {/* Armadilha para robôs: escondida de pessoas e de leitores de tela. */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Site</label>
          <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {step === 1 ? (
          <div key="step-one">
            <div className="form-heading">
              <h2 id="form-step-title">Como podemos chamar você?</h2>
              <p>Usamos estes dados só para responder ao seu pedido.</p>
            </div>
            <div className="field-grid">
              <Field label="Seu nome" error={errors.name} required>
                <input id="name" name="name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Ana Souza" />
              </Field>
              <Field label="Empresa" error={errors.company} required>
                <input id="company" name="company" autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Padaria da Ana" />
              </Field>
              <Field
                label="E-mail"
                error={errors.email}
                required
                hint={
                  emailSuggestion && (
                    <span className="field-hint">
                      Você quis dizer <strong>{emailSuggestion}</strong>?{" "}
                      <button type="button" className="link-button" onClick={() => update("email", emailSuggestion)}>
                        Corrigir
                      </button>
                    </span>
                  )
                }
              >
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={form.email} onChange={(event) => update("email", event.target.value)} onBlur={() => setEmailTouched(true)} placeholder="ana@empresa.com.br" />
              </Field>
              <Field label="WhatsApp com DDD" error={errors.phone} required>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(49) 99999-9999" />
              </Field>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={sendState === "checking"}>
                {sendState === "checking" && <span className="spinner" aria-hidden="true" />}
                {sendState === "checking" ? "Conferindo…" : "Continuar para o projeto"}
              </button>
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
            {sendError && (
              <p className="form-alert" role="alert">
                {sendError} Se preferir,{" "}
                <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">fale com a gente pelo WhatsApp</a>.
              </p>
            )}
            <div className="form-actions">
              <button className="btn btn-secondary" type="button" onClick={() => goTo(1)} disabled={sendState === "sending"}>Voltar</button>
              <button className="btn btn-primary" type="submit" disabled={sendState === "sending"}>
                {sendState === "sending" && <span className="spinner" aria-hidden="true" />}
                {sendState === "sending" ? "Enviando…" : "Enviar pedido"}
              </button>
            </div>
            <p className="fine-print">
              Seus dados vão só para a equipe da Covalia. Veja a <Link className="text-link" href="/privacidade">política de privacidade</Link>.
            </p>
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
  hint,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  hint?: ReactNode;
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
      {hint}
    </div>
  );
}
