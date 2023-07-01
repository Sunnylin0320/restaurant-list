// require packages used in the project
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const seed = require("./restaurant.json");

handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

const Restaurant = require("./models/restaurant");
const app = express();



// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//建立伺服器參數
const port = 3000;


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//提供靜態檔案
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



// routes setting
//設定index首頁路由
app.get("/", (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => res.render("index", { restaurants })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error));
});

//搜尋功能
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = seed.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});


//Create Route
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});
//Create 功能：資料庫新增資料

app.post("/restaurants", (req, res) => {
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
  return Restaurant.create({ name })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});


//show Route
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});





// edit Route
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});


//edit 功能
app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  const { name, isDone } = req.body;
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.isDone = isDone === "on";
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

//delete路由
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});




app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});