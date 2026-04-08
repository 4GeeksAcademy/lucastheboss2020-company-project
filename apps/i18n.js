(function () {
  const translations = {
    "Home": "Inicio",
    "Apply Now": "Aplicar Ahora",
    "About": "Nosotros",
    "Services": "Servicios",
    "Contact Us": "Contáctanos",
    "Trusted In New York": "Confiable en Nueva York",
    "Exterior Masonry Protection That Lasts": "Protección exterior de mampostería que perdura",
    "PAB Restoration delivers precision craftsmanship in pointing, caulking, and waterproofing for residential and commercial properties.": "PAB Restoration ofrece mano de obra de precisión en rejuntado, calafateo e impermeabilización para propiedades residenciales y comerciales.",
    "View Services": "Ver Servicios",
    "Template image: replace this URL with your featured project photo.": "Imagen de plantilla: reemplaza esta URL con tu foto principal de proyecto.",
    "Why Property Owners Choose PAB Restoration": "Por qué los propietarios eligen PAB Restoration",
    "Owner-Led Craftsmanship": "Trabajo liderado por su propietario",
    "Every project is guided by an exterior waterproofing mason with extensive field expertise.": "Cada proyecto es guiado por un albañil experto en impermeabilización exterior con amplia experiencia en campo.",
    "Built For New York Weather": "Construido para el clima de Nueva York",
    "Solutions are designed to stand up to freeze-thaw cycles, rainfall, and urban wear.": "Las soluciones están diseñadas para resistir ciclos de congelación y deshielo, lluvia y desgaste urbano.",
    "Clear, Reliable Communication": "Comunicación clara y confiable",
    "Fast scheduling, transparent updates, and dependable timelines from start to finish.": "Programación ágil, actualizaciones transparentes y tiempos confiables de principio a fin.",
    "About PAB Restoration": "Sobre PAB Restoration",
    "PAB Restoration is a specialized construction company dedicated to protecting and preserving building exteriors through expert masonry and waterproofing services. Founded and owned by a seasoned exterior waterproofing mason, the company brings hands-on craftsmanship, technical precision, and decades of field experience to every project.": "PAB Restoration es una empresa de construcción especializada dedicada a proteger y preservar exteriores de edificios mediante servicios expertos de mampostería e impermeabilización. Fundada y dirigida por un experimentado albañil de impermeabilización exterior, la empresa aporta trabajo práctico, precisión técnica y décadas de experiencia en cada proyecto.",
    "PAB Restoration focuses on three core services. pointing, caulking, and waterproofing-ensuring that residential, commercial, and multi-unit properties remain structurally sound, weather-resistant, and visually appealing. With a deep understanding of how water, time, and climate impact masonry structures, the company approaches each job with a commitment to long-term durability and meticulous detail.": "PAB Restoration se enfoca en tres servicios principales: rejuntado, calafateo e impermeabilización, asegurando que propiedades residenciales, comerciales y multifamiliares se mantengan estructuralmente firmes, resistentes al clima y visualmente atractivas. Con un profundo entendimiento de cómo el agua, el tiempo y el clima afectan las estructuras de mampostería, la empresa aborda cada trabajo con compromiso de durabilidad a largo plazo y detalle meticuloso.",
    "Template image: replace with a crew, project, or on-site detail photo.": "Imagen de plantilla: reemplaza con una foto del equipo, del proyecto o de detalles en obra.",
    "Our Services": "Nuestros Servicios",
    "Comprehensive exterior restoration services for New York properties.": "Servicios integrales de restauración exterior para propiedades en Nueva York.",
    "Brick and Stone Pointing": "Rejuntado de ladrillo y piedra",
    "Removal of deteriorated mortar": "Retiro de mortero deteriorado",
    "Installation of new, properly matched mortar": "Instalación de mortero nuevo correctamente igualado",
    "Structural reinforcement of masonry walls": "Refuerzo estructural de muros de mampostería",
    "Improved appearance and extended building lifespan": "Mejor apariencia y mayor vida útil del edificio",
    "Pointing restores the integrity of brick and stone surfaces, preventing water penetration and preserving the building's original character.": "El rejuntado restaura la integridad de superficies de ladrillo y piedra, evita la penetración de agua y preserva el carácter original del edificio.",
    "Professional Caulking Services": "Servicios profesionales de calafateo",
    "Joint sealing around windows, doors, and facade transitions": "Sellado de juntas en ventanas, puertas y transiciones de fachada",
    "Expansion joint caulking": "Calafateo de juntas de expansión",
    "High-performance sealants for long-term flexibility and adhesion": "Selladores de alto desempeño para flexibilidad y adhesión a largo plazo",
    "Proper caulking prevents air leaks, water infiltration, and energy loss while maintaining a clean, finished exterior.": "Un calafateo adecuado evita fugas de aire, filtraciones de agua y pérdidas de energía, manteniendo un exterior limpio y terminado.",
    "Exterior Waterproofing": "Impermeabilización exterior",
    "Above-grade waterproof coatings": "Recubrimientos impermeables sobre nivel",
    "Sealants and protective barriers": "Selladores y barreras protectoras",
    "Crack repair and water intrusion prevention": "Reparación de grietas y prevención de entrada de agua",
    "Moisture-control solutions for masonry, concrete, and facade systems": "Soluciones de control de humedad para sistemas de mampostería, concreto y fachada",
    "These services protect buildings from leaks, mold, and structural damage caused by moisture exposure.": "Estos servicios protegen edificios de filtraciones, moho y daños estructurales causados por la humedad.",
    "Facade Cleaning and Surface Prep": "Limpieza de fachada y preparación de superficies",
    "Power washing": "Lavado a presión",
    "Efflorescence removal": "Eliminación de eflorescencia",
    "Surface preparation for coatings or repairs": "Preparación de superficies para recubrimientos o reparaciones",
    "Minor Masonry Repairs": "Reparaciones menores de mampostería",
    "Brick replacement": "Reemplazo de ladrillos",
    "Patchwork": "Resanes",
    "Small-scale restoration to maintain structural integrity": "Restauración a pequeña escala para mantener la integridad estructural",
    "Commercial & Residential Service": "Servicio comercial y residencial",
    "Multi-unit buildings": "Edificios multifamiliares",
    "Commercial properties": "Propiedades comerciales",
    "Townhomes and single-family residences": "Casas adosadas y viviendas unifamiliares",
    "Reach our team quickly for quotes, scheduling, and emergency exterior water infiltration concerns.": "Contacta a nuestro equipo rápidamente para cotizaciones, programación y emergencias por filtraciones exteriores.",
    "Call (646) 555-0142": "Llama al (646) 555-0142",
    "Email Us": "Envíanos un correo",
    "Phone": "Teléfono",
    "Email": "Correo",
    "Service Area": "Área de servicio",
    "Astoria, Queens, Manhattan, Brooklyn, The Bronx, Staten Island, and nearby New York metro areas": "Astoria, Queens, Manhattan, Brooklyn, El Bronx, Staten Island y zonas cercanas del área metropolitana de Nueva York",
    "Hours": "Horario",
    "Monday-Friday: 6:30 AM-7:00 PM": "Lunes-Viernes: 6:30 AM-7:00 PM",
    "Saturday: 7:00 AM-3:00 PM": "Sábado: 7:00 AM-3:00 PM",
    "Sunday: Emergency leak response only": "Domingo: solo respuesta de emergencia por filtraciones",
    "PAB Restoration": "PAB Restoration",
    "Contact": "Contacto",
    "Quick Links": "Enlaces rápidos",
    "Follow Us": "Síguenos",
    "Copyright © 2026 PAB Restoration. All rights reserved.": "Copyright © 2026 PAB Restoration. Todos los derechos reservados.",
    "Careers": "Carreras",
    "Apply To Work With PAB Restoration": "Aplica para trabajar con PAB Restoration",
    "Build your future with a New York restoration team focused on quality masonry, waterproofing, and long-term durability.": "Construye tu futuro con un equipo de restauración en Nueva York enfocado en mampostería de calidad, impermeabilización y durabilidad a largo plazo.",
    "Template image: replace this URL with your hiring or team photo.": "Imagen de plantilla: reemplaza esta URL con una foto de contratación o del equipo.",
    "Please complete all fields below and submit your application.": "Completa todos los campos a continuación y envía tu solicitud.",
    "Full Name": "Nombre completo",
    "Phone Number": "Número de teléfono",
    "Address": "Dirección",
    "Position Applying For": "Puesto al que aplicas",
    "Years of Experience": "Años de experiencia",
    "Upload Resume": "Subir currículum",
    "Short Message / Cover Letter": "Mensaje corto / carta de presentación",
    "Submit Application": "Enviar solicitud"
  };

  const originalTextMap = new WeakMap();
  const originalAttributeMap = new WeakMap();

  function preserveWhitespace(original, translated) {
    const leading = (original.match(/^\s*/) || [""])[0];
    const trailing = (original.match(/\s*$/) || [""])[0];
    return leading + translated + trailing;
  }

  function translateTextValue(original, lang) {
    if (lang !== "es") {
      return original;
    }

    const trimmed = original.trim();
    if (!trimmed) {
      return original;
    }

    const translated = translations[trimmed];
    if (!translated) {
      return original;
    }

    return preserveWhitespace(original, translated);
  }

  function translateTextNodes(lang) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          const parent = node.parentElement;
          if (!parent) {
            return NodeFilter.FILTER_REJECT;
          }

          if (parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = walker.nextNode();
    }

    nodes.forEach((node) => {
      if (!originalTextMap.has(node)) {
        originalTextMap.set(node, node.nodeValue);
      }
      const original = originalTextMap.get(node);
      node.nodeValue = translateTextValue(original, lang);
    });
  }

  function translateAttributes(lang) {
    const attributes = ["placeholder", "title", "aria-label"];
    const nodes = document.querySelectorAll("[placeholder], [title], [aria-label]");

    nodes.forEach((node) => {
      if (!originalAttributeMap.has(node)) {
        originalAttributeMap.set(node, {});
      }

      const saved = originalAttributeMap.get(node);
      attributes.forEach((attribute) => {
        if (!node.hasAttribute(attribute)) {
          return;
        }

        if (!saved[attribute]) {
          saved[attribute] = node.getAttribute(attribute);
        }

        const originalValue = saved[attribute];
        const trimmed = originalValue.trim();
        const translated = lang === "es" ? translations[trimmed] || originalValue : originalValue;
        node.setAttribute(attribute, translated);
      });
    });
  }

  function updateLanguageToggleLabel(lang) {
    const button = document.getElementById("languageToggle");
    const label = document.getElementById("languageToggleLabel");

    if (!button || !label) {
      return;
    }

    if (lang === "es") {
      label.textContent = "EN";
      button.setAttribute("aria-label", "Switch language to English");
      button.setAttribute("title", "Switch to English");
    } else {
      label.textContent = "ES";
      button.setAttribute("aria-label", "Cambiar idioma a español");
      button.setAttribute("title", "Cambiar a español");
    }
  }

  function applyLanguage(lang) {
    const safeLang = lang === "es" ? "es" : "en";
    document.documentElement.lang = safeLang;
    translateTextNodes(safeLang);
    translateAttributes(safeLang);
    updateLanguageToggleLabel(safeLang);
    localStorage.setItem("siteLanguage", safeLang);
  }

  function initLanguageToggle() {
    const button = document.getElementById("languageToggle");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const current = document.documentElement.lang === "es" ? "es" : "en";
      const next = current === "es" ? "en" : "es";
      applyLanguage(next);
    });
  }

  window.getCurrentLanguage = function () {
    return document.documentElement.lang === "es" ? "es" : "en";
  };

  document.addEventListener("DOMContentLoaded", () => {
    initLanguageToggle();
    const savedLanguage = localStorage.getItem("siteLanguage") || "en";
    applyLanguage(savedLanguage);
  });
})();
