const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido',
};

let usuarioSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    last_name:{
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Es necesario un correo"]
    },
    password:{
        type:String,
        required: true
    },
    type:{
        type:String,
        default:"USER_ROLE",
        enum:rolesValidos
    },
    company_id:{
        type: String,
    },
    account_delete:{
        type:Boolean,
        default: 0,
    }
});

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};



module.exports = mongoose.model('User', usuarioSchema);