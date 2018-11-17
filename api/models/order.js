const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const orderSchema = new Schema({
    date: Number,
    employee_id: String,
    date_delivery: Number,
    company_id:String,
    completed:{
    	type:Boolean,
    	default:0,
    }
});

module.exports = mongoose.model('Order', orderSchema)