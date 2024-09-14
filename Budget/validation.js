const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let errors = [];

    if (firstname_input) {
        errors = getSignupFormErrors(
            firstname_input.value,
            email_input.value,
            password_input.value,
            repeat_password_input.value
        );
    } else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        error_message.innerText = errors.join('. ');
        console.log('Errors:', errors);
        return; 
    }

    const data = {
        email: email_input.value,
        password: password_input.value
    };

    const url = firstname_input ? 'http://localhost:3000/users' : 'http://localhost:3000/users/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                 errors.push('Email or Password is incorrect'); 
            }
            throw new Error('Network response was not ok');
        }

        if (response.status === 201) {
            window.location.replace('login.html'); 
        } else if (response.status === 200) {
            window.location.replace('main.html'); 
        }
        return response.json(); 
    })
    .then(body => {
        console.log('Response body:', body);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        if (error.message.includes('Network response was not ok')) {
            error_message.innerText = 'Email or password is incorrect';
            password_input.parentElement.classList.add('incorrect');
            email_input.parentElement.classList.add('incorrect');
        }
    });
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [];

    if (!firstname) {
        errors.push('First Name is required');
        firstname_input.parentElement.classList.add('incorrect');
    } else {
        firstname_input.parentElement.classList.remove('incorrect');
    }

    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else {
        email_input.parentElement.classList.remove('incorrect');
    }

    if (!password) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
        password_input.parentElement.classList.add('incorrect');
    } else {
        password_input.parentElement.classList.remove('incorrect');
    }

    if (!repeatPassword) {
        errors.push('Repeat Password is required');
        repeat_password_input.parentElement.classList.add('incorrect');
    } else if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        repeat_password_input.parentElement.classList.add('incorrect');
    } else {
        repeat_password_input.parentElement.classList.remove('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else {
        email_input.parentElement.classList.remove('incorrect');
    }

    if (!password) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else {
        password_input.parentElement.classList.remove('incorrect');
    }

    return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
        }
    });
});
