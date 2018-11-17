const OrderItem = require('../models/orderItem');
const moment = require('moment');

function addOrderItem(req, res) {
    let idOrder = req.params.id;
    let body = req.body;
    let companyId = req.userData.user.company_id;

    let order = new Order({
        OrderId: idOrder,
        product_id: body.idproduct,
        qty: body.qty,
        company_id : companyId,
    });

    OrderItem.save((err, orderItemDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            message:"Nuevo item registrado",
        })
    });
}

function updateOrderItem(req,res){

    let body = req.body;
    let id = req.params.id;

    let orderItemModify = {
        product_id: body.idproduct,
        qty: body.qty,
    };

    OrderItem.findById(id, (err,orderitemDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        if(orderitemDB.company_id === req.userData.user.company_id){
            OrderItem.findByIdAndUpdate(id, orderItemModify,{new:true}, (err,orderItem)=>{

                if(err){
                    return res.status(400).json({
                        ok:false,
                        messagge:"No se pudo modificar",
                    })
                }
                return res.status(200).json({
                    ok:true,
                    messagge:"Modificado",
                    orderItemModify:orderItem
                })
            });
        }
    });
}

function deleteOrderItem(req,res){
    let id = req.params.id;

    OrderItem.findById(id, (err,orderItem) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Ocurrio un error",
            })
        }

        if (orderItem.company_id === req.userData.user.company_id) {

            OrderItem.findByIdAndDelete(id, (err, orderDBDelete) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: "Ocurrio un error",
                    })
                }

                return res.status(200).json({
                    ok: true,
                    message: "Se elimino el item de la orden",
                })
            });
        }
    });
}

function getOrderItem(req,res){

    let id = req.params.id;

    OrderItem.find({OrderId:id}, (err, OrderItemDB)=>{
        if(OrderItemDB.company_id !== req.userData.user.company_id) {
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
            user:OrderItemDB,
        })
    })
}


module.exports = {
    addOrderItem,
    deleteOrderItem,
    getOrderItem,
    updateOrderItem  
};
