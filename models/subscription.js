const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  toilets: { type: Number, required: true },
  frequency: { type: String, enum: ['2 Times','4 Times'], required: true },
  price: { type: Number, required: true },
  city: { type: String, default: 'VIVA CITY' },
  includesWashbasin: { type: Boolean, default: true },
});

module.exports = mongoose.model('subscriptions', subscriptionSchema);
