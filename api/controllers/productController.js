const Product = require('../models/Product');

function addProduct(req, res) {
    let body = req.body;
    let companyId = req.userData.user.company_id;

    let product = new Product({
        name: body.name,
        qty: body.qty,
        qr: body.qr,
        meta_info : body.meta_info,
        desc: body.desc,
        img: body.img,
        price: body.price,
        warehouse_id:body.warehouse_id,
        company_id:companyId,
    });

    product.save((err, productDb)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            product:productDb,
            message:"Nuevo almacen creado",
        })
    });
}

function updateProduct(req,res){

    let body = req.body;
    let id = req.params.id;

    let productModify = {
        name: body.name,
        qty: body.qty,
        qr: body.qr,
        meta_info : body.meta_info,
        desc: body.desc,
        img: body.img,
        price: body.price,
    };

    Product.findById(id, (err,productDB ) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        if(productDB.company_id === req.userData.user.company_id){
            Product.findByIdAndUpdate(id, warehouseModify,{new:true}, (err,productDBM)=>{

                if(err){
                    return res.status(400).json({
                        ok:false,
                        messagge:"No se pudo modificar",
                    })
                }
                return res.status(200).json({
                    ok:true,
                    messagge:"Modificado",
                    product:productDBM,
                })
            });
        }
    });
}

function deleteProduct(req,res){
    let id = req.params.id;

    Product.findById(id, (err,productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Ocurrio un error",
            })
        }

        if (productDB.company_id === req.userData.user.company_id) {

            Product.findByIdAndDelete(id, (err, ProductDelete) => {

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

function getProduct(req,res){

    let id = req.params.id;

    Product.findById(id, (err, productDB)=>{
        if(productDB.company_id !== req.userData.user.company_id) {
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
            warehouse:productDB,
        })
    })
}

function getProducts(req,res){

    let companyId = req.userData.user.company_id;
    
    Product.find({company_id:companyId}, (err, products)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            products,
        })
    })
}

module.exports = {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
    getProduct
};
