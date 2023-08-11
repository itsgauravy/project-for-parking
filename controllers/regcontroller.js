const Reg=require('../models/reg')
const bycrypt=require('bcrypt')



exports.loginpage=(req,res)=>{
    res.render('login.ejs',{massage:''})
}

exports.resisterpage=(req,res)=>{
    res.render('reg.ejs',{massage:''})
}

exports.resister=async(req,res)=>{
   // console.log(req.body)

   const{username,pass}=req.body
   const usercheck=await Reg.findOne({username:username})
    const newpass= await bycrypt.hash(pass,10)
    if(usercheck==null){
   const record=new Reg({username:username,password:newpass})
   record.save()
  // console.log(record)
  res.render('reg.ejs',{massage:`${username}  Successfully resister`})
    }else{
        res.render('reg.ejs',{massage:`${username} username already  resistered`})
    }
}

exports.logincheck=async(req,res)=>{
    //console.log(req.body)
    const{username,pass}=req.body
    const record=await Reg.findOne({username:username})
    //console.log(record)
    if(record!==null){
         const passwordcompare= await bycrypt.compare(pass,record.password)
         //console.log(passwordcompare)
         if(passwordcompare){
            req.session.isAuth=true
            req.session.loginname=username
        res.redirect('/parking')
        }else{res.render('login.ejs',{massage:'wrong input'})}
    }else{
       res.render('login.ejs',{massage:'wrong input'})
    }

}



exports.logout=(req,res)=>{
    req.session.destroy
    res.redirect('/')
}