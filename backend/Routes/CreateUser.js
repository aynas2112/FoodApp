const express=require('express')
const router=express.Router()
const User=require('../models/User')
const{body,validationResult}=require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="MynameisEndtoEndYoutubeChannel$#"

router.post("/createuser",[
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','incorrect password').isLength({min:5})]
,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)
    try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password','incorrect password').isLength({min:5})],
    (req,res)=>{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
        let email=req.body.email;
        console.log(email)
            User.findOne({email: email}).then((userData)=> {
                console.log(userData);
                if(!userData){
                    console.log("EMAIL FALSE");
                    return res.status(400).json({message:"Try Logging in with correct email"});
                }else if (req.body.password != userData.password){
                    console.log("PASS FALSE");
                    return res.status(400).json({message:"Try Logging in with correct pwd"});
                }else{
                    return res.json({success:true, message:"DONE!"})    
                }
            }).catch((err) => {
                console.log(err);
                res.json({success:false});
        
            });
    })
    
module.exports=router;