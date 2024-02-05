const express = require("express");
const cleanBody = require("../middlewares/cleanBody");
const router = express.Router();
const User = require("../models/user");
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


router.get("/login", cleanBody, async (req, res) => {

  try {


    console.log("login","newlogin",  req.body, req.params, req.params.wallet)
    const {wallet} = req.body
   const user =  User.findOne({wallet})

   if(user){
    
   return res.status(200).json({
    success: true,
    message: "Login.",
    user:user

  });
   }

   const newUser = new User({
    wallet
   })

   await newUser.save()

   return res.status(200).json({
    success: true,
    message: "Login.",
    user:newUser

  });
   
  } catch (err) {
    res.status(401).json("Not Authenticated")
  }

});
// router.get("/", cleanBody, async (req, res) => {

//   try {
//     const token = req.cookies[COOKIE_NAME];
//     if (!token) {
//       throw new Error("Not Authenticated");
//     }
//     const payload = await jwt.verify(token, JWT_SECRET);
//     const userFromDb = await User.findUnique({
//       where: { id: payload?.id },
//     });
//     if (!userFromDb) throw new Error("Not Authenticated");
//     if (userFromDb.type === "twitter") {
//       if (!payload.accessToken) {
//         throw new Error("Not Authenticated");
//       }
//       const twUser = await getTwitterUser(payload.accessToken);
//       if (twUser?.id !== userFromDb.id) {
//         throw new Error("Not Authenticated");
//       }
//     }
//     res.json(userFromDb)
//   } catch (err) {
//     res.status(401).json("Not Authenticated")
//   }

// });
router.get("/all", cleanBody, async (req, res) => {

  try {

    //To add new fiel based on other field value
  //  {
  //   $set: {
  //     walletNew: {
  //       $concat: [
  //         { $substr: ['$wallet', 0, 3] },
  //         '...'
  //         { $substr: ['$wallet', { $subtract: [{ $strLenCP: '$wallet' }, 3] }, 3] }
  //       ]
  //     }
  //   }
  // }

console.log("getAllROute", )

  //   const users = await User.aggregate(
  //     [
  //       {
  //         $project:{
  //         walletAddress: {
  //           $concat: [
  //             { $substr: ['$walletAddress', 0, 6] },
  //             '...',
  //             { $substr: ['$walletAddress', { $subtract: [{ $strLenCP: '$walletAddress' }, 4] }, 4] }
  //           ]
  //         },
  //         totalPoint:1
  //        }
  //       }
  //     ]
  //  ).sort({ totalPoint: -1 })
  // await User.updateMany(
  // {},
  //   {
  //     $set: { discord3Status:false,
  //       followPartner3Status:false }
  //   }
  // )
   const users = await User.aggregate(
        [
          {
            $project:{
            walletAddress: 1,
            totalPoint:1
           }
          }
        ]).sort({ totalPoint: -1 }).limit(100)
   console.log("allusers", users)


   return res.status(200).json({
    success: true,
    message: "All users.",
    users: users,
  });

    console.log("users",users)
    
  } catch {

  }

});








module.exports = router;
