const express = require("express");
const router = express.Router();

const User = require("../models/user");
const cleanBody = require("../middlewares/cleanBody");

router.post("/", cleanBody, async (req, res) => {
  try {
    const { email} = req.body;

    console.log("email", email)
    const updatedUser = await Ticket.findByIdAndUpdate(
      _id,
      {
        $push: { clicks: { email: email, userId: id, clickedDate: Date.now() } },
      },
      {
        new: true,
      }
    );
  
    res.json(updatedPost);

    if (!email) {
      return res.send({
        error: true,
        message: "Please Enter Valid Email",
      });
    }

    //1. Find if any account with that email exists in DB
    const user = await User.findOne({ email: email });

    // NOT FOUND - Throw error
    if (user) {
      return res.send({
        error: true,
        message: "You already on waitlist!",
      });
    }

    const newUser = new User({
     email:email
    });
    //Generate Access token
    await newUser.save();

    //Success
    return res.send({
      success: true,
      message: "You've being added to the waitlist!",
  
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
