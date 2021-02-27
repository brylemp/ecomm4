const express = require('express')

const productModel = require('../models/product')
const featuredProductModel = require('../models/featuredProduct')
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
        const products = await featuredProductModel.find({})
        res.json({products})
    }
    catch{
        res.sendStatus(500)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const product = await featuredProductModel.findOne({_id:req.params.id})
        res.json({product})
    }
    catch{
        res.sendStatus(500)
    }
})

router.post('/add', async (req,res)=>{
    try{
        const product = await featuredProductModel.create({
            productId,
            bannerImg,
        } = req.body)
        res.json({product})
    }
    catch{
        res.sendStatus(500)
    }
})

router.delete('/delete/:id', isLoggedIn, async (req,res)=>{
    try{
        const product = await featuredProductModel.deleteOne({_id:req.params.id})
        res.json({product,msg:"Successfully deleted"})
    }catch{
        res.sendStatus(500)
    }
})

router.put('/update/:id', isLoggedIn, async (req,res)=>{
    try{
        const product = await featuredProductModel.findByIdAndUpdate(req.params.id,{
            productId,
            bannerImg,
        } = req.body)
        res.json({product})
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

module.exports = router