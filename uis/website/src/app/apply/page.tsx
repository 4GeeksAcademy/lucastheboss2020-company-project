"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Language = "en" | "es";

type FormDataState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  position: string;
  experience: string;
  message: string;
  resumeName: string;
};

type FormErrors = Partial<Record<keyof FormDataState, string>>;

const initialState: FormDataState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  position: "",
  experience: "",
  message: "",
  resumeName: "",
};

const labels = {
  en: {
    title: "Apply To Work With PAB Restoration",
    subtitle:
      "Please complete all fields below and submit your application.",
    home: "Back to Home",
    submit: "Submit Application",
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email",
    address: "Address",
    position: "Position Applying For",
    experience: "Years of Experience",
    resume: "Upload Resume",
    message: "Short Message / Cover Letter",
    success:
      "Validation successful. Form is ready to submit to the configured endpoint.",
    failure: "Please correct the highlighted fields before submitting.",
    fullNameError: "Enter your full name.",
    phoneError: "Enter a valid phone number.",
    emailError: "Enter a valid email address.",
    addressError: "Enter your address.",
    positionError: "Enter the position you are applying for.",
    experienceError: "Enter years of experience between 0 and 60.",
    resumeError: "Resume must be a PDF, DOC, or DOCX file.",
    messageError: "Write at least 20 characters in your cover letter.",
  },
  es: {
    title: "Aplica para trabajar con PAB Restoration",
    subtitle: "Completa todos los campos y envía tu solicitud.",
    home: "Volver al inicio",
    submit: "Enviar solicitud",
    fullName: "Nombre completo",
    phone: "Número de teléfono",
    email: "Correo",
    address: "Dirección",
    position: "Puesto al que aplicas",
    experience: "Años de experiencia",
    resume: "Subir currículum",
    message: "Mensaje corto / carta de presentación",
    success:
      "Validación completada. El formulario está listo para enviarse al endpoint configurado.",
    failure: "Corrige los campos marcados antes de enviar.",
    fullNameError: "Ingresa tu nombre completo.",
    phoneError: "Ingresa un número de teléfono válido.",
    emailError: "Ingresa un correo electrónico válido.",
    addressError: "Ingresa tu dirección.",
    positionError: "Ingresa el puesto al que aplicas.",
    experienceError: "Ingresa años de experiencia entre 0 y 60.",
    resumeError: "El currículum debe ser PDF, DOC o DOCX.",
    messageError: "Escribe al menos 20 caracteres en tu carta.",
  },
};

export default function ApplyPage() {
  const [lang, setLang] = useState<Language>("en");
  const [data, setData] = useState<FormDataState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");

  const t = useMemo(() => labels[lang], [lang]);

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (data.fullName.trim().length < 2) nextErrors.fullName = t.fullNameError;
    if (!/^\+?[0-9()\-\s]{10,20}$/.test(data.phone.trim())) {
      nextErrors.phone = t.phoneError;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = t.emailError;
    }
    if (data.address.trim().length < 5) nextErrors.address = t.addressError;
    if (data.position.trim().length < 2) nextErrors.position = t.positionError;

    const years = Number(data.experience);
    if (data.experience.trim() === "" || Number.isNaN(years) || years < 0 || years > 60) {
      nextErrors.experience = t.experienceError;
    }

    if (data.message.trim().length < 20) nextErrors.message = t.messageError;

    const extension = data.resumeName.split(".").pop()?.toLowerCase();
    const allowed = ["pdf", "doc", "docx"];
    if (!extension || !allowed.includes(extension)) {
      nextErrors.resumeName = t.resumeError;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = validate();
    setStatus(isValid ? t.success : t.failure);
  }

  return (
    <main className="page" style={{ paddingTop: "2rem" }}>
      <div className="cta-row" style={{ justifyContent: "space-between" }}>
        <Link href="/" className="button ghost">
          {t.home}
        </Link>
        <button
          type="button"
          className="button"
          onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
        >
          {lang === "en" ? "ES" : "EN"}
        </button>
      </div>

      <section className="section">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <form onSubmit={onSubmit} noValidate>
          <div className="grid-3">
            <label>
              {t.fullName}
              <input
                value={data.fullName}
                onChange={(e) => setData((prev) => ({ ...prev, fullName: e.target.value }))}
              />
              <small>{errors.fullName}</small>
            </label>

            <label>
              {t.phone}
              <input
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
              />
              <small>{errors.phone}</small>
            </label>

            <label>
              {t.email}
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              />
              <small>{errors.email}</small>
            </label>

            <label>
              {t.address}
              <input
                value={data.address}
                onChange={(e) => setData((prev) => ({ ...prev, address: e.target.value }))}
              />
              <small>{errors.address}</small>
            </label>

            <label>
              {t.position}
              <input
                value={data.position}
                onChange={(e) => setData((prev) => ({ ...prev, position: e.target.value }))}
              />
              <small>{errors.position}</small>
            </label>

            <label>
              {t.experience}
              <input
                type="number"
                min={0}
                max={60}
                value={data.experience}
                onChange={(e) => setData((prev) => ({ ...prev, experience: e.target.value }))}
              />
              <small>{errors.experience}</small>
            </label>
          </div>

          <label style={{ display: "block", marginTop: "0.8rem" }}>
            {t.resume}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  resumeName: e.target.files?.[0]?.name ?? "",
                }))
              }
            />
            <small>{errors.resumeName}</small>
          </label>

          <label style={{ display: "block", marginTop: "0.8rem" }}>
            {t.message}
            <textarea
              rows={6}
              value={data.message}
              onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
            />
            <small>{errors.message}</small>
          </label>

          <div className="cta-row" style={{ marginTop: "0.9rem" }}>
            <button className="button" type="submit">
              {t.submit}
            </button>
          </div>

          {status ? <p style={{ fontWeight: 700 }}>{status}</p> : null}
        </form>
      </section>
    </main>
  );
}
