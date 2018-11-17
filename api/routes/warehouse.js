const express = require('express');
const app = express();
const warehouseController = require('../controllers/warehouseController');
const { verificarToken } = require('../middlewares/autentication');

app.post('/warehouse', verificarToken,warehouseController.addWarehouse);
app.put('/warehouse/:id', verificarToken, warehouseController.updateWarehouse);
app.delete('/warehouse/:id', verificarToken, warehouseController.deleteWarehouse);
app.get('/warehouse/:id', verificarToken, warehouseController.getWarehouse);
app.get('/warehouse', verificarToken, warehouseController.getWarehouses);

module.exports = app;