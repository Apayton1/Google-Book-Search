
require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./client/src/routes")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");




app.use(cors());
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.use(routes);
// CONNECT TO MONGODB

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

// mongoose.connect(MONGODB_URI);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useCreateIndex: true, 
    useNewUrlParser: true
  }
);



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
