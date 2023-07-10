const mongoose = require('mongoose');
const slugify = require('../utils/slugify');
const TIERS = require('../constants/space-tiers');
const STATUSES = require('../constants/space-statuses');

const { Schema } = mongoose;

const spaceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      default: STATUSES.ACTIVE,
      enum: Object.values(STATUSES)
    },
    slug: { type: String, unique: true, index: true },
    image: { type: String },
    tier: {
      type: String,
      required: true,
      default: TIERS.FREE,
      enum: Object.values(TIERS)
    },
    subscription: {
      type: Schema.ObjectId,
      ref: 'Subscription'
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    permissions: [
      {
        type: Schema.ObjectId,
        ref: 'Permission'
      }
    ],
    invitations: [
      {
        type: Schema.ObjectId,
        ref: 'Invitation'
      }
    ]
  },
  {
    collection: 'spaces',
    timestamps: true
  }
);

spaceSchema.pre('save', function preSave(next) {
  if (this.slug) {
    return next();
  }

  return slugify(this.constructor, this.name)
    .then(slug => {
      this.slug = slug;
      next();
    })
    .catch(err => {
      next(err);
    });
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
