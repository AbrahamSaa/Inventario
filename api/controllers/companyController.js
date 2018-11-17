const Company = require('../models/company');


// READ by ID
function getCompany(req,res) {
    const{id} = req.params;

    Company.findById(id).exec()
    .then(company =>{
        return res.send(company);
    })
    .catch(err =>{
        return res.status(404).send(err)
    })
}


function updateCompany(req,res){
    const{id} = req.params;

    let body = req.body;

    let company = {
        name: body.name,
        dir : body.dir,
        img : body.img,
        cellphone: body.cellphone,
        schedule : body.schedule,
    }

    Company.findByIdAndUpdate(id, company, (err, companyUpdate)=>{
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
    });
}

function  deleteCompany(req,res) {
    const{id} = req.params

    Company.findByIdAndRemove(id).exec()
    .then(company =>{
        res.status(200).send(company)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
}

module.exports = {
    updateCompany,
    deleteCompany,
    getCompany
};