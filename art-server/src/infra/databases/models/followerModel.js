const mongoose = require('mongoose')
const {Schema} = mongoose

const followerSchema = new mongoose.Schema({
    followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    recStatus: {type: Number, default: 1},
    createdWhen: { type: Date, default: Date.now },
    updatedWhen: { type: Date, default: Date.now }
  });
  
  const Follower = mongoose.model("Follower", followerSchema);
  
  module.exports = Follower;
