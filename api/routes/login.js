const express = require('express');
const app = express();
const loginController = require('../controllers/loginController');

app.post('/login', loginController.login);

module.exports = app;