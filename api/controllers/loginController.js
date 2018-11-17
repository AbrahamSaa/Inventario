const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function login(req, res){
    let body = req.body;

    User.findOne({email: body.email},(err,usuarioDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if ( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                message:"Usuario o contraseña incorrectos",
                err
            });
        }

        if( !bcrypt.compareSync(body.password, usuarioDB.password) ){
            return res.status(400).json({
                ok:false,
                message:"Usuario o contraseña incorrectos",
                err
            });
        }

        let token = jwt.sign({
            user:usuarioDB

        }, process.env.SEED,
            {expiresIn: "31d" }
        );

        return res.status(200).json({
            ok:true,
            user:usuarioDB,
            token:token
        });
    });
}

module.exports = {
    login,
};