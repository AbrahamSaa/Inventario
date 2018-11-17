const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const companySchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    dir:{
        type: String,
        required: [true, 'La dirección es necesario'],
    },
    img:{
        type: String,
    },
    cellphone:{
        type: String,
    },
    schedule:{
        type: String,
    },
    id_warehouse:{
        type: String
    },
});



module.exports = mongoose.model('Company', companySchema);