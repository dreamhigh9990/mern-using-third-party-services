const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    post: {
      type: Schema.ObjectId,
      ref: 'Post'
    },
    space: {
      type: Schema.ObjectId,
      ref: 'Space'
    },
    replyTo: {
      type: Schema.ObjectId,
      ref: 'Comment'
    },
    replies: [
      {
        type: Schema.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    collection: 'comments',
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
