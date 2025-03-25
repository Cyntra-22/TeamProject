const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    description: { type: String, required: true },
    userId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    commentTopicId: {type: Schema.Types.ObjectId, ref: 'Comment'},
    recStatus: {type: Number, default: 1},
    createdWhen: { type: Date, default: Date.now },
    updatedWhen: { type: Date, default: Date.now }
  });
  
  const Comment = mongoose.model("Comment", commentSchema);
  
  module.exports = Comment;
