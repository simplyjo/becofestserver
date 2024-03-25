
const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
  
  walletAddress: { type: String},
  email: { type: String },
 userId:"",
totalPoint:0,
quiz:false,
s1:0,
s2:0,
s3:0,
s4:0,
s5:0,
s6:0,
profileImageUrl: String,
referrals:{type:[String]},
referrer:{type:String},
referralCode:{type:String},
wallet:String,
accesstoken:"",
followStatus:false,
walletStatus:false,
tweet:false,
likeStatus:false,
tgStatus:false,
discordStatus:false,
tweetStatus:false,
twitterUsername:"",
discordUsername:"",
tgUsername:"",
nft_count:0,
nft_s1:false,
nft_s2:false,
nft_s3:false,
nft_s4:false,
nft_s5:false,
nft_s6:false,
premintStatus:false,
followBecoStatus:false,
discordBecoStatus:false,
tgBecoStatus:false,
likeAlphaStatus:false,
followAlphaStatus:false,
tgAlphaStatus:false,

});

const User = mongoose.model("season", seasonSchema);

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

