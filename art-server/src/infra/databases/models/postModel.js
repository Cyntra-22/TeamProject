const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    taggedTopic: { type: [String], default: [] }, 
    postImage: { type: String, default: "", required: true },
    userId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    likeAmount: {type: Number, default: 0},
    userLikes: {type: [Schema.Types.ObjectId], ref: 'User', default: []},
    aiTag: {type: Boolean, default: false},
    recStatus: {type: Number, default: 1},
    createdWhen: { type: Date, default: Date.now },
    updatedWhen: { type: Date, default: Date.now }
  });
  
  const Post = mongoose.model("Post", postSchema);
  
  module.exports = Post;
