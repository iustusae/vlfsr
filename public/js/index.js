const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const CustomerSchema = new mongoose.Schema({
    aptName: String,
    filterSize: String
});
const Customer = mongoose.model('vlfsr', CustomerSchema);

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://root:Aym%40n1504@cluster0.0rfiy6k.mongodb.net/db', {
    useNewUrlParser: true
}).then(() => console.log('MongoDB is on :D')).catch(err => console.log(err));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
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

module.exports.handler = serverless(app);
