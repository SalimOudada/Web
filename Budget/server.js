const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

// Configure CORS
app.use(cors());

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = { email: req.body.email, password: hashedPassword };
        users.push(user);
        res.status(201).send('User Created');
    } catch {
        res.status(500).send('Server Error');
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('Success');
        } else {
            res.status(401).send('Not Allowed');
        }
    } catch {
        res.status(500).send('Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
