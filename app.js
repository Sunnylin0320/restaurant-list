// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");

//提供靜態檔案
app.use(express.static("public"));
// routes setting
app.get("/", (req, res) => {
  // create a variable to store movieOne
  const movieOne = {
    id: 1,
    title: "Here is Movie Title",
    image:
      "https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
  };

  // past the movie data into 'index' partial template
  res.render("index", { movie: movieOne });
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
