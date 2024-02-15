const express = require("express");
const cleanBody = require("../middlewares/cleanBody");
const router = express.Router();
const User = require("../models/season");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { customAlphabet: generate } = require("nanoid");
const mongoose = require("mongoose");

// Generate Referral Code for new user
const CHARACTER_SET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const REFERRAL_CODE_LENGTH = 5;
// Generate Referral Code for new user
const referralCode = generate(CHARACTER_SET, REFERRAL_CODE_LENGTH);


router.post("/", cleanBody, async (req, res) => {

  try {


    console.log("login","newlogin",)
    const {wallet} = req.body
   const user = await User.findOne({walletAddress:wallet})
  //  console.log("user",user,)
   if(!user){
    
    const newUser = new User({
      walletAddress:wallet,
      email:'',
      userId:"",
      totalPoint:0,
quiz:false,
      s1:100,
      profileImageUrl: "",
      referrals:[],
      referrer:"",
      referralCode:wallet,
      tweet:false,
      wallet:"",
      walletStatus:false,
      accesstoken:"",
      followStatus:false,
      likeStatus:false,
      tgStatus:false,
      discordStatus:false,
      tweetStatus:false,
      twitterUsername:"",
      discordUsername:"",
      tgUsername:"",
     

     })
  
     await newUser.save()

     return res.status(200).json({
      success: true,
      message: "Login.",
      user:newUser
  
    });
   }

 

   return res.status(200).json({
    success: true,
    message: "Login.",
    user:user

  });
   
  } catch (err) {
    res.status(401).json("Not Authenticated")
  }

});
router.post("/invite", cleanBody, async (req, res) => {

  try {


    console.log("logininvite","newlogin",)
    const {wallet, invite} = req.body
   const user = await User.findOne({walletAddress:wallet})
   const refferredUser = await User.findOne({walletAddress:invite})
   console.log("user",user,invite,wallet,refferredUser)
   if(refferredUser && invite !== wallet){
      console.log("true")
      if(!user){

        await User.update(
          { referralCode: invite },
          {
    
            $push: { referrals: wallet },
            $inc: { s1: 250 }
      })
    
      const newUser = new User({
        walletAddress:wallet,
        email:'',
        userId:"",
        totalPoint:0,
        s1:100,
quiz:false,
        profileImageUrl: "",
        referrals:[],
        referrer:"",
        referralCode:wallet,
        tweet:false,
        wallet:"",
        walletStatus:false,
        accesstoken:"",
        followStatus:false,
        likeStatus:false,
        tgStatus:false,
        discordStatus:false,
        tweetStatus:false,
        twitterUsername:"",
        discordUsername:"",
        tgUsername:"",
       
  
       })
    
      
         await newUser.save()
    
         return res.status(200).json({
          success: true,
          message: "Login.",
          user:newUser
      
        });
       }
    
   } else {
    console.log("false")
    if(!user){
    
      const newUser = new User({
        walletAddress:wallet,
        email:'',
        userId:"",
        totalPoint:0,
        s1:100,
quiz:false,

        profileImageUrl: "",
        referrals:[],
        referrer:"",
        referralCode:wallet,
        tweet:false,
        wallet:"",
        walletStatus:false,
        accesstoken:"",
        followStatus:false,
        likeStatus:false,
        tgStatus:false,
        discordStatus:false,
        tweetStatus:false,
        twitterUsername:"",
        discordUsername:"",
        tgUsername:"",
       
  
       })
    
    
       await newUser.save()
  
       return res.status(200).json({
        success: true,
        message: "Login.",
        user:newUser
    
      });
     }
  
   }
   return

 

   
  } catch (err) {
    res.status(401).json("Not Authenticated")
  }

});






module.exports = router;
