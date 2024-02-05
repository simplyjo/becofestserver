const express = require("express");
const router = express.Router();
const User = require("../models/user");

const cleanBody = require("../middlewares/cleanBody");

router.patch("/follow", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {wallet, twitterName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });

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

    user.totalPoint = user.totalPoint + 222
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
router.patch("/partner", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {wallet,twitterName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.followPartnerStatus){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 222
    user.twitterUsername=twitterName
    user.followPartnerStatus = true


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
router.patch("/partner2", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {wallet,twitterName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.followPartner2Status){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 222
    user.twitterUsername=twitterName
    user.followPartner2Status = true


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
router.patch("/partner3", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {wallet,twitterName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.followPartner3Status){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 222
    user.twitterUsername=twitterName
    user.followPartner3Status = true


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
    const  {wallet,twitterName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


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

    user.totalPoint = user.totalPoint + 333
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
    const  {wallet,discordName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


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

    user.totalPoint = user.totalPoint + 125
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
router.patch("/discord3", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {wallet,discordName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.discord3Status){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 125
    user.discordUsername=discordName

    user.discord3Status = true


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
    const  {wallet, tgName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


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

    user.totalPoint = user.totalPoint + 222
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
router.patch("/tgpartner", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const  {wallet, tgName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if(user.tgPartner2Status){
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.totalPoint = user.totalPoint + 222
    user.tgUsername=tgName

    user.tgPartner2Status = true


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
    const  {wallet, twitterName} = req.body;
    const user = await User.findOne({ walletAddress:wallet });


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

    user.totalPoint = user.totalPoint + 555
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


module.exports = router;
