if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");


const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();
const PORT = 3000;
const methodOverride = require("method-override");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const seed = require("./restaurant.json");

handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});
const router = require("./routes");
const usePassport = require("./config/passport");



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);
//提供靜態檔案
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

usePassport(app);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
