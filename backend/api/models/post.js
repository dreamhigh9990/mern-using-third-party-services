const mongoose = require('mongoose');
const POST_KINDS = require('../constants/post-kinds');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    kind: {
      type: String,
      required: true,
      default: POST_KINDS.IMAGE,
      enum: Object.values(POST_KINDS)
    },
    filename: {
      type: String,
      trim: true,
      required: true
    },
    uploadcareId: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    space: {
      type: Schema.ObjectId,
      ref: 'Space'
    }
  },
  {
    collection: 'posts',
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
