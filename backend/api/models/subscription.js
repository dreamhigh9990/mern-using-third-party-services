const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    subscriptionId: { type: String, required: true },
    planId: { type: String, required: true },
    space: {
      type: Schema.ObjectId,
      ref: 'Space'
    },
    customer: {
      type: Schema.ObjectId,
      ref: 'Customer'
    },
    status: { type: String },
    subscriptionStart: { type: Number },
    currentPeriodStart: { type: Number },
    currentPeriodEnd: { type: Number }
  },
  {
    collection: 'subscriptions',
    timestamps: true
  }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
