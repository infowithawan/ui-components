function setError(formField, errorMsg = "Empty") {
  const fieldError = document.querySelector(
    `input[name="${formField}"] ~ .error,textarea[name="${formField}"] ~ .error`
  );
  if (!fieldError) return;
  fieldError.innerText = errorMsg;
  fieldError.classList.remove("hidden");
  fieldError.classList.add("invalid");
}

function resetError(formField = "all") {
  if (formField === "all") {
    const allErrors = document.querySelectorAll(".error.invalid");
    allErrors.forEach((err) => {
      err.innerText = "";
      err.classList.remove("invalid");
      err.classList.add("hidden");
    });
  } else {
    const fieldError = document.querySelector(
      `input[name="${formField}"] ~ .error,textarea[name="${formField}"] ~ .error.invalid`
    );
    if (!fieldError) return;
    fieldError.innerText = "";
    fieldError.classList.remove("invalid");
    fieldError.classList.add("hidden");
  }
}

function isEmpty(str) {
  if (!str.trim()) return true;
  return false;
}

export function validateName(fullname) {
  const nameRegex = /^[a-zA-Z\s]{3,25}$/;
  if (isEmpty(fullname)) {
    setError("fullname", "Fullname is required");
    return false;
  }
  if (!nameRegex.test(fullname)) {
    setError("fullname", "Fullname must be of 3 to 25 letters");
    return false;
  }
  resetError("fullname");
  return true;
}

export function validateEmail(email) {
  const emailRegex = /^[a-z0-9]+@{1}[a-z0-9]+\.{1}[a-z]+$/;
  if (isEmpty(email)) {
    setError("email", "Email is required");
    return false;
  }
  if (!emailRegex.test(email)) {
    setError("email", "Email must be a valid email address");
    return false;
  }
  resetError("email");
  return true;
}

export function validateSubject(subject) {
  const subjectRegex = /^[a-zA-Z\s]{3,20}$/;
  if (isEmpty(subject)) {
    setError("subject", "Subject is required");
    return false;
  }
  if (!subjectRegex.test(subject)) {
    setError("subject", "Subject must be of 3 to 20 letters");
    return false;
  }
  resetError("subject");
  return true;
}

export function validateMessage(message) {
  const messageRegex = /^[a-zA-Z\s]{10,300}$/;
  if (isEmpty(message)) {
    setError("message", "Message is required");
    return false;
  }
  if (!messageRegex.test(message)) {
    setError("message", "Message must be of 10 to 300 letters");
    return false;
  }
  resetError("message");
  return true;
}
