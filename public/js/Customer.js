const mongoose = require("mongoose");

const Customer = mongoose.model('vlfsr', new mongoose.Schema({
    aptName: String,
    filterSize: String,
    date: Date.now()
  }));

export default Customer