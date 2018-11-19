const express = require('express');
const app = express();
const loginController = require('../controllers/loginController');

app.post('/login', loginController.login);
app.get('/auth', loginController.auth);

module.exports = app;