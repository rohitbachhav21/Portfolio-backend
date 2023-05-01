

const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

;

const uri = `mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@cluster1.aegxczx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    //collections

    const userCollection = client.db("database").collection("user"); //this is user collection

    app.post("/user", async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      });
      
    } catch (error) {
      console.log("An error occurred:", error);
      
    }
}    

run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});