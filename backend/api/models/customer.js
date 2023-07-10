const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    stripeCustomerId: { type: String, required: true },
    sources: [
      {
        token: { type: String, required: true },
        isDefault: { type: Boolean },
        last4: { type: String },
        brand: { type: String }
      }
    ],
    subscriptions: [
      {
        type: Schema.ObjectId,
        ref: 'Subscription'
      }
    ],
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'customers',
    timestamps: true
  }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
