(function () {
  const translations = {
    "Home": "Inicio",
    "Services": "Servicios",
    "Coverage": "Cobertura",
    "Contact": "Contacto",
    "Los Angeles + Zaragoza": "Los Angeles + Zaragoza",
    "Logistics that scales with your e-commerce": "Logistica que escala con tu e-commerce",
    "Warehouse management, last-mile deliveries, and reverse logistics in the United States and Spain. Over 15 years helping fashion, electronics, and cosmetics brands grow without worrying about operations.": "Gestion de almacenes, entregas de ultima milla y logistica inversa en Estados Unidos y Espana. Mas de 15 anos ayudando a marcas de moda, electronica y cosmetica a crecer sin preocuparse por sus operaciones.",
    "Request information": "Solicitar informacion",
    "View services": "Ver servicios",
    "Founded in 2009": "Fundada en 2009",
    "130 logistics professionals serving binational e-commerce operations.": "130 profesionales de logistica al servicio de operaciones e-commerce binacionales.",
    "Integrated operations for mid-sized fashion, electronics, and cosmetics e-commerce brands.": "Operaciones integradas para marcas e-commerce medianas de moda, electronica y cosmetica.",
    "Warehouse Management": "Gestion de almacenes",
    "Storage, picking and packing": "Almacenaje, picking y packing",
    "Real-time inventory": "Inventario en tiempo real",
    "We operate warehouses in Los Angeles and Zaragoza": "Operamos almacenes en Los Angeles y Zaragoza",
    "Last-Mile Deliveries": "Entregas de ultima milla",
    "Certified carrier network in both countries": "Red de transportistas certificados en ambos paises",
    "Unified shipment tracking": "Seguimiento unificado de envios",
    "Incident and returns management": "Gestion de incidencias y devoluciones",
    "Reverse Logistics": "Logistica inversa",
    "Complete returns management": "Gestion completa de devoluciones",
    "Inspection and reconditioning": "Inspeccion y reacondicionamiento",
    "Integration with your sales platform": "Integracion con tu plataforma de ventas",
    "One logistics partner across two markets with local warehouse infrastructure and carrier relationships.": "Un socio logistico en dos mercados con infraestructura local de almacenes y relaciones con transportistas.",
    "United States": "Estados Unidos",
    "Warehouse in Los Angeles": "Almacen en Los Angeles",
    "National coverage": "Cobertura nacional",
    "Carriers: UPS, FedEx, DHL": "Transportistas: UPS, FedEx, DHL",
    "Spain": "Espana",
    "Warehouse in Zaragoza": "Almacen en Zaragoza",
    "Peninsular and island coverage": "Cobertura peninsular e insular",
    "Carriers: MRW, SEUR, DHL": "Transportistas: MRW, SEUR, DHL",
    "Why TrackFlow": "Por que TrackFlow",
    "Binational operation: The only operator with own infrastructure in the United States and Spain": "Operacion binacional: El unico operador con infraestructura propia en Estados Unidos y Espana",
    "+130 professionals dedicated to your logistics": "+130 profesionales dedicados a tu logistica",
    "Own technology for total visibility of your inventory": "Tecnologia propia para visibilidad total de tu inventario",
    "E-commerce specialization in fashion, electronics, and cosmetics": "Especializacion e-commerce en moda, electronica y cosmetica",
    "Tell us about your monthly volume, product category, countries, and services of interest. Miguel Torres and the commercial team will review your request.": "Cuentanos tu volumen mensual, categoria de producto, paises y servicios de interes. Miguel Torres y el equipo comercial revisaran tu solicitud.",
    "Email:": "Email:",
    "Los Angeles:": "Los Angeles:",
    "Zaragoza:": "Zaragoza:",
    "Complete the form and our commercial team will contact you within 24-48 hours.": "Completa el formulario y nuestro equipo comercial te contactara en 24-48 horas.",
    "Company name": "Nombre de la empresa",
    "Contact person": "Persona de contacto",
    "Corporate email": "Email corporativo",
    "Phone": "Telefono",
    "Company website": "Sitio web de la empresa",
    "Main operating country": "Pais principal de operacion",
    "Select an option": "Selecciona una opcion",
    "Both": "Ambos",
    "Other": "Otro",
    "Product type": "Tipo de producto",
    "Fashion": "Moda",
    "Electronics": "Electronica",
    "Cosmetics": "Cosmetica",
    "Food": "Alimentacion",
    "Estimated monthly shipping volume": "Volumen mensual estimado de envios",
    "Not sure": "No estoy seguro",
    "Services of interest": "Servicios de interes",
    "Warehousing": "Almacenaje",
    "Last mile": "Ultima milla",
    "Do you currently work with another 3PL?": "Trabajas actualmente con otro 3PL?",
    "Yes": "Si",
    "No": "No",
    "Evaluating options": "Evaluando opciones",
    "Comments or specific needs": "Comentarios o necesidades especificas",
    "For volumes under 100 monthly shipments, our services might not be the most efficient solution. Are you sure you want to continue?": "Para volumenes inferiores a 100 envios mensuales, nuestros servicios podrian no ser la solucion mas eficiente. Seguro que quieres continuar?",
    "I accept the privacy policy": "Acepto la politica de privacidad",
    "Submit request": "Enviar solicitud",
    "TrackFlow": "TrackFlow",
    "© 2025 TrackFlow. All rights reserved.": "© 2025 TrackFlow. Todos los derechos reservados.",
    "LinkedIn": "LinkedIn",
    "Toggle menu": "Abrir menu"
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
