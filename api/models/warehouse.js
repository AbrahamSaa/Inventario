const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const warehouseSchema = new Schema({
    dir:{
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    lat:{
        type: String
    },
    lon: {
        type: String
    },

    company_id:{
        type:String,
    }

});

module.exports = mongoose.model('Warehouse', warehouseSchema)