const mongoose = require('mongoose');
const SPACE_PERMISSIONS = require('../constants/space-permissions');

const { Schema } = mongoose;

const permissionSchema = new Schema(
  {
    space: { type: Schema.ObjectId, ref: 'Space' },
    user: { type: Schema.ObjectId, ref: 'User' },
    role: {
      type: String,
      required: true,
      enum: Object.values(SPACE_PERMISSIONS),
      default: SPACE_PERMISSIONS.MEMBER
    }
  },
  {
    timestamps: true,
    collection: 'permissions'
  }
);

permissionSchema.index({ user: 1, space: 1 }, { unique: true });

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
