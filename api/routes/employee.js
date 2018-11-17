const express = require('express');
const app = express();
const employeeController = require('../controllers/employeeController');
const { verificarToken } = require('../middlewares/autentication');

app.post('/employee', verificarToken,employeeController.addEmployee);
app.put('/employee/:id', verificarToken, employeeController.updateEmployee);
app.delete('/employee/:id', verificarToken, employeeController.deleteEmployee);
app.get('/employee/:id', verificarToken, employeeController.getEmployee);
app.get('/employee', verificarToken, employeeController.getEmployees);

module.exports = app;