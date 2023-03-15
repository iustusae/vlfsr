const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('src'));

const port = 3003;
mongoose.connect('mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db', {
  useNewUrlParser: true
}).then(() => console.log('MongoDB is on :D')).catch(err => console.log(err));
const CustomerSchema = new mongoose.Schema({
  aptName: String,
  filterSize: String
});
const Customer = mongoose.model('vlfsr', CustomerSchema);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/cstm', async (req, res) => {
  const Customers = await Customer.find();
  res.json(Customers);
});
app.post('/cstm', async (req, res) => {
  console.log(req.body);
  const newCustomer = new Customer(req.body);
  await newCustomer.save();
  res.json(newCustomer);
});
app.put('/cstm/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
    new: true
  });
  res.json(updatedCustomer);
});
app.delete('/cstm/:id', async (req, res) => {
  const {
    id
  } = req.params;
  await Customer.findByIdAndDelete(id);
  res.sendStatus(204);
});
app.listen(port, () => console.log(`Server running on port ${port}`));