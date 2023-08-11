const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const parkingc=require('../controllers/parkingcontroller')

function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/')
    }
}

router.get('/',regc.loginpage)
router.get('/reg',regc.resisterpage)
router.post('/reg',regc.resister)
router.post('/',regc.logincheck)
router.get('/parking',handlelogin,parkingc.parkingpage)
router.get('/logout',regc.logout)
router.get('/recordadd',handlelogin,parkingc.parkingform)
router.post('/recordadd',handlelogin,parkingc.parkingadd)
router.get('/parkingupdate/:id',handlelogin,parkingc.parkingupdate)
router.get('/parkingprint/:id',handlelogin,parkingc.parkingprint)






module.exports=router