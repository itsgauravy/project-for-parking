const express=require('express')
const app=express()
const router=require('./routers/parking')
const mongoose= require('mongoose')
const session=require('express-session')
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://127.0.0.1:27017/project3parking')



app.use(session({
    secret:'GAURAV',
    resave:false,
    saveUninitialized:false,
   // cookie:{maxAge:1000*60*60*24*365}  for session life for years
}))
app.use(router)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000,()=>{console.log('SERVER RUNNING')})