const mongoose=require('mongoose')



const parkingSchema=mongoose.Schema({
    username:String,
    password:String
})




module.exports=mongoose.model('reg',parkingSchema)