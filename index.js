
const express = require('express');
//const { MongoClient } = require('mongodb');
//const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

// middleware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('Running Shop Grid Root API on Browser');
});

app.listen(port, () => {
    console.log('Running Shop Grid Server in console', port);
});



