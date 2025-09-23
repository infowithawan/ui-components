import {
  validateEmail,
  validateMessage,
  validateName,
  validateSubject,
} from "./utils.js";

let watchError = false;

const contactForm = document.querySelector("form");
const submitBtn = document.querySelector("button");
const msgBox = document.querySelector(".msg-box");
const allInputs = document.querySelectorAll(".focus-none");

allInputs.forEach((inp) => {
  inp.addEventListener("input", (evt) => {
    if (watchError) {
      let fieldName = evt.target.getAttribute("name");
      let fieldValue = evt.target.value;
      if (fieldName === "fullname") {
        validateName(fieldValue);
      } else if (fieldName === "subject") {
        validateSubject(fieldValue);
      } else if (fieldName === "email") {
        validateEmail(fieldValue);
      } else if (fieldName === "message") {
        validateMessage(fieldValue);
      }
    }
  });
});

contactForm.addEventListener("submit", handleSubmit);

async function handleSubmit(evt) {
  evt.preventDefault();
  watchError = true;
  submiting();
  const formData = {};
  new FormData(evt.currentTarget).forEach((val, key) => {
    formData[key] = val.trim();
  });
  if (!validateForm(formData)) {
    submiting();
    return;
  }
  watchError = false;
  const res = await submitForm(formData);
  submiting();
  if (res.resStatus) {
    resetForm();
    displayMessage(true, res.message);
    return;
  }
  displayMessage(false, res.error);
  return;
}

function resetForm() {
  allInputs.forEach((inp) => {
    inp.value = "";
  });
}

function submiting() {
  submitBtn.classList.toggle("submitting");
}

function validateForm(formdata) {
  let validations = 0;
  validations += validateName(formdata.fullname) ? 1 : 0;
  validations += validateEmail(formdata.email) ? 1 : 0;
  validations += validateSubject(formdata.subject) ? 1 : 0;
  validations += validateMessage(formdata.message) ? 1 : 0;
  return validations === 4 ? true : false;
}

async function submitForm(formData) {
  try {
    const res = await fetch("/api");
    const parsedRes = await res.json();
    return {
      resStatus: true,
      message: "Form submitted successfully",
    };
  } catch (_) {
    return {
      resStatus: false,
      error: "Internal server error",
    };
  }
}

function displayMessage(status, message) {
  msgBox.innerText = message;
  msgBox.classList.add(status ? "form-success" : "form-error");
  msgBox.classList.remove(status ? "form-error" : "form-success");
  setTimeout(() => {
    msgBox.innerText = "";
    msgBox.classList.remove(["form-error", "form-success"]);
  }, 2000);
}
