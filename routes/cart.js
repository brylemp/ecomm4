const express = require('express')

const cartModel = require('../models/cart')
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

router.get('/', (req,res)=>{
    console.log(req.session)
    if(!req.session.cart){
        req.session.cart = {
            items: [],
        }
    }
    console.log(req.sessionID,req.session.cart)
    try{
        const cart =  req.session.cart
        res.json({cart,session:req.sessionID})
    }
    catch{
        res.sendStatus(500)
    }
})

// 60213a035988253250862c08 asus 
// 600873ea8c6f2b0274eb64fb rakk
router.post('/addItem/:id', async (req,res)=>{
    const product = await productModel.findById(req.params.id)
    const quantity = parseInt(req.body.quantity)

    if(!req.session.cart){
        req.session.cart = {
            items: [],
        }
    }

    const cart = req.session.cart
    try{
        const items = cart.items
        const itemExists = items.find(item => {
            if(item.productId === req.params.id) return item
        })

        if(product.stock < quantity){
            return res.status(500).send({msg:"Buying more than available stocks"})
        }

        if(itemExists){
            itemExists.quantity += quantity
        }
        else{
            items.push({
                productId: product._id,
                img: product.img,
                title: product.title,
                price: product.price,
                quantity
            })
        }
        res.json({cart,session:req.sessionID})
    }
    catch{
        res.sendStatus(500)
    }
})

router.delete('/delete/:id', async (req,res)=>{
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