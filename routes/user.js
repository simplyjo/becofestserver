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





router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user email exist

    console.log("login", email, password)

    const user = await User.findOne({ email });

    console.log("dbUser", user)

    if (!user) {
      return res.status(201).json({
        message: "This Email does not exist",
        error: true,
      });
    }

    //3. Verify the password is valid
    const isValid = await User.comparePasswords(password, user.password);

    if (!isValid) {
      return res.status(201).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    user.accessToken = token;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: user,
      token,
    });
  } catch (error) {
    //   console.error("user-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});
router.post("/signup", cleanBody, async (req, res) => {
  try {

    const { ref } = req.body
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      referrer: req.body.ref,
      followStatus:false,
      ownerStatus:false,
      likeStatus:false,
      tgStatus:false,
      discordStatus:false,
      tweetStatus:false,
    });

    console.log("user", "test user", user.email, ref)


    // Check if user email exist

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return res.status(201).json({
        message: "This Email is registered",
        error: true,
      });
    }

    // check if password is entered correctly
    const check = user.password === req.body.confirmpassword;

    if (!check) {
      return res.status(201).json({
        message: "Password does not match",
        error: true,
      });
    }

    const hash = await User.hashPassword(user.password);

    const id = uuid(); //Generate unique id for the user.

    user.userId = id;
    delete user.confirmPassword;
    user.password = hash;
    user.totalPoint = 1000

    if (user.referrer === null || user.referrer === "") {
      user.referralCode = referralCode();
      const newUser = new User(user);
      await newUser.save();

      return res.status(200).json({
        success: true,
        message: "Login Success",
        user: user
      });
    }
    let referral = await User.findOne({
      referralCode: user.referrer,
    });

    if (!referral) {
      return res.status(201).json({
        error: true,
        message: "Invalid referral code.",
      });
    }

    await User.update(
      { referralCode: user.referrer },
      {

        $push: { referrals: user.email },
        $inc: { totalPoint: 1500 }
  }


    )
    console.log("referrrrrrrrrrrrrr", referral)

    user.referralCode = referralCode();

    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Registration Succes",
      referralCode: user.referralCode,
      email: user.email,
      user: user
    });
  } catch (error) {
    //   console.error("user-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.get("/all", cleanBody, async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, totalPoint: 1, twitterUsername: 1, wallet:1 }).sort({ totalPoint: -1 });

    console.log("allusers", users)

    if (!users) {
      return res.status(400).json({
        error: true,
        message: "No user Found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "All users.",
        users: users,
      });
    }
  } catch (error) {
    //   console.error("user-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});




router.patch("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { phone, email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("No User with that Id");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { phone: phone },
    {
      new: true,
    }
  );
  const user = await User.findById(_id);

  return res.status(200).json({
    success: true,
    message: "profile updated Successful",
    user: updatedUser,
    token: user.accessToken,
  });
});
router.patch("/card/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { discountCardNo, pay_stack_ref, amount_paid, email } = req.body;
  // await User.updateMany({}, [{ $set: { pay_stack_ref:''} }]);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("No User with that Id");


  const check = cardData.find(el => el === discountCardNo.toString())

  if (check) {
    console.log('found')
    const userCheck = await User.find({ discountCardNo: discountCardNo })
    if (userCheck.length > 0) {
      return res.status(201).json({
        success: true,
        message: "Card has Already being Activated for this account",
        user: userCheck[0],

      });

    } else {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { discountCardNo: discountCardNo, paid: true },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        message: "New Card Activated Successfully",
        user: updatedUser,

      });

    }

  } else {

    return res.status(201).json({
      error: true,
      message: "Card Number Invalid",
    });

  }


});




router.get("/:id", cleanBody, async (req, res) => {
  try {

    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json("No User with that Id");

    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "No user Found",
      });
    } else {
      return res.status(200).json({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    //   console.error("user-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});
router.get("/rewards/:cardNo", cleanBody, async (req, res) => {
  try {
    // await Reward.updateMany({}, [{ $set: { merchantName: 'Test Merchant' } }]);
    const { cardNo } = req.params;



    const rewards = await Reward.find({ cardNo: cardNo }).sort({ _id: -1 })

      ;

    return res.status(200).json({
      success: true,
      rewards: rewards,
    });

  } catch (error) {
    //   console.error("user-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});


router.patch("/virtual/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { email } = req.body;
  // await User.updateMany({}, [{ $set: { discountCardNo:discountCode()} }]);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("No User with that Id");

  const code = virtualCode();



  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { virtualCardNo: code },
    {
      new: true,
    }
  );


  return res.status(200).json({
    success: true,
    message: "Your virtual card is Activated",
    user: updatedUser,
  });
});

router.patch("/point/:id", async (req, res) => {
  const { id: _id } = req.params;

  const { totalPoint } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("No User with that Id");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { totalPoint: totalPoint },
    {
      new: true,
    }
  );


  return res.status(200).json({
    success: true,
    message: "profile updated Successful",
    user: updatedUser,
  });
});

module.exports = router;
