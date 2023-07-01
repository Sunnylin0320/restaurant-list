const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const seed = require("./restaurant.json");

handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});
const routes = require("./routes");

require("./config/mongoose");





app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//提供靜態檔案
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(routes);

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000.");
});
