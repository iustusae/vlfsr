const mongoose = require('mongoose');

// Create a connection pool
const uri = 'mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db';
const options = { useNewUrlParser: true, poolSize: 10, useUnifiedTopology: true };
const connectionPool = mongoose.createPool(uri, options);

exports.handler = async (event, context) => {
  const Customer = connectionPool.model('vlfsr', new mongoose.Schema({
    aptName: String,
    filterSize: String
  }));

  const { id } = event.queryStringParameters;
  await Customer.findByIdAndDelete(id);

  return {
    statusCode: 204,
    body: ''
  };
};
