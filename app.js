// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");

//提供靜態檔案
app.use(express.static("public"));
// routes setting
app.get("/", (req, res) => {
  res.render("index");
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
