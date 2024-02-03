
const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  walletAddress: { type: String},
  email: { type: String },
 userId:"",
totalPoint:0,
profileImageUrl: String,
task_one:false,
task_two:false,
task_three:false,
task_four:false,
referrals:{type:[String]},
referrer:{type:String},
referralCode:{type:String},
tweet:false,
wallet:String,
walletStatus:false,
accesstoken:"",
followStatus:false,
followPartnerStatus:false,
likeStatus:false,
tgStatus:false,
discordStatus:false,
tweetStatus:false,
twitterUsername:"",
discordUsername:"",
tgUsername:""


});

const User = mongoose.model("user", userSchema);

module.exports = User;

module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};
module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Comparison failed", error);
  }
};

