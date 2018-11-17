const express = require('express');
const companyController = require('../controllers/companyController')
const app = express();
const { verificarToken } = require('../middlewares/autentication');

app.get('/company/:id', verificarToken, companyController.getCompany);
app.put('/company/:id', verificarToken, companyController.updateCompany);
app.delete('/company/:id', verificarToken, companyController.deleteCompany);

module.exports = app;