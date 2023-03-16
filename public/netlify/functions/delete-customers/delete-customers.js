const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db', {
  useNewUrlParser: true
}).then(() => console.log('MongoDB is on :D')).catch(err => console.log(err));
  const Customer = mongoose.model('vlfsr', new mongoose.Schema({
    aptName: String,
    filterSize: String
  }));


exports.handler = async (event, context) => {


  const { id } = event.queryStringParameters;
  console.log(id);
  await Customer.findByIdAndDelete(id);

  return {
    statusCode: 204,
    body: ''
  };
};
