const express = require('express');
const app = express();
const orderItemController = require('../controllers/orderItemController');
const { verificarToken } = require('../middlewares/autentication');

app.post('/orderItem/:id', verificarToken,orderItemController.addOrderItem);
app.put('/orderItem/:id', verificarToken, orderItemController.updateOrderItem);
app.delete('/orderItem/:id', verificarToken, orderItemController.deleteOrderItem);
app.get('/orderItem/:id', verificarToken, orderItemController.getOrderItem);

module.exports = app;