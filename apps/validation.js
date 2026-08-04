const applicationForm = document.getElementById("applicationForm");
const clearFormButton = document.getElementById("clearFormButton");
const APPLICATION_ENDPOINT = "https://formspree.io/f/your-form-id";

function getDictionary() {
  const lang = typeof window.getCurrentLanguage === "function" ? window.getCurrentLanguage() : "en";

  if (lang === "es") {
    return {
      required: "Este campo es obligatorio.",
      serviceName: "El nombre del servicio debe ser pointing, caulking, waterproofing, cleaning o masonry-repair.",
      serviceBasePrice: "basePrice debe ser mayor que 0.",
      propertyType: "propertyType debe ser residential o commercial.",
      jobServiceId: "JobOrder.serviceId debe coincidir con Service.id.",
      jobPrice: "JobOrder.price debe ser mayor o igual al Service.basePrice.",
      jobStatus: "status debe ser pending, scheduled o completed.",
      employeeRole: "role debe ser mason, laborer o foreman.",
      employeeHourlyRate: "hourlyRate debe ser mayor que 0.",
      assignmentJobId: "Assignment.jobId debe coincidir con JobOrder.id.",
      assignmentEmployeeId: "Assignment.employeeId debe coincidir con Employee.id.",
      hoursWorked: "hoursWorked debe ser mayor o igual a 0.",
      fixFields: "Corrige los campos marcados antes de enviar.",
      sending: "Validando y enviando datos...",
      success: "Datos enviados correctamente y reglas validadas.",
      failure: "No pudimos enviar los datos. Revisa APPLICATION_ENDPOINT en validation.js."
    };
  }

  return {
    required: "This field is required.",
    serviceName: "Service name must be pointing, caulking, waterproofing, cleaning, or masonry-repair.",
    serviceBasePrice: "basePrice must be greater than 0.",
    propertyType: "propertyType must be residential or commercial.",
    jobServiceId: "JobOrder.serviceId must match Service.id.",
    jobPrice: "JobOrder.price must be greater than or equal to Service.basePrice.",
    jobStatus: "status must be pending, scheduled, or completed.",
    employeeRole: "role must be mason, laborer, or foreman.",
    employeeHourlyRate: "hourlyRate must be greater than 0.",
    assignmentJobId: "Assignment.jobId must match JobOrder.id.",
    assignmentEmployeeId: "Assignment.employeeId must match Employee.id.",
    hoursWorked: "hoursWorked must be greater than or equal to 0.",
    fixFields: "Please correct the highlighted fields before submitting.",
    sending: "Validating and sending data...",
    success: "Data submitted successfully and business rules validated.",
    failure: "Could not submit data. Check APPLICATION_ENDPOINT in validation.js."
  };
}

function getFormValues() {
  const getValue = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  return {
    serviceId: getValue("serviceId"),
    serviceName: getValue("serviceName"),
    serviceBasePrice: Number(getValue("serviceBasePrice")),
    jobOrderId: getValue("jobOrderId"),
    clientName: getValue("clientName"),
    propertyType: getValue("propertyType"),
    jobServiceId: getValue("jobServiceId"),
    jobPrice: Number(getValue("jobPrice")),
    jobAddress: getValue("jobAddress"),
    jobDate: getValue("jobDate"),
    jobStatus: getValue("jobStatus"),
    employeeId: getValue("employeeId"),
    employeeName: getValue("employeeName"),
    employeeRole: getValue("employeeRole"),
    employeeHourlyRate: Number(getValue("employeeHourlyRate")),
    assignmentId: getValue("assignmentId"),
    assignmentJobId: getValue("assignmentJobId"),
    assignmentEmployeeId: getValue("assignmentEmployeeId"),
    hoursWorked: Number(getValue("hoursWorked"))
  };
}

function clearVisualState(form) {
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.classList.remove("border-red-500", "border-green-500");
    input.removeAttribute("aria-invalid");
  });

  form.querySelectorAll("span[id$='Error']").forEach((errorEl) => {
    errorEl.textContent = "";
  });

  const status = document.getElementById("formStatus");
  if (status) {
    status.textContent = "";
    status.classList.remove("text-red-700", "text-green-700", "text-gray-700");
    status.classList.add("text-green-700");
  }
}

function setFieldError(id, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(`${id}Error`);
  if (!input || !error) {
    return;
  }

  input.classList.remove("border-green-500");
  input.classList.add("border-red-500");
  input.setAttribute("aria-invalid", "true");
  error.textContent = message;
}

function setFieldValid(id) {
  const input = document.getElementById(id);
  const error = document.getElementById(`${id}Error`);
  if (!input || !error) {
    return;
  }

  input.classList.remove("border-red-500");
  input.classList.add("border-green-500");
  input.setAttribute("aria-invalid", "false");
  error.textContent = "";
}

if (applicationForm) {
  applicationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const t = getDictionary();
    const status = document.getElementById("formStatus");
    const submitButton = applicationForm.querySelector("button[type='submit']");
    const values = getFormValues();

    const allowedServiceNames = ["pointing", "caulking", "waterproofing", "cleaning", "masonry-repair"];
    const allowedPropertyTypes = ["residential", "commercial"];
    const allowedStatuses = ["pending", "scheduled", "completed"];
    const allowedRoles = ["mason", "laborer", "foreman"];

    const validations = [
      { id: "serviceId", valid: values.serviceId.length > 0, message: t.required },
      { id: "serviceName", valid: allowedServiceNames.includes(values.serviceName), message: t.serviceName },
      { id: "serviceBasePrice", valid: Number.isFinite(values.serviceBasePrice) && values.serviceBasePrice > 0, message: t.serviceBasePrice },
      { id: "jobOrderId", valid: values.jobOrderId.length > 0, message: t.required },
      { id: "clientName", valid: values.clientName.length > 0, message: t.required },
      { id: "propertyType", valid: allowedPropertyTypes.includes(values.propertyType), message: t.propertyType },
      { id: "jobServiceId", valid: values.jobServiceId.length > 0 && values.jobServiceId === values.serviceId, message: t.jobServiceId },
      {
        id: "jobPrice",
        valid: Number.isFinite(values.jobPrice) && values.jobPrice >= values.serviceBasePrice && values.jobPrice >= 0,
        message: t.jobPrice
      },
      { id: "jobAddress", valid: values.jobAddress.length > 0, message: t.required },
      { id: "jobDate", valid: values.jobDate.length > 0, message: t.required },
      { id: "jobStatus", valid: allowedStatuses.includes(values.jobStatus), message: t.jobStatus },
      { id: "employeeId", valid: values.employeeId.length > 0, message: t.required },
      { id: "employeeName", valid: values.employeeName.length > 0, message: t.required },
      { id: "employeeRole", valid: allowedRoles.includes(values.employeeRole), message: t.employeeRole },
      { id: "employeeHourlyRate", valid: Number.isFinite(values.employeeHourlyRate) && values.employeeHourlyRate > 0, message: t.employeeHourlyRate },
      { id: "assignmentId", valid: values.assignmentId.length > 0, message: t.required },
      { id: "assignmentJobId", valid: values.assignmentJobId.length > 0 && values.assignmentJobId === values.jobOrderId, message: t.assignmentJobId },
      {
        id: "assignmentEmployeeId",
        valid: values.assignmentEmployeeId.length > 0 && values.assignmentEmployeeId === values.employeeId,
        message: t.assignmentEmployeeId
      },
      { id: "hoursWorked", valid: Number.isFinite(values.hoursWorked) && values.hoursWorked >= 0, message: t.hoursWorked }
    ];

    let firstInvalidId = null;

    validations.forEach((check) => {
      if (check.valid) {
        setFieldValid(check.id);
      } else {
        setFieldError(check.id, check.message);
        if (!firstInvalidId) {
          firstInvalidId = check.id;
        }
      }
    });

    if (firstInvalidId) {
      if (status) {
        status.textContent = t.fixFields;
        status.classList.remove("text-green-700", "text-gray-700");
        status.classList.add("text-red-700");
      }

      const firstInvalidField = document.getElementById(firstInvalidId);
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add("opacity-70", "cursor-not-allowed");
      }

      if (status) {
        status.textContent = t.sending;
        status.classList.remove("text-green-700", "text-red-700");
        status.classList.add("text-gray-700");
      }

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

      if (status) {
        status.textContent = t.success;
        status.classList.remove("text-gray-700", "text-red-700");
        status.classList.add("text-green-700");
      }
    } catch (error) {
      if (status) {
        status.textContent = t.failure;
        status.classList.remove("text-gray-700", "text-green-700");
        status.classList.add("text-red-700");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove("opacity-70", "cursor-not-allowed");
      }
    }
  });

  applicationForm.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      clearVisualState(applicationForm);
    });
  });
}

if (clearFormButton && applicationForm) {
  clearFormButton.addEventListener("click", () => {
    clearVisualState(applicationForm);
  });
}
