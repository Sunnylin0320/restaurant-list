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
const routes = require("./routes");
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






app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});