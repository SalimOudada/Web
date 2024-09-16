const emailForm = document.getElementById('email-form');
const email = document.getElementById('email');
const username = document.getElementById('name');
const subject = document.getElementById('subject');
const message = document.getElementById('message');


emailForm.addEventListener('submit', sendEmail);

async function sendEmail(event) {
    event.preventDefault();

    console.log('sendEmail function called'); 

    const formData = new FormData(emailForm);

    try {
        const response = await fetch('http://localhost:3000/sendEmail', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response);
        if (response.ok) {
            console.log('Email sent successfully');
            window.location.href = 'http://localhost:3000/main.html';
            // You might want to show a success message to the user here
        } else {
            console.error('Failed to send email');
            // You might want to show an error message to the user here
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

