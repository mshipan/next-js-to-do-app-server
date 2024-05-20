const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Import API modules
const tasksApi = require("./apis/taskApi");
const singleTaskApi = require("./apis/singleTaskApi");

const corsConfig = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// middlewars
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

//mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1oh7p7d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //collection start
    const tasksCollection = client.db("nextjs-todo").collection("tasks");
    //collection end

    // apis start
    app.use("/tasks", tasksApi(tasksCollection));
    app.use("/task", singleTaskApi(tasksCollection));
    // apis end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//mongodb end

//basic setup
app.get("/", (req, res) => {
  res.send("Next js To DO App Server is Running.");
});

app.listen(port, () => {
  console.log(`Next js To DO App Server is Running on PORT: ${port}`);
});
