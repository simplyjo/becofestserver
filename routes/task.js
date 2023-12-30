const express = require("express");
const router = express.Router();
const User = require("../models/user");

const cleanBody = require("../middlewares/cleanBody");

router.patch("/follow", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email, twitterName} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.followStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 1000
    user.twitterUsername=twitterName
    user.followStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.patch("/owner", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email,twitterName} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.ownerStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 1500
    user.twitterUsername=twitterName
    user.ownerStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.patch("/like", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email,twitterName} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.likeStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 1500
    user.twitterUsername=twitterName
    user.likeStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.patch("/discord", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email,discordName} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.discordStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 1500
    user.discordUsername=discordName

    user.discordStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.patch("/tg", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email, tgName} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.tgStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 1500
    user.tgUsername=tgName

    user.tgStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.patch("/tweet", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email, twitterName} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.tweetStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 2000
    user.twitterUsername=twitterName
    user.tweetStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.patch("/wallet", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {email, wallet} = req.body;
    const user = await User.findOne({ email });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.walletStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 2000
    user.wallet=wallet
    user.walletStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user:user,
      message: "Reward Success!",
  
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});

module.exports = router;
