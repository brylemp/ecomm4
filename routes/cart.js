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
    console.log(req.sessionID,req.session.cart)
    if(!req.session.cart){
        req.session.cart = {
            items: [],
        }
    }
    try{
        const cart =  req.session.cart
        res.json({cart,session:req.sessionID})
    }
    catch{
        res.sendStatus(500)
    }
})

router.post('/addItem/:id', async (req,res)=>{
    const product = await productModel.findById(req.params.id)
    const quantity = parseInt(req.body.quantity)

    console.log(req.sessionID)

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

router.delete('/delete/:id', (req,res)=>{
    console.log(req.sessionID)
    const { id } = req.params
    const cart = req.session.cart

    try{
        const newItems = cart.items.filter(item => item.productId !== id)
        req.session.cart.items = newItems
        res.json(newItems)
    }
    catch(e){
        res.status(500).send({error:e})
    }
    
})

router.put('/update/:id', (req,res)=>{
    const { id } = req.params
    const cart = req.session.cart
    console.log(req.sessionID)

    try{
        const newItems = cart.items.map(item => {
            if(item.productId === id){
                item.quantity = req.body.quantity
            }
            return item
        })
        req.session.cart.items = newItems
        res.json(newItems)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

module.exports = router