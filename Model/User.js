const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  Gender: String,
  HeightCm: Number,
  WeightKg: Number,
  BMI_Category: String,
  Health_Risk: String,
  BMI: Number
})
module.exports = User = mongoose.model('User', userSchema)
