const express = require("express");
// mongoclient
const { MongoClient } = require("mongodb");
// mongo db id
const ObjectId = require("mongodb").ObjectId;

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
    console.log("Connected database");
    const database = client.db("shopGrids");
    const userCollection = database.collection("users");
    const productsCollection = database.collection("products");
    const reviewsCollection = database.collection("reviews");

    // Product POST API
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.json(result);
      console.log("hitting product post api", product);
    });

    // Product GET API
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // Product GET API BY ID
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.json(result);
    });


    // Product DELETE API
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productsCollection.deleteOne(query);
      res.json(product);
      //console.log('API hit', id);
    });

    // Reviews POST API
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.json(result);
      //console.log("hitting review post api", review);
    });


     // Product GET API
     app.get("/reviews", async (req, res) => {
      const cursor = reviewsCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // ROOT API
    app.get("/users", (req, res) => {
      res.send("User get API Calling");
    });

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
