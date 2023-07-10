const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const ROLES = require('../constants/roles');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(ROLES),
      default: ROLES.USER
    },
    permissions: [
      {
        type: Schema.ObjectId,
        ref: 'Permission'
      }
    ],
    customer: {
      type: Schema.ObjectId,
      ref: 'Customer'
    },

    avatar: { type: String },
    resetToken: { type: String, select: false },
    resetExpires: { type: Date, select: false },
    active: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.plugin(passportLocalMongoose);

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const json = this.toJSON();

  delete json.salt;
  delete json.hash;
  delete json.resetToken;
  delete json.resetExpires;
  delete json.verificationToken;
  delete json.customer;

  return json;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
