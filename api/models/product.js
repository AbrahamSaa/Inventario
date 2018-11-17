const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productoSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Se necesita saber el nombre del producto']
    },
    qty:{
        type: Number,
        required: [true, 'Es necesario saber las existencias del producto']
    },
    QR:{
        type: String,
        required: [true, 'Se necesita un qr']
    },
    meta_info:{
        type: String,
        required: [true, 'Se necesita ubicación del almacen']
    },
    desc: String,
    img: String,
    price: Number,
    warehouse_id:{
        type:String,
    },
    company_id:{
        type:String,
    }
});

module.exports = mongoose.model('Producto', productoSchema);