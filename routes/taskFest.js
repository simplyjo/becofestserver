const express = require("express");
const router = express.Router();
const Season = require("../models/season");
const Admin = require("../models/admin");

const cleanBody = require("../middlewares/cleanBody");

router.patch("/follow", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet, twitterName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });

    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.followStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 2
    user.totalPoint = user.totalPoint + 2
    user.twitterUsername = twitterName
    user.followStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
    const { wallet, twitterName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.likeStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 3
    user.totalPoint = user.totalPoint + 3

    user.twitterUsername = twitterName
    user.likeStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
    const { wallet, discordName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.discordStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 1
    user.totalPoint = user.totalPoint + 1
    user.discordUsername = discordName

    user.discordStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
    const { wallet, tgName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.tgStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 2
    user.totalPoint = user.totalPoint + 2

    user.tgUsername = tgName

    user.tgStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
    const { wallet, tgName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.tgPartner2Status) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 222
    user.tgUsername = tgName

    user.tgPartner2Status = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
    const { wallet, twitterName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.tweetStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 5
    user.totalPoint = user.totalPoint + 5
    user.twitterUsername = twitterName
    user.tweetStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
router.patch("/quiz", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.quiz) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 5
    user.totalPoint = user.totalPoint + 5
    user.quiz = true

    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
router.patch("/premint", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.premintStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 2
    user.totalPoint = user.totalPoint + 2
    user.premintStatus = true

    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
router.patch("/mint", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });
    const admin = await Admin.findOne({ walletAddress: 'admin' });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.nft_s1) {
      return res.send({
        error: true,
        message: "NFT Already Minted",
      });
    }

    // const total = await Season.aggregate(
    //   [
    //     {
    //       $project: {
    //         nft_s1_total: {

    //           $sum: '$nft_s1'

    //         },

    //       }
    //     }
    //   ]
    // )


    // console.log("nft_total", total)

    if (admin.nft_minted_s1_total >= 10000) {
      return res.send({
        error: true,
        message: "Max Cap Reached",
      });
    }

    user.nft_count = 1
    user.nft_s1 = true
    user.totalPoint = user.totalPoint + 10
    user.s1 = user.s1 + 10
    admin.nft_minted_s1_total =   admin.nft_minted_s1_total + 1

    await user.save()
    await admin.save()
    //Success
    return res.send({
      success: true,
      user: user,
      message: "NFT Mint Success!",

    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});


router.patch("/followBeco", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet, twitterName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.followBecoStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 2
    user.totalPoint = user.totalPoint + 2
    user.twitterUsername = twitterName
    user.followBecoStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
router.patch("/discordBeco", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet, discordName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.discordBecoStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 1
    user.totalPoint = user.totalPoint + 1
    user.discordUsername = discordName

    user.discordBecoStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
router.patch("/tgBeco", cleanBody, async (req, res) => {
  try {
    // const { wallet} = req.body;
    const { wallet, tgName } = req.body;
    const user = await Season.findOne({ walletAddress: wallet });


    console.log("user", user, req.body)

    if (!user) {
      return res.send({
        error: true,
        message: "Server Error",
      });
    }

    if (user.tgBecoStatus) {
      return res.send({
        error: true,
        message: "Reward Already Awarded",
      });
    }

    user.s1 = user.s1 + 2
    user.totalPoint = user.totalPoint + 2

    user.tgUsername = tgName

    user.tgBecoStatus = true


    await user.save()
    //Success
    return res.send({
      success: true,
      user: user,
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
