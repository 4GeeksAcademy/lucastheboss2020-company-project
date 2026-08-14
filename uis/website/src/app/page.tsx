"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Language = "en" | "es";

type Service = {
  title: string;
  bullets: string[];
  description?: string;
};

type Copy = {
  home: string;
  applyNow: string;
  about: string;
  services: string;
  contact: string;
  followUs: string;
  quickLinks: string;
  phoneLabel: string;
  emailLabel: string;
  serviceAreaLabel: string;
  hoursLabel: string;
  trusted: string;
  heroTitle: string;
  heroBody: string;
  viewServices: string;
  whyTitle: string;
  whyItems: { title: string; text: string }[];
  aboutTitle: string;
  aboutBody1: string;
  aboutBody2: string;
  servicesTitle: string;
  servicesSubtitle: string;
  serviceItems: Service[];
  contactTitle: string;
  contactText: string;
  serviceArea: string;
  hours: string[];
  serviceTag: string;
  footer: string;
};

const copyByLanguage: Record<Language, Copy> = {
  en: {
    home: "Home",
    applyNow: "Apply Now",
    about: "About",
    services: "Services",
    contact: "Contact Us",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    phoneLabel: "Phone",
    emailLabel: "Email",
    serviceAreaLabel: "Service Area",
    hoursLabel: "Hours",
    trusted: "Trusted In New York",
    heroTitle: "Exterior Masonry Protection That Lasts",
    heroBody:
      "PAB Restoration delivers precision craftsmanship in pointing, caulking, and waterproofing for residential and commercial properties.",
    viewServices: "View Services",
    whyTitle: "Why Property Owners Choose PAB Restoration",
    whyItems: [
      {
        title: "Owner-Led Craftsmanship",
        text: "Every project is guided by an exterior waterproofing mason with extensive field expertise.",
      },
      {
        title: "Built For New York Weather",
        text: "Solutions are designed to stand up to freeze-thaw cycles, rainfall, and urban wear.",
      },
      {
        title: "Clear, Reliable Communication",
        text: "Fast scheduling, transparent updates, and dependable timelines from start to finish.",
      },
    ],
    aboutTitle: "About PAB Restoration",
    aboutBody1:
      "PAB Restoration is a specialized construction company dedicated to protecting and preserving building exteriors through expert masonry and waterproofing services.",
    aboutBody2:
      "The company focuses on pointing, caulking, and waterproofing to keep properties structurally sound, weather-resistant, and visually appealing.",
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive exterior restoration services for New York properties.",
    serviceItems: [
      {
        title: "Brick and Stone Pointing",
        bullets: [
          "Removal of deteriorated mortar",
          "Installation of new, properly matched mortar",
          "Structural reinforcement of masonry walls",
          "Improved appearance and extended building lifespan",
        ],
        description:
          "Pointing restores masonry integrity and prevents water penetration.",
      },
      {
        title: "Professional Caulking Services",
        bullets: [
          "Joint sealing around windows and doors",
          "Expansion joint caulking",
          "High-performance sealants",
        ],
        description:
          "Proper caulking prevents leaks, infiltration, and energy loss.",
      },
      {
        title: "Exterior Waterproofing",
        bullets: [
          "Above-grade waterproof coatings",
          "Protective barriers and sealants",
          "Crack repair and water intrusion prevention",
          "Moisture-control solutions",
        ],
        description:
          "Protects buildings from leaks, mold, and moisture damage.",
      },
      {
        title: "Facade Cleaning and Surface Prep",
        bullets: ["Power washing", "Efflorescence removal", "Surface prep for coatings"],
      },
      {
        title: "Minor Masonry Repairs",
        bullets: ["Brick replacement", "Patchwork", "Small-scale restoration"],
      },
      {
        title: "Commercial & Residential Service",
        bullets: [
          "Multi-unit buildings",
          "Commercial properties",
          "Townhomes and single-family residences",
        ],
      },
    ],
    contactTitle: "Contact",
    contactText:
      "Reach our team quickly for quotes, scheduling, and emergency exterior water infiltration concerns.",
    serviceArea:
      "Astoria, Queens, Manhattan, Brooklyn, The Bronx, Staten Island, and nearby New York metro areas.",
    hours: [
      "Monday-Friday: 6:30 AM-7:00 PM",
      "Saturday: 7:00 AM-3:00 PM",
      "Sunday: Emergency leak response only",
    ],
    serviceTag: "Commercial & Residential Service",
    footer: "Copyright 2026 PAB Restoration. All rights reserved.",
  },
  es: {
    home: "Inicio",
    applyNow: "Aplicar Ahora",
    about: "Nosotros",
    services: "Servicios",
    contact: "Contáctanos",
    followUs: "Síguenos",
    quickLinks: "Enlaces rápidos",
    phoneLabel: "Teléfono",
    emailLabel: "Correo",
    serviceAreaLabel: "Área de servicio",
    hoursLabel: "Horario",
    trusted: "Confiable en Nueva York",
    heroTitle: "Protección exterior de mampostería que perdura",
    heroBody:
      "PAB Restoration ofrece mano de obra de precisión en rejuntado, calafateo e impermeabilización para propiedades residenciales y comerciales.",
    viewServices: "Ver Servicios",
    whyTitle: "Por qué los propietarios eligen PAB Restoration",
    whyItems: [
      {
        title: "Trabajo liderado por su propietario",
        text: "Cada proyecto es guiado por un albañil experto en impermeabilización exterior.",
      },
      {
        title: "Construido para el clima de Nueva York",
        text: "Las soluciones resisten lluvia, congelación y desgaste urbano.",
      },
      {
        title: "Comunicación clara y confiable",
        text: "Programación ágil, actualizaciones transparentes y tiempos confiables.",
      },
    ],
    aboutTitle: "Sobre PAB Restoration",
    aboutBody1:
      "PAB Restoration es una empresa especializada en proteger y preservar exteriores de edificios con servicios expertos de mampostería e impermeabilización.",
    aboutBody2:
      "La empresa se enfoca en rejuntado, calafateo e impermeabilización para mantener inmuebles sólidos, resistentes al clima y visualmente atractivos.",
    servicesTitle: "Nuestros Servicios",
    servicesSubtitle: "Servicios integrales de restauración exterior para propiedades en Nueva York.",
    serviceItems: [
      {
        title: "Rejuntado de ladrillo y piedra",
        bullets: [
          "Retiro de mortero deteriorado",
          "Instalación de mortero nuevo",
          "Refuerzo estructural de muros",
          "Mejor apariencia y mayor vida útil",
        ],
        description: "Restaura la integridad de la mampostería y evita filtraciones.",
      },
      {
        title: "Servicios profesionales de calafateo",
        bullets: [
          "Sellado de juntas en ventanas y puertas",
          "Calafateo de juntas de expansión",
          "Selladores de alto desempeño",
        ],
        description: "Evita fugas de aire, agua y pérdida de energía.",
      },
      {
        title: "Impermeabilización exterior",
        bullets: [
          "Recubrimientos impermeables sobre nivel",
          "Barreras protectoras",
          "Reparación de grietas",
          "Soluciones de control de humedad",
        ],
        description: "Protege edificios de filtraciones, moho y daños estructurales.",
      },
      {
        title: "Limpieza de fachada y preparación",
        bullets: ["Lavado a presión", "Eliminación de eflorescencia", "Preparación de superficies"],
      },
      {
        title: "Reparaciones menores de mampostería",
        bullets: ["Reemplazo de ladrillos", "Resanes", "Restauración a pequeña escala"],
      },
      {
        title: "Servicio comercial y residencial",
        bullets: [
          "Edificios multifamiliares",
          "Propiedades comerciales",
          "Viviendas unifamiliares",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactText:
      "Contacta a nuestro equipo para cotizaciones, programación y emergencias por filtraciones.",
    serviceArea:
      "Astoria, Queens, Manhattan, Brooklyn, El Bronx, Staten Island y zonas cercanas del área metropolitana de Nueva York.",
    hours: [
      "Lunes-Viernes: 6:30 AM-7:00 PM",
      "Sábado: 7:00 AM-3:00 PM",
      "Domingo: solo emergencias por filtraciones",
    ],
    serviceTag: "Servicio comercial y residencial",
    footer: "Copyright 2026 PAB Restoration. Todos los derechos reservados.",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Language>("en");

  const c = useMemo(() => copyByLanguage[lang], [lang]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <strong className="brand">PAB Restoration</strong>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#home">{c.home}</a>
            <Link href="/apply">{c.applyNow}</Link>
            <a href="#about">{c.about}</a>
            <a href="#services">{c.services}</a>
            <a href="#contact">{c.contact}</a>
          </nav>
          <button
            type="button"
            className="button"
            onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </header>

      <main id="home" className="page">
        <section className="hero">
          <span className="pill">{c.trusted}</span>
          <h1>{c.heroTitle}</h1>
          <p>{c.heroBody}</p>
          <p className="hero-tag">{c.serviceTag}</p>
          <div className="cta-row">
            <Link href="/apply" className="button">
              {c.applyNow}
            </Link>
            <a href="#services" className="button ghost">
              {c.viewServices}
            </a>
          </div>
        </section>

        <section className="section">
          <h2>{c.whyTitle}</h2>
          <div className="grid-3">
            {c.whyItems.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <h2>{c.aboutTitle}</h2>
          <p>{c.aboutBody1}</p>
          <p>{c.aboutBody2}</p>
        </section>

        <section className="section" id="services">
          <h2>{c.servicesTitle}</h2>
          <p>{c.servicesSubtitle}</p>
          <div className="service-list">
            {c.serviceItems.map((service) => (
              <article key={service.title} className="card">
                <h3>{service.title}</h3>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {service.description ? <p>{service.description}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <h2>{c.contactTitle}</h2>
          <p>{c.contactText}</p>
          <p>
            <strong>{c.phoneLabel}:</strong> +1 (646) 555-0142
          </p>
          <p>
            <strong>{c.emailLabel}:</strong> contact@pabrestorationny.com
          </p>
          <p>
            <strong>{c.serviceAreaLabel}:</strong> {c.serviceArea}
          </p>
          <h3>{c.hoursLabel}</h3>
          <ul>
            {c.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <div className="footer-grid">
            <section>
              <h3>PAB Restoration</h3>
              <p>{c.contactText}</p>
            </section>
            <section>
              <h3>{c.quickLinks}</h3>
              <ul>
                <li>
                  <a href="#home">{c.home}</a>
                </li>
                <li>
                  <Link href="/apply">{c.applyNow}</Link>
                </li>
                <li>
                  <a href="#about">{c.about}</a>
                </li>
                <li>
                  <a href="#services">{c.services}</a>
                </li>
              </ul>
            </section>
            <section>
              <h3>{c.followUs}</h3>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>LinkedIn</p>
            </section>
          </div>
          <p>{c.footer}</p>
        </footer>
      </main>
    </>
  );
}
