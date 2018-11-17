const User = require('../models/user');

function addEmployee(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        last_name: body.last_name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        type: "USER_ROLE",
        company_id: req.userData.user.company_id,
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
            message:"Empleado registrado",
        })
    });
}

function updateEmployee(req,res){

    let body = req.body;
    let id = req.params.id;
    let userModify = {
        name: body.name,
        last_name: body.last_name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    };

    User.findById(id, (err,user) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        if(user.company_id === req.userData.user.company_id){
            User.findByIdAndUpdate(id, userModify,{new:true}, (err,userDB)=>{

                if(err){
                    return res.status(400).json({
                        ok:false,
                        messagge:"No se pudo modificar",
                    })
                }
                return res.status(200).json({
                    ok:true,
                    messagge:"Modificado",
                    userModify:userDB
                })
            });
        }
    });
}

function deleteEmployee(req,res){

    let userModify = {
        account_delete: 1,
    };

    let id = req.params.id;

    User.findById(id, (err,user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Ocurrio un error",
            })
        }
        if (user.company_id === req.userData.user.company_id) {

            User.findByIdAndUpdate(id, userModify, {new: true}, (err, UserDB) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: "Ocurrio un error",
                    })
                }

                return res.status(200).json({
                    ok: true,
                    message: "Se elimino la cuenta",
                })
            })
        }
    });
}

function getEmployee(req,res){

    let id = req.params.id;

    User.findById(id, (err, UserDB)=>{
        if(UserDB.company_id !== req.userData.user.company_id) {
            return res.status(400).json({
                ok: false,
                message: "El id no coincide"
            });
        }
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            user:UserDB,
        })
    })
}

function getEmployees(req,res){

    let companyId = req.userData.user.company_id;

    User.find({company_id:companyId}, (err, users)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            users:users,
        })
    })
}

module.exports = {
    addEmployee,
    deleteEmployee,
    getEmployees,
    getEmployee,
    updateEmployee
};