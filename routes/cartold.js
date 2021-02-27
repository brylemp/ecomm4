const express = require('express')

const cartModel = require('../models/cart')
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
        const carts = await cartModel.find({})
        res.json({carts})
    }
    catch{
        res.sendStatus(500)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const cart = await cartModel.findOne({_id:req.params.id})
        res.json({cart})
    }
    catch{
        res.sendStatus(500)
    }
})

router.post('/add', isLoggedIn, async (req,res)=>{
    try{
        const cart = await cartModel.create({
            items,
            owner
        } = req.body)
        res.json({cart})
    }
    catch{
        res.sendStatus(500)
    }
})

router.delete('/delete/:id', isLoggedIn, async (req,res)=>{
    try{
        const cart = await cartModel.deleteOne({_id:req.params.id})
        res.json({cart,msg:"Successfully deleted"})
    }catch{
        res.sendStatus(500)
    }
})

router.put('/update/:id', isLoggedIn, async (req,res)=>{
    try{
        const cart = await cartModel.findByIdAndUpdate(req.params.id,{
            items,
            owner
        } = req.body)
        res.json({cart})
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

module.exports = router