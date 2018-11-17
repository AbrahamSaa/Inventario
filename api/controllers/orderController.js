const Order = require('../models/order');
const moment = require('moment');

function addOrder(req, res) {
    let body = req.body;
    let companyId = req.userData.user.company_id;

    let order = new Order({
        date: moment().valueOf(),
        date_delivery: moment(body.date).valueOf(),
        company_id : companyId,
    });

    order.save((err, orderDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            message:"Nueva orden registrada",
        })
    });
}

function updateOrder(req,res){

    let body = req.body;
    let id = req.params.id;

    let orderModify = {
        date_delivery: moment(body.date).valueOf(),
        employee_id : body.employee_id,
        completed: body.completed,
    };

    Order.findById(id, (err,orderDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        if(orderDB.company_id === req.userData.user.company_id){
            Order.findByIdAndUpdate(id, orderModify,{new:true}, (err,orderDBM)=>{

                if(err){
                    return res.status(400).json({
                        ok:false,
                        messagge:"No se pudo modificar",
                    })
                }
                return res.status(200).json({
                    ok:true,
                    messagge:"Modificado",
                    orderModify:orderDBM
                })
            });
        }
    });
}

function deleteOrder(req,res){
    let id = req.params.id;

    Order.findById(id, (err,orderDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Ocurrio un error",
            })
        }

        if (orderDB.company_id === req.userData.user.company_id) {

            Order.findByIdAndDelete(id, (err, orderDBDelete) => {

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
            });
        }
    });
}

function getOrder(req,res){

    let id = req.params.id;

    Order.findById(id, (err, OrderDB)=>{
        if(OrderDB.company_id !== req.userData.user.company_id) {
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
            user:OrderDB,
        })
    })
}

function getOrders(req,res){

    let companyId = req.userData.user.company_id;

    Order.find({company_id:companyId}, (err, orders)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            orders:orders,
        })
    })
}

module.exports = {
    addOrder,
    deleteOrder,
    getOrders,
    getOrder,
    updateOrder
};
