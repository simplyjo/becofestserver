const express = require("express");
const cleanBody = require("../middlewares/cleanBody");
const router = express.Router();
const User = require("../models/season");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { customAlphabet } = require("nanoid");
const mongoose = require("mongoose");

// Generate Referral Code for new user
const CHARACTER_SET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const REFERRAL_CODE_LENGTH = 8;
// Generate Referral Code for new user

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8);
const code = nanoid()
router.post("/", cleanBody, async (req, res) => {

  try {


    // console.log('code', nanoid(CHARACTER_SET,8))


    console.log("login", "newlogin",)
    const { wallet } = req.body
    const user = await User.findOne({ walletAddress: wallet })

    //  console.log("user",user,)
    if (!user) {

      const newUser = new User({
        walletAddress: wallet,
        email: '',
        userId: "",
        totalPoint: 1,
        quiz: false,
        s1: 1,
        profileImageUrl: "",
        referrals: [],
        referrer: "",
        referralCode: code,
        tweet: false,
        wallet: "",
        walletStatus: false,
        accesstoken: "",
        followStatus: false,
        likeStatus: false,
        tgStatus: false,
        discordStatus: false,
        tweetStatus: false,
        twitterUsername: "",
        discordUsername: "",
        tgUsername: "",
        nft_count: 0,
        nft_s1: false,
        nft_s2: false,
        premintStatus: false

      })

      console.log('code', code)

      await newUser.save()

      return res.status(200).json({
        success: true,
        message: "Login.",
        user: newUser

      });
    }



    return res.status(200).json({
      success: true,
      message: "Login.",
      user: user

    });

  } catch (err) {
    res.status(401).json("Not Authenticated")
  }

});
router.post("/invite", cleanBody, async (req, res) => {

  try {


    console.log("logininvite", "newlogin",)
    const { wallet, invite } = req.body
    console.log("req", wallet, invite)
    const user = await User.findOne({ walletAddress: wallet })
    const refferredUser = await User.findOne({ referralCode: invite })
    console.log("user", user, invite, wallet, refferredUser)
    //  if(refferredUser && invite !== refferredUser.referralCode){
    if (refferredUser) {
      console.log("true")

      if (user) {
        return res.status(200).json({
          success: true,
          message: "Login.",
          user: user
        });
      } else {



        console.log("hehehrhshhhdhhd")
        await User.updateOne(
          { referralCode: invite },
          {

            $push: { referrals: wallet },
            $inc: { s1: 3 },
            $inc: { totalPoint: 3 },
          })

        const newUser = new User({
          walletAddress: wallet,
          email: '',
          userId: "",
          totalPoint: 3,
          s1: 3,
          quiz: false,
          profileImageUrl: "",
          referrals: [],
          referrer: "",
          referralCode: code,
          tweet: false,
          wallet: "",
          walletStatus: false,
          accesstoken: "",
          followStatus: false,
          likeStatus: false,
          tgStatus: false,
          discordStatus: false,
          tweetStatus: false,
          twitterUsername: "",
          discordUsername: "",
          tgUsername: "",
          nft_count: 0,
          nft_s1: false,
          nft_s2: false,
          premintStatus: false


        })


        console.log()

        await newUser.save()

        return res.status(200).json({
          success: true,
          message: "Login.",
          user: newUser
        });

      }
    } else {
      console.log("false")
      if (!user) {

        const newUser = new User({
          walletAddress: wallet,
          email: '',
          userId: "",
          totalPoint: 1,
          s1: 1,
          quiz: false,

          profileImageUrl: "",
          referrals: [],
          referrer: "",
          referralCode: code,
          tweet: false,
          wallet: "",
          walletStatus: false,
          accesstoken: "",
          followStatus: false,
          likeStatus: false,
          tgStatus: false,
          discordStatus: false,
          tweetStatus: false,
          twitterUsername: "",
          discordUsername: "",
          tgUsername: "",
          nft_count: 0,
          nft_s1: false,
          nft_s2: false,
          premintStatus: false

        })


        await newUser.save()

        return res.status(200).json({
          success: true,
          message: "Login.",
          user: newUser

        });
      }

    }
    return




  } catch (err) {
    res.status(401).json("Not Authenticated")
  }

});






module.exports = router;
