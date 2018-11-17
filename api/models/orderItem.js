const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    OrderId:{
        type: String,
    },
    productId:{
        type: String,
    },
    qty: {
        type: Number,
    },

    company_id:{
        type:String,
    },
});



module.exports = mongoose.model('orderItem', orderSchema);