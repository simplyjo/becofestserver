
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  
  walletAddress: { type: String},
  nft_minted_s1_total:0,
  nft_minted_s2_total:0,
  nft_minted_s3_total:0,
  nft_minted_s4_total:0,
  nft_minted_s5_total:0,
  nft_minted_s6_total:0,


});

const User = mongoose.model("admin", adminSchema);

module.exports = User;



