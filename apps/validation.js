const applicationForm = document.getElementById("applicationForm");
const APPLICATION_ENDPOINT = "https://formspree.io/f/your-form-id";

function getDictionary() {
  const lang = typeof window.getCurrentLanguage === "function" ? window.getCurrentLanguage() : "en";

  if (lang === "es") {
    return {
      fullName: "Ingresa tu nombre completo.",
      phone: "Ingresa un número de teléfono válido.",
      email: "Ingresa un correo electrónico válido.",
      address: "Ingresa tu dirección.",
      position: "Ingresa el puesto al que aplicas.",
      experience: "Ingresa años de experiencia entre 0 y 60.",
      message: "Escribe al menos 20 caracteres en tu carta de presentación.",
      resumeRequired: "Por favor sube tu currículum.",
      resumeType: "El currículum debe ser un archivo PDF, DOC o DOCX.",
      fixFields: "Corrige los campos marcados antes de enviar.",
      sending: "Enviando tu solicitud...",
      success: "Solicitud enviada con éxito. Te contactaremos pronto.",
      failure: "No pudimos enviar tu solicitud en este momento. Envía tu currículum a contact@pabrestorationny.com."
    };
  }

  return {
    fullName: "Enter your full name.",
    phone: "Enter a valid phone number.",
    email: "Enter a valid email address.",
    address: "Enter your address.",
    position: "Enter the position you are applying for.",
    experience: "Enter years of experience between 0 and 60.",
    message: "Write at least 20 characters in your cover letter.",
    resumeRequired: "Please upload your resume.",
    resumeType: "Resume must be a PDF, DOC, or DOCX file.",
    fixFields: "Please correct the highlighted fields before submitting.",
    sending: "Sending your application...",
    success: "Application submitted successfully. We will contact you soon.",
    failure: "We could not submit your application right now. Please email your resume to contact@pabrestorationny.com."
  };
}

if (applicationForm) {
  applicationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const t = getDictionary();

    const fullName = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const position = document.getElementById("position");
    const experience = document.getElementById("experience");
    const resume = document.getElementById("resume");
    const message = document.getElementById("message");
    const status = document.getElementById("formStatus");
    const submitButton = applicationForm.querySelector("button[type='submit']");

    const fields = [
      { input: fullName, key: "fullName", rule: (v) => v.trim().length >= 2, msg: t.fullName },
      { input: phone, key: "phone", rule: (v) => /^\+?[0-9()\-\s]{10,20}$/.test(v.trim()), msg: t.phone },
      { input: email, key: "email", rule: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: t.email },
      { input: address, key: "address", rule: (v) => v.trim().length >= 5, msg: t.address },
      { input: position, key: "position", rule: (v) => v.trim().length >= 2, msg: t.position },
      { input: experience, key: "experience", rule: (v) => v !== "" && Number(v) >= 0 && Number(v) <= 60, msg: t.experience },
      { input: message, key: "message", rule: (v) => v.trim().length >= 20, msg: t.message }
    ];

    let isValid = true;

    fields.forEach(({ input, key, rule, msg }) => {
      const errorEl = document.getElementById(`${key}Error`);
      const value = input.value;
      if (!rule(value)) {
        errorEl.textContent = msg;
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        errorEl.textContent = "";
        input.classList.remove("border-red-500");
      }
    });

    const resumeError = document.getElementById("resumeError");
    const selectedFile = resume.files && resume.files[0];

    if (!selectedFile) {
      resumeError.textContent = t.resumeRequired;
      resume.classList.add("border-red-500");
      isValid = false;
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      const allowedExtensions = ["pdf", "doc", "docx"];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      const isKnownMime = selectedFile.type && allowedTypes.includes(selectedFile.type);
      const isKnownExtension = allowedExtensions.includes(fileExtension);

      if (!isKnownMime && !isKnownExtension) {
        resumeError.textContent = t.resumeType;
        resume.classList.add("border-red-500");
        isValid = false;
      } else {
        resumeError.textContent = "";
        resume.classList.remove("border-red-500");
      }
    }

    if (!isValid) {
      status.textContent = t.fixFields;
      status.classList.remove("text-green-700");
      status.classList.add("text-red-700");
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add("opacity-70", "cursor-not-allowed");
      }

      status.textContent = t.sending;
      status.classList.remove("text-red-700", "text-green-700");
      status.classList.add("text-gray-700");

      const formData = new FormData(applicationForm);
      const response = await fetch(APPLICATION_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      status.textContent = t.success;
      status.classList.remove("text-gray-700", "text-red-700");
      status.classList.add("text-green-700");
      applicationForm.reset();
    } catch (error) {
      status.textContent = t.failure;
      status.classList.remove("text-gray-700", "text-green-700");
      status.classList.add("text-red-700");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove("opacity-70", "cursor-not-allowed");
      }
    }
  });
}
