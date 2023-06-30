const mongoose = require('mongoose')
//載入restaurant model
const Restaurant = require("../restaurant");
const seed = require("../../restaurant.json")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurantList = require("../../restaurant.json").results;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < seed.results.length; i++) {
    Restaurant.create({
      name: `${seed.results[i].name}`,
      name_en: `${seed.results[i].name_en}`,
      category: `${seed.results[i].category}`,
      image: `${seed.results[i].image}`,
      location: `${seed.results[i].location}`,
      phone: `${seed.results[i].phone}`,
      google_map: `${seed.results[i].google_map}`,
      rating: `${seed.results[i].rating}`,
      description: `${seed.results[i].description}`,
    });
  }
  console.log("done");
});