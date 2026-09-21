const leadForm = document.getElementById("lead-form");

const ERROR_MESSAGES = {
  companyName: "Company name must have at least 2 characters",
  contactPerson: "Enter first and last name of contact",
  corporateEmail: "Enter a valid corporate email (example: name@company.com)",
  phone: "Phone must include country code (example: +1 213 555 0147)",
  companyWebsite: "If you include website, it must be a valid URL",
  operatingCountry: "Select main operating country",
  productType: "Select the type of product you handle",
  monthlyVolume: "Select estimated monthly volume",
  servicesOfInterest: "Select at least one service of interest",
  current3pl: "Indicate if you currently work with another logistics provider",
  comments: "Comments cannot exceed 500 characters (X remaining)",
  privacyPolicy: "You must accept the privacy policy to continue"
};

const SUCCESS_MESSAGE = `
  <strong class="block text-base">Thank you for your interest in TrackFlow!</strong>
  <span class="mt-4 block">We have received your request. Our commercial team will review your information and contact you within the next 24-48 hours to schedule a call and learn about your logistics needs in detail.</span>
  <span class="mt-4 block">If you have any urgent inquiry, write to us directly at <a href="mailto:comercial@trackflow.com" class="text-trackBlue underline">comercial@trackflow.com</a></span>
`;

const LOW_VOLUME_WARNING = "For volumes under 100 monthly shipments, our services might not be the most efficient solution. Are you sure you want to continue?";

function trimValue(input) {
  return input ? input.value.trim() : "";
}

function getSelectedServices() {
  return Array.from(document.querySelectorAll("input[name='servicesOfInterest']:checked"));
}

function getSelectedThreePL() {
  return document.querySelector("input[name='current3pl']:checked");
}

function setFieldError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const input = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = message;
    if (message) {
      errorElement.setAttribute("role", "alert");
      errorElement.setAttribute("aria-live", "polite");
    }
  }

  if (input) {
    input.classList.toggle("border-red-500", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) {
      input.setAttribute("aria-describedby", `${fieldId}Error`);
    }
  }
}

function setGroupError(groupName, message) {
  const errorElement = document.getElementById(`${groupName}Error`);
  const inputs = document.querySelectorAll(`input[name='${groupName}']`);

  if (errorElement) {
    errorElement.textContent = message;
    if (message) {
      errorElement.setAttribute("role", "alert");
      errorElement.setAttribute("aria-live", "polite");
    }
  }

  inputs.forEach((input) => {
    input.closest("label")?.classList.toggle("border-red-500", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) {
      input.setAttribute("aria-describedby", `${groupName}Error`);
    }
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^\+\d{1,3}[\d\s().-]{7,20}$/.test(value);
}

function isValidWebsite(value) {
  if (!value) {
    return true;
  }

  if (!/^https?:\/\//i.test(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    return Boolean(url.hostname.includes("."));
  } catch (error) {
    return false;
  }
}

function hasFirstAndLastName(value) {
  return value.split(/\s+/).filter(Boolean).length >= 2;
}

function shouldShowLowVolumeWarning() {
  const monthlyVolume = document.getElementById("monthlyVolume");
  const productType = document.getElementById("productType");

  return trimValue(monthlyVolume) === "0-100" && trimValue(productType) !== "";
}

function updateVolumeWarning() {
  const warning = document.getElementById("volumeWarning");

  if (!warning) {
    return;
  }

  warning.textContent = LOW_VOLUME_WARNING;
  warning.classList.toggle("hidden", !shouldShowLowVolumeWarning());
}

function updateCommentsCounter() {
  const comments = document.getElementById("comments");
  const counter = document.getElementById("commentsCounter");

  if (!comments || !counter) {
    return;
  }

  counter.textContent = `${comments.value.length}/500`;
}

function validateLeadForm() {
  const companyName = document.getElementById("companyName");
  const contactPerson = document.getElementById("contactPerson");
  const corporateEmail = document.getElementById("corporateEmail");
  const phone = document.getElementById("phone");
  const companyWebsite = document.getElementById("companyWebsite");
  const operatingCountry = document.getElementById("operatingCountry");
  const productType = document.getElementById("productType");
  const monthlyVolume = document.getElementById("monthlyVolume");
  const comments = document.getElementById("comments");
  const privacyPolicy = document.getElementById("privacyPolicy");

  let isValid = true;
  let firstErrorField = null;

  const checks = [
    ["companyName", trimValue(companyName).length >= 2, ERROR_MESSAGES.companyName],
    ["contactPerson", hasFirstAndLastName(trimValue(contactPerson)), ERROR_MESSAGES.contactPerson],
    ["corporateEmail", isValidEmail(trimValue(corporateEmail)), ERROR_MESSAGES.corporateEmail],
    ["phone", isValidPhone(trimValue(phone)), ERROR_MESSAGES.phone],
    ["companyWebsite", isValidWebsite(trimValue(companyWebsite)), ERROR_MESSAGES.companyWebsite],
    ["operatingCountry", trimValue(operatingCountry) !== "", ERROR_MESSAGES.operatingCountry],
    ["productType", trimValue(productType) !== "", ERROR_MESSAGES.productType],
    ["monthlyVolume", trimValue(monthlyVolume) !== "", ERROR_MESSAGES.monthlyVolume],
    ["comments", !comments || comments.value.length <= 500, ERROR_MESSAGES.comments],
    ["privacyPolicy", Boolean(privacyPolicy?.checked), ERROR_MESSAGES.privacyPolicy]
  ];

  checks.forEach(([fieldId, passes, message]) => {
    setFieldError(fieldId, passes ? "" : message);
    if (!passes) {
      isValid = false;
      if (!firstErrorField) {
        firstErrorField = document.getElementById(fieldId);
      }
    }
  });

  const servicesSelected = getSelectedServices().length > 0;
  setGroupError("servicesOfInterest", servicesSelected ? "" : ERROR_MESSAGES.servicesOfInterest);
  if (!servicesSelected) {
    isValid = false;
    if (!firstErrorField) {
      firstErrorField = document.querySelector("input[name='servicesOfInterest']");
    }
  }

  const threePLSelected = Boolean(getSelectedThreePL());
  setGroupError("current3pl", threePLSelected ? "" : ERROR_MESSAGES.current3pl);
  if (!threePLSelected) {
    isValid = false;
    if (!firstErrorField) {
      firstErrorField = document.querySelector("input[name='current3pl']");
    }
  }

  if (!isValid && firstErrorField) {
    firstErrorField.focus();
    firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  updateVolumeWarning();
  return isValid;
}

function showStatus(message, type) {
  const status = document.getElementById("formStatus");

  if (!status) {
    return;
  }

  status.innerHTML = message;
  status.classList.remove("bg-red-50", "bg-emerald-50", "p-4", "text-red-700", "text-emerald-800");

  if (type === "success") {
    status.classList.add("bg-emerald-50", "p-4", "text-emerald-800");
  }

  if (type === "error") {
    status.classList.add("bg-red-50", "p-4", "text-red-700");
  }
}

if (leadForm) {
  const comments = document.getElementById("comments");
  const monthlyVolume = document.getElementById("monthlyVolume");
  const productType = document.getElementById("productType");

  comments?.addEventListener("input", updateCommentsCounter);
  monthlyVolume?.addEventListener("change", updateVolumeWarning);
  productType?.addEventListener("change", updateVolumeWarning);

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateLeadForm()) {
      showStatus("Please correct the highlighted fields before submitting.", "error");
      return;
    }

    showStatus(SUCCESS_MESSAGE, "success");
    leadForm.reset();
    updateCommentsCounter();
    updateVolumeWarning();
  });

  updateCommentsCounter();
  updateVolumeWarning();
}
