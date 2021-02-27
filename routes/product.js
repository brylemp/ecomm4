const express = require('express')

const productModel = require('../models/product')
const router = express.Router()

function isLoggedIn(req,res,next){
    if(typeof(req.session.user) === 'undefined'){
        res.sendStatus(403)
    }
    else{
        next()
    }
}

router.get('/all', async(req,res)=>{
    try{
        const products = await productModel.find({})
        res.json({products})
    }
    catch{
        res.sendStatus(500)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const product = await productModel.findOne({_id:req.params.id})
        res.json({product})
    }
    catch{
        res.sendStatus(500)
    }
})

router.post('/add', isLoggedIn, async (req,res)=>{
    try{
        const product = await productModel.create({
            title,
            desc,
            details,
            img,
            price,
        } = req.body)
        res.json({product})
    }
    catch{
        res.sendStatus(500)
    }
})

router.delete('/delete/:id', isLoggedIn, async (req,res)=>{
    try{
        const product = await productModel.deleteOne({_id:req.params.id})
        res.json({product,msg:"Successfully deleted"})
    }catch{
        res.sendStatus(500)
    }
})

router.put('/update/:id', isLoggedIn, async (req,res)=>{
    try{
        const product = await productModel.findByIdAndUpdate(req.params.id,{
            title,
            desc,
            details,
            img,
            price,
        } = req.body)
        res.json({product})
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

module.exports = router