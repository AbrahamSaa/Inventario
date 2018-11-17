const express = require('express');
const app = express();
const orderController = require('../controllers/orderController');
const { verificarToken } = require('../middlewares/autentication');

app.post('/order', verificarToken,orderController.addOrder);
app.put('/order/:id', verificarToken, orderController.updateOrder);
app.delete('/order/:id', verificarToken, orderController.deleteOrder);
app.get('/order/:id', verificarToken, orderController.getOrder);
app.get('/order', verificarToken, orderController.getOrders);

module.exports = app;