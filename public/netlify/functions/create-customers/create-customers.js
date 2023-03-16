const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db', {
    useNewUrlParser: true
  }).then(() => console.log('MongoDB is on :D')).catch(err => console.log(err));
  const Customer = mongoose.model('vlfsr', new mongoose.Schema({
    aptName: String,
    filterSize: String
  }));


exports.handler = async (event, context) => {

  const newCustomer = new Customer(JSON.parse(event.body));

  await newCustomer.save();

  return {
    statusCode: 200,
    body: JSON.stringify(newCustomer)
  };
};
