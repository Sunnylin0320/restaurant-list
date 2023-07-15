
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
const MONGODB_URI = "mongodb+srv://alpha:camp@cluster0.7w5mopc.mongodb.net/restaurant-list?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDB is not connected.");
});

db.once("open", () => {
  console.log("MongoDB is connected!");
});

module.exports = db;
