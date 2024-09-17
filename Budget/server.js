const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect("mongodb+srv://vercel-admin-user:mCSmdMKPlGHcsuje@pomme.uycan.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create User model
const User = mongoose.model('User', userSchema);

// Route to create a new user
app.post('/users', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).send('User Created');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server Error');
    }
});

// Route to log in a user
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Cannot find user');
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).send('Success');
        } else {
            res.status(401).send('Not Allowed');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server Error');
    }
});

// Route to serve the contact page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Contact.html'));
});

// Route to send an email
app.post('/sendEmail', async (req, res) => {
    console.log('Sending email...');
    console.log('Request body:', req.body);

    const { name, subject, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        secure: true,
        service: 'gmail',
        auth: {
            user: 'mybudgetapp4@gmail.com', 
            pass: 'ojkqydqxqitrcdqg'  
        }
    });

    const mailOptions = {
        from: 'mybudgetapp4@gmail.com',  
        to: 'mybudgetapp4@gmail.com',
        subject: subject,
        text: `Message from:
    Name: ${name}
    Email: ${email}
    
    Message:
    ${message}`
    };

    const confirmationMailOptions = {
        from: 'mybudgetapp4@gmail.com',
        to: email,
        subject: 'Message Confirmation',
        text: `Dear ${name},
    
    Thank you for contacting us. We have received your message and will get back to you as soon as possible.

    subject: ${subject}
    Your message: ${message}
    
    Best regards,
    The MyBudgetApp Team`
    };
    
    

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email to team sent');
        
        await transporter.sendMail(confirmationMailOptions);
        console.log('Confirmation email sent');
    
        res.status(200).send('Emails sent successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).send('Error sending emails');
    }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
