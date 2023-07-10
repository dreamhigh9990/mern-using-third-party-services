const mongoose = require('mongoose');
const SPACE_PERMISSIONS = require('../constants/space-permissions');

const { Schema } = mongoose;

const invitationSchema = new Schema(
  {
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
    space: {
      type: Schema.ObjectId,
      ref: 'Space'
    },
    permission: {
      type: String,
      required: true,
      enum: Object.values(SPACE_PERMISSIONS),
      default: SPACE_PERMISSIONS.MEMBER
    },
    invitationToken: { type: String, select: false }
  },
  {
    collection: 'invitations',
    timestamps: true
  }
);

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
