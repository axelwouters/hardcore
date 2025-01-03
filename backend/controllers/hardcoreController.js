const fs = require("fs")

module.exports = (HardcoreModel) => {
    const saveHardcore = async (req, res) =>{
        try{
            const hardcore = await HardcoreModel.saveOneHardcore(req)
            console.log(hardcore)
            if(hardcore.code){
                res.json({status: 500, msg: "Oups, une erreur est survenue!"})
            } else {
                res.json({status: 200, msg: "Une bombe aréosol enregistrée!"}) 
            }
        } catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    const updateHardcore = async (req, res) =>{
        try{
            const hardcore = await HardcoreModel.updateOneHardcore(req, req.params.id)
            if(hardcore.code){
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
            } else {
                res.json({status: 200, msg: "Une bombe aérosol à été modifié!"})
            }
        } catch(err){
            res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
        }
    }

    const getAllHardcore = async (req, res) => {
        try{ 
            const hardcore = await HardcoreModel.getAllHardcore()
            if(hardcore.code){
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
            } else { 
                res.json({status: 200, result: hardcore})
            }
        } catch(err){
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    const deleteHardcore = async (req, res) => {
        try{
            const hardcore = await HardcoreModel.getOneHardcore(req.params.id) 
            if(hardcore.code){
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
            } else {
               const Hardcoredelete = await HardcoreModel.deleteOneHardcore(req.params.id)
                res.json({msg: "article supprimer"}) 
            }
        } catch(err){ 
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }

    const getOneHardcore = async (req, res) => {
        try{
            const hardcore = await HardcoreModel.getOneHardcore(req.params.id)
            console.log(hardcore)
            if(hardcore.code){
                res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
            } else {
                res.json({status: 200, result: hardcore[0]})
            }
        } catch(err){
            res.json({status: 500, msg: "Oups, Une erreur est survenue!"})
        }
    }

    const path = require('path');

const savePicture = async (req, res) => { 
    console.log("REQ HAHAHA", req.files.images.name);
    try {
        
        if (!req.files || Object.keys(req.files).length === 0) {
            res.json({ status: 400, msg: "La photo n'a pas pu être récupérée!" });
        } else { 
            const uploadPath = path.join(req.files.images.name); 

            req.files.images.mv(uploadPath, (err) => {
                if (err) {
                    res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée!" });
                } else {
                    res.json({ status: 200, msg: "Image enregistrée!", url: uploadPath });
                }
            });
        }
    } catch (err) { 
        console.log(err); 
        res.json({ status: 500, msg: "Oups, une erreur est survenue!" });
    }
}

    return {
        saveHardcore,
        updateHardcore,
        deleteHardcore,
        getAllHardcore,
        getOneHardcore,
        savePicture
    }    

}