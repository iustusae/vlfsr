const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const functions = require('./netlify/functions');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('src'));

const port = process.env.PORT || 3003;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Use Netlify Functions for routes
app.get('https://vlfsr.netlify.app/.netlify/functions/get-customers', functions.getCustomers);
app.post('https://vlfsr.netlify.app/.netlify/functions/create-customers', functions.createCustomer);
app.put('/cstm/:id', functions.updateCustomer);
app.delete('/cstm/:id', functions.deleteCustomer);
app.listen(port, () => console.log(`Server running on port ${port}`));