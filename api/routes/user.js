const express = require('express');
const app = express();
const userController = require('../controllers/userController')
const { verificarToken } = require('../middlewares/autentication')

app.post('/user', userController.addUser);
app.put('/user', verificarToken,userController.updateUser);
app.delete('/user', verificarToken,userController.deleteUser);

module.exports = app;
