const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db', {
  useNewUrlParser: true
}).then(() => console.log('MongoDB is on :D')).catch(err => console.log(err));

const Customer = mongoose.model('vlfsr', new mongoose.Schema({
  aptName: String,
  filterSize: String
}));

exports.handler = async (event, context) => {
  const customers = await Customer.find();

  return {
    statusCode: 200,
    body: JSON.stringify(customers)
  };
};
