const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const corsConfig = {
  origin: ["*"],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// middlewars
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

//mongodb start
//mongodb end

//basic setup
app.get("/", (req, res) => {
  res.send("Next js To DO App Server is Running.");
});

app.listen(port, () => {
  console.log(`Next js To DO App Server is Running on PORT: ${port}`);
});
