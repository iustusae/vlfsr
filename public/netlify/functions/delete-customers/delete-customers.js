const mongoose = require('mongoose');

const Customer = mongoose.model('vlfsr', new mongoose.Schema({
  aptName: String,
  filterSize: String
}));

exports.handler = async (event, context) => {
  try {
    await mongoose.connect('mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db', {
      useNewUrlParser: true
    });
    console.log('MongoDB is on :D');

    const path = event.path;
  const id = path.split('/').pop();
    console.log("id => " + id);
    await Customer.findByIdAndDelete(id);

    await mongoose.connection.close();

    return {
      statusCode: 204,
      body: ''
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};
