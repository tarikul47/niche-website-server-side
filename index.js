const express = require("express");
// mongoclient
const { MongoClient } = require("mongodb");
// mongo db id
//const ObjectId = require('mongodb').ObjectId;

// corros conncetion
const cors = require("cors");

// for env file support
require("dotenv").config();

// our main app
const app = express();

// port define
const port = process.env.PORT || 5000;

// middleware
app.use(cors());

// for data processing
app.use(express.json());

// database uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyvua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// database client object
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  database connect function
async function run() {
  try {
    await client.connect();
    console.log("Coonected database");
    const database = client.db("shopGrids");
    const userCollection = database.collection("users");

    // create a document to insert
    // const doc = {
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // };
    //const result = await haiku.insertOne(doc);
    //console.log(`A document was inserted with the _id: ${result.insertedId}`);

  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

// ROOT API
app.get("/", (req, res) => {
  res.send("Running Shop Grid Root API on Browser");
});

// console output
app.listen(port, () => {
  console.log("Running Shop Grid Server in console", port);
});
