const showError = (inputId, errorMessage) => {
  // Display error message
  const inputElement = document.getElementById(inputId);
  inputElement.classList.add("error-input");
  const errorContainer = document.querySelector(`#${inputId}-error`);
  if (errorContainer) {
    errorContainer.textContent = errorMessage;
  }
};

const clearError = (inputId) => {
  // Clear error messages and borders
  const inputElement = document.getElementById(inputId);
  inputElement.classList.remove("error-input");
  const errorContainer = document.querySelector(`#${inputId}-error`);
  if (errorContainer) {
    errorContainer.textContent = "";
  }
};

const validateAndShowError = (inputId, value, errorMessage) => {
  // Validate the input value and show error if necessary
  if (!value) {
    showError(inputId, errorMessage);
    return false;
  }

  // Special validation for email format
  if (inputId === "email" && !validateEmail(value)) {
    showError(inputId, "Invalid email address");
    return false;
  }

  // Special validation for password format
  if (inputId === "pwd" && value.length < 6) {
    showError(inputId, "Password must be at least 6 characters");
    return false;
  }

  clearError(inputId);
  return true;
};
const validateEmail = (email) => {
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const clearInputErrors = (inputIds) => {
  // Clear error messages and borders for multiple inputs
  inputIds.forEach((inputId) => {
    clearErrorInput(inputId);
  });
};

const clearErrorInput = (inputId) => {
  // Remove the red border from the input field
  const inputElement = document.getElementById(inputId);
  inputElement.classList.remove("error-input");
  // Clear the error message
  const errorContainer = document.querySelector(`#${inputId}-error`);
  if (errorContainer) {
    errorContainer.textContent = "";
  }
};
const signUp = (e) => {
  e.preventDefault();
  clearInputErrors(["fname", "lname", "email", "pwd"]);

  let fname = document.getElementById("fname").value.trim(),
    lname = document.getElementById("lname").value.trim(),
    email = document.getElementById("email").value.trim(),
    pwd = document.getElementById("pwd").value.trim();

  if (
    !validateAndShowError("fname", fname, "First Name can't be blank") ||
    !validateAndShowError("lname", lname, "Last Name can't be blank") ||
    !validateAndShowError("email", email, "Email address can't be blank") ||
    !validateAndShowError("pwd", pwd, "Password can't be blank.")
  ) {
    return;
  }

  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  let exist =
    formData.length &&
    formData.some(
      (data) =>
        data.fname.toLowerCase() == fname.toLowerCase() &&
        data.lname.toLowerCase() == lname.toLowerCase()
    );

  if (!exist) {
    formData.push({ fname, lname, email, pwd });
    localStorage.setItem("formData", JSON.stringify(formData));
    document.querySelector("form").reset();
    document.getElementById("fname").focus();
    showSuccess(
      "Registration successful!.\n\nPlease Sign In using the link below."
    );
  } else {
    alert("Ooopppssss... Duplicate found!!!\nYou have already signed up");
    document.querySelector("form").reset();
    document.getElementById("fname").focus();
  }
};

function signIn(e) {
  e.preventDefault();
  clearInputErrors(["email", "pwd"]);

  let email = document.getElementById("email").value.trim(),
    pwd = document.getElementById("pwd").value.trim();

  if (
    !validateAndShowError("email", email, "Email can't be blank") ||
    !validateAndShowError("pwd", pwd, "Password can't be blank")
  ) {
    return;
  }

  let formData = JSON.parse(localStorage.getItem("formData")) || [];
  let exist =
    formData.length &&
    formData.some(
      (data) =>
        data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd
    );

  if (!exist) {
    showLoginError("email-error-message", "Incorrect login credentials");
  } else {
    location.href = "/";
  }
}

const showSuccess = (message) => {
  // Display success message
  document.getElementById("success-message").textContent = message;
};

function showLoginSuccess(message) {
  // Display success message
  document.getElementById("success-message").textContent = message;
}

function logout() {
  // Clear user-related data from localStorage
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loginCheckPerformed");

  // Redirect the user to the login page or any other appropriate action
  window.location.href = "login.html";
}

// Script for Contact Form

function submitContactForm(event) {
  event.preventDefault();

  // Assuming the form is valid, you can show the success message
  showSuccessMessage(
    "Form submitted successfully! We will get back to you soon."
  );

  // You may also add logic here to send the form data to a server or perform other actions.
}

function showSuccessMessage(message) {
  // Display success message
  let successMessage = document.getElementById("success-message");
  successMessage.textContent = message;

  // You can customize the appearance or animation of the success message if needed
  successMessage.style.display = "block";

  // Automatically hide the success message after a certain time (e.g., 5 seconds)
  setTimeout(function () {
    successMessage.style.display = "none";
  }, 5000);
}

/* Contact Form */
function submitContactForm(event) {
  event.preventDefault();

  clearContactErrors();

  // Validate form fields
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const number = document.getElementById("contact-number").value.trim();
  const subject = document.getElementById("contact-subject").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // Validate name
  if (!name) {
    showErrorMessage("contact-name", "Name is required.");
    return;
  }

  // Validate email

  if (!validateContactEmail(email)) {
    showErrorMessage("contact-email", "Invalid email address.");
    return;
  }

  // Validate number
  if (!validatePhoneNumber(number)) {
    showErrorMessage("contact-number", "Invalid number.");
    return;
  }

  // Validate subject
  if (!subject) {
    showErrorMessage("contact-subject", "Subject is required.");
    return;
  }

  // Validate message
  if (!message) {
    showErrorMessage("contact-message", "Message is required.");
    return;
  }

  // Assuming the form is valid, you can show the success message
  showSuccessMessage(
    "Form submitted successfully! We will get back to you soon."
  );

  // You may also add logic here to send the form data to a server or perform other actions.
}

function showErrorMessage(id, message) {
  // Display error message
  const inputElement = document.getElementById(id);
  inputElement.classList.add("error-input");
  const errorContainer = document.querySelector(`#${id}-error`);
  if (errorContainer) {
    errorContainer.textContent = message;
  }
}

function clearContactErrors() {
  // Clear all error messages and styles
  let errorInputs = document.querySelectorAll(".error-input");
  errorInputs.forEach((input) => {
    input.classList.remove("error-input");
    let errorElement = input.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = "";
    }
  });
}

function showSuccessMessage(message) {
  // Display success message
  let successMessage = document.getElementById("success-message");
  successMessage.textContent = message;

  // You can customize the appearance or animation of the success message if needed
  successMessage.style.display = "block";

  // Automatically hide the success message after a certain time (e.g., 5 seconds)
  setTimeout(function () {
    successMessage.style.display = "none";
  }, 5000);
  document.querySelector("form").reset();
}

function validateContactEmail(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(number) {
  // Regular expression for a basic numeric validation
  const numericRegex = /^\d+$/;
  return numericRegex.test(number) && number.length == 10;
  // Regular expression for Canadian phone number format (XXX) XXX-XXXX
  // const canadianPhoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

  // return numericRegex.test(number) && canadianPhoneRegex.test(number);
}
