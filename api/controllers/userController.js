const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Company = require('../models/company');
const app = express();
const { verificarToken } = require('../middlewares/autentication')

function addUser(req, res) {
    let body = req.body;

    let company = new Company({
        name: body.company_name,
        dir : body.company_dir,

    });

    company.save((err, companyDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        let user = new User({
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            type: "ADMIN_ROLE",
            company_id: companyDB._id,
        });

        user.save((err, UserDB)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    message:"Ocurrio un error",
                })
            }

            return res.status(200).json({
                ok:true,
                message:"Registro exitoso",
            })
        })
    });
}

function updateUser(req,res){

    let body = req.body;
    let user = {
        name: body.name,
        last_name: body.last_name,
    };

    User.findByIdAndUpdate(req.userData.user._id, user, {new:true}, (err, UserDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            message:"Cambios realizados",
        })
    })
}

function deleteUser (req,res){

    let user = {
        account_delete: 1,
    };

    User.findByIdAndUpdate(req.userData.user._id, user, {new:true}, (err, UserDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            message:"Se elimino la cuenta",
        })
    })
}

module.exports = {
    addUser,
    updateUser,
    deleteUser
};