const signUp = e => {

     // Prevent the form from submitting
     e.preventDefault();

     // Clear previous error messages
     clearErrors();

    let fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

        // if(this.fname.value.trim() === "") {
        //     document.querySelector(".error-fname").innerHTML = "Please enter your full name"
        //     document.querySelector(".error-fname").style.display = "block"
        //     event.preventDefault();
        //     return false;
        // }

        // Validate form fields
    if (!fname) {
        showError('fname-error', 'First Name can\'t be blank');
        return;
    }

    if (!lname) {
        showError('lname-error', 'Last Name can\'t be blank');
        return;
    }

    if (!validateEmail(email)) {
        showError('email-error', 'Invalid email address');
        return;
    }

    if (pwd.length < 6) {
        showError('pwd-error', 'Password must be at least 6 characters.');
        return;
    }

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.fname.toLowerCase() == fname.toLowerCase() && 
            data.lname.toLowerCase() == lname.toLowerCase()
        );

    if(!exist){
        formData.push({ fname, lname, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
         // Display success message
        showSuccess('Registration successful!.\n\nPlease Sign In using the link below.');
    }
    else{
        alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
    }
    // e.preventDefault();

   
    // Clear the form
    document.querySelector('form').reset();
}

const clearErrors = () => {
    // Clear error messages
    document.getElementById('fname-error').textContent = '';
    document.getElementById('lname-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('pwd-error').textContent = '';
};

const showError = (id, message) => {
    // Display error message
    document.getElementById(id).textContent = message;
};

const showSuccess = message => {
    // Display success message
    document.getElementById('success-message').textContent = message;
};

const validateEmail = email => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function signIn(e) {
    // Clear previous error messages
    clearLoginErrors();

    let email = document.getElementById('email').value.trim(), pwd = document.getElementById('pwd').value.trim();

    // Validate form fields
    if (!email) {
        showLoginError('email-error', 'Email can\'t be blank');
        e.preventDefault();
        return;
    }

    if (!pwd) {
        showLoginError('pwd-error', 'Password can\'t be blank');
        e.preventDefault();
        return;
    }

    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);

    if(!exist){
        // Display error message for incorrect login credentials
        showLoginError('email-error-message', 'Incorrect login credentials');
        e.preventDefault();
        return;
    }
    else{
        location.href = "/";
    }
    e.preventDefault();
}

// Other functions for error handling
function clearLoginErrors() {
    // Clear error messages
    document.getElementById('email-error').textContent = '';
    document.getElementById('pwd-error').textContent = '';
}

function showLoginError(id, message) {
    // Display error message
    document.getElementById(id).textContent = message;
}

function showLoginSuccess(message) {
    // Display success message
    document.getElementById('success-message').textContent = message;
}

function logout() {
    // Clear user-related data from localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginCheckPerformed');

    // Redirect the user to the login page or any other appropriate action
    window.location.href = 'login.html';
}

// Script for Contact Form

function submitContactForm(event) {
    event.preventDefault();

    // Assuming the form is valid, you can show the success message
    showSuccessMessage('Form submitted successfully! We will get back to you soon.');

    // You may also add logic here to send the form data to a server or perform other actions.
}

function showSuccessMessage(message) {
    // Display success message
    let successMessage = document.getElementById('success-message');
    successMessage.textContent = message;

    // You can customize the appearance or animation of the success message if needed
    successMessage.style.display = 'block';

    // Automatically hide the success message after a certain time (e.g., 5 seconds)
    setTimeout(function () {
        successMessage.style.display = 'none';
    }, 5000);
}

/* Contact Form */

function submitContactForm(event) {
    event.preventDefault();

    clearContactErrors();

    // Validate form fields
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const number = document.getElementById('contact-number').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Validate name
    if (!name) {
        showErrorMessage('Name is required.');
        return;
    }

    // Validate email
    if (!validateContactEmail(email)) {
        showErrorMessage('Invalid email address.');
        return;
    }

    // Validate number
    if (!/^\d+$/.test(number)) {
        showErrorMessage('Invalid number.');
        return;
    }

    // Validate subject
    if (!subject) {
        showErrorMessage('Subject is required.');
        return;
    }

    // Validate message
    if (!message) {
        showErrorMessage('Message is required.');
        return;
    }

    // Assuming the form is valid, you can show the success message
    showSuccessMessage('Form submitted successfully! We will get back to you soon.');

    // You may also add logic here to send the form data to a server or perform other actions.
}

function showErrorMessage(id, message) {
     // Display error message
     const inputElement = document.getElementById(id);
     inputElement.classList.add('error');
     inputElement.nextElementSibling.textContent = message;
}

function clearContactErrors() {
    // Clear all error messages and styles
    let errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => {
        input.classList.remove('error-input');
        let errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

function showSuccessMessage(message) {
    // Display success message
    let successMessage = document.getElementById('success-message');
    successMessage.textContent = message;

    // You can customize the appearance or animation of the success message if needed
    successMessage.style.display = 'block';

    // Automatically hide the success message after a certain time (e.g., 5 seconds)
    setTimeout(function () {
        successMessage.style.display = 'none';
    }, 5000);
}

function validateContactEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}