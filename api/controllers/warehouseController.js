const Warehouse = require('../models/warehouse');

function addWarehouse(req, res) {
    let body = req.body;
    let companyId = req.userData.user.company_id;

    let warehouse = new Warehouse({
        dir: body.dir,
        lon: body.lon,
        lat: body.late,
        company_id : companyId,
    });

    warehouse.save((err, warehouseDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            warehouse:warehouseDB,
            message:"Nuevo almacen creado",
        })
    });
}

function updateWarehouse(req,res){

    let body = req.body;
    let id = req.params.id;

    let warehouseModify = {
        dir: body.dir,
        lon: body.lon,
        lat: body.late,
    };

    Warehouse.findById(id, (err,warehouseDB ) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        if(warehouseDB.company_id === req.userData.user.company_id){
            Warehouse.findByIdAndUpdate(id, warehouseModify,{new:true}, (err,warehouseDBM)=>{

                if(err){
                    return res.status(400).json({
                        ok:false,
                        messagge:"No se pudo modificar",
                    })
                }
                return res.status(200).json({
                    ok:true,
                    messagge:"Modificado",
                    warehouseModify:warehouseDBM,
                })
            });
        }
    });
}

function deleteWarehouse(req,res){
    let id = req.params.id;

    Warehouse.findById(id, (err,warehouseDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Ocurrio un error",
            })
        }

        if (warehouseDb.company_id === req.userData.user.company_id) {

            Warehouse.findByIdAndDelete(id, (err, warehouseDBDelete) => {

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

function getWarehouse(req,res){

    let id = req.params.id;

    Warehouse.findById(id, (err, warehouseDB)=>{
        if(warehouseDB.company_id !== req.userData.user.company_id) {
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
            warehouse:warehouseDB,
        })
    })
}

function getWarehouses(req,res){

    let companyId = req.userData.user.company_id;
    console.log(companyId)
    Warehouse.find({company_id:companyId}, (err, warehouses)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            warehouses:warehouses,
        })
    })
}

module.exports = {
    addWarehouse,
    deleteWarehouse,
    getWarehouse,
    getWarehouses,
    updateWarehouse
};
