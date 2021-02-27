const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);
const cors = require('cors')
require('dotenv').config()

const productRouter = require('./routes/product') 
const featuredProductRouter = require('./routes/featuredProduct') 
const cartRouter = require('./routes/cart') 

mongoose.connect(process.env.mongoDBURI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }, ()=> console.log('Connected to mongoDB'))

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret: 'adfihjasdfl;1223',
    store: new MongoStore({ mongooseConnection: mongoose.connection, dbName: 'sessions' }),
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 10*60*1000 //10 mins
    }
}))
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('./client/build'))
app.use('/api/product',productRouter)
app.use('/api/fproduct',featuredProductRouter)
app.use('/api/cart',cartRouter)

app.listen(process.env.PORT || 3001)

