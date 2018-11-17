const express = require('express');
const app = express();
const productController = require('../controllers/productController');
const { verificarToken } = require('../middlewares/autentication');

app.post('/product', verificarToken,productController.addProduct);
app.put('/product/:id', verificarToken, productController.updateProduct);
app.delete('/product/:id', verificarToken, productController.deleteProduct);
app.get('/product/:id', verificarToken, productController.getProduct);
app.get('/product', verificarToken, productController.getProducts);

module.exports = app;