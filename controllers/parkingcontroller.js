const Parking=require('../models/parking')




exports.parkingpage=async(req,res)=>{
    // console.log( req.session.loginname)
     const loginname=req.session.loginname
     const record=await Parking.find()
     res.render('parking.ejs',{loginname,record})
 }

 exports.parkingform=(req,res)=>{
    const loginname=req.session.loginname
    res.render('parkingform.ejs',{loginname})
 }

 exports.parkingadd=(req,res)=>{
    //console.log(req.body)
    const{vno,vtype}=req.body

    const vintime=new Date()
    const record= new Parking({vno:vno,vtype:vtype,vin:vintime})
    record.save()
   // console.log(record)
   res.redirect('/parking')
 }

 exports.parkingupdate=async(req,res)=>{
       // console.log(req.params.id)
       const id=req.params.id
       let outTime=new Date()
       const record= await Parking.findById(id)
      // console.log(record)
      let consumedTime=(outTime-record.vin)/(1000*60*60)
      //console.log(consumedTime) 
      let amount=null
    if(record.vtype=='2'){
        amount=consumedTime*30
    }else if(record.vtype=='3'){
        amount=consumedTime*50
    }else if(record.vtype=='4'){
        amount=consumedTime*80
    }else if(record.vtype=='hv'){
        amount=consumedTime*120
    }else if(record.vtype=='lv'){
        amount=consumedTime*100
    }else{
        amount=consumedTime*60
    }

    await Parking.findByIdAndUpdate(id,{vout:outTime,amount:Math.round(amount),status:'OUT'})
    res.redirect('/parking')
     
 }

 exports.parkingprint=async(req,res)=>{
    const id=req.params.id
    const record=await Parking.findById(id)
    res.render('printpage.ejs',{record})
 }