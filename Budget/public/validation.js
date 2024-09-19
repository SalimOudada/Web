const form = document.getElementById('form');
const firstnameInput = document.getElementById('firstname-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();

    const errors = firstnameInput
        ? validateSignupForm()
        : validateLoginForm();

    if (errors.length > 0) {
        displayErrors(errors);
        return;
    }

    submitForm();
}

function validateSignupForm() {
    const errors = [];

    if (!firstnameInput.value) {
        errors.push('First Name is required');
        setInvalid(firstnameInput);
    } else {
        setValid(firstnameInput);
    }

    if (!emailInput.value) {
        errors.push('Email is required');
        setInvalid(emailInput);
    } else {
        setValid(emailInput);
    }

    if (!passwordInput.value) {
        errors.push('Password is required');
        setInvalid(passwordInput);
    } else if (passwordInput.value.length < 8) {  // Correction : vérifier que le mot de passe a au moins 8 caractères
        errors.push('Password must be at least 8 characters long');
        setInvalid(passwordInput);
    } else {
        setValid(passwordInput);
    }

    if (!repeatPasswordInput.value) {
        errors.push('Repeat Password is required');
        setInvalid(repeatPasswordInput);
    } else if (passwordInput.value !== repeatPasswordInput.value) {
        errors.push('Passwords do not match');
        setInvalid(repeatPasswordInput);
    } else {
        setValid(repeatPasswordInput);
    }

    return errors;
}

function validateLoginForm() {
    const errors = [];

    if (!emailInput.value) {
        errors.push('Email is required');
        setInvalid(emailInput);
    } else {
        setValid(emailInput);
    }

    if (!passwordInput.value) {
        errors.push('Password is required');
        setInvalid(passwordInput);
    } else {
        setValid(passwordInput);
    }

    return errors;
}

function displayErrors(errors) {
    errorMessage.innerText = errors.join('. ');
}

function setInvalid(input) {
    input.parentElement.classList.add('incorrect');
}

function setValid(input) {
    input.parentElement.classList.remove('incorrect');
}

function submitForm() {
    const url = firstnameInput ? 'http://localhost:3000/users' : 'http://localhost:3000/users/login';
    const data = {
        email: emailInput.value,
        password: passwordInput.value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            if (firstnameInput && response.status === 400) {
                setInvalid(emailInput);
                throw new Error('Email already in use');
            } else {
                setInvalid(emailInput);
                setInvalid(passwordInput);
                throw new Error('Email or Password is incorrect');
            }
        }

        if (response.status === 201) {
            window.location.replace('login.html');
        } else if (response.status === 200) {
            window.location.replace('main.html');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        errorMessage.innerText = error.message;
    });
}

// Event listener for input fields to reset validation on user input
const allInputs = [firstnameInput, emailInput, passwordInput, repeatPasswordInput].filter(Boolean);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            setValid(input);
        }
    });
});
