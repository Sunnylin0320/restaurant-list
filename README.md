 # 功能

使用者可以新增一家餐廳

使用者可以瀏覽一家餐廳的詳細資訊

使用者可以瀏覽全部所有餐廳

使用者可以修改一家餐廳的資訊

使用者可以刪除一家餐廳

使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。

使用者也可以透過 Facebook Login 直接登入

使用者必須登入才能使用餐廳清單

使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息

 # 使用技術和工具

後端框架: Node.js + Express

前端模板引擎: HTML + CSS + JavaScript

資料庫: MongoDB

使用者身份驗證: Passport.js

資料庫物件建模工具: Mongoose

密碼加密: bcrypt.js

第三方登入: Facebook Login API

開發工具: Visual Studio Code

版本控制: Git

代碼托管平台: GitHub



 # 開始使用
請先確認有安裝 node.js 與 npm

將專案 clone 到本地

https://github.com/RobertOu0213/3-A1

在本地開啟之後，透過終端機進入資料夾，輸入：

npm install

依據.env.example, 請自行帶入以下參數
   # Mongo db connect info
    MONGODB_URI=<YOUR OWN connect string>
    
   # Session secret
    SESSION_SECRET=<YOUR_SESSION_SECRET>

   # Facebook App info
    FACEBOOK_ID=SKIP
    FACEBOOK_SECRET=SKIP

安裝完畢後，繼續輸入：

npm run start

若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

Listening on http://localhost:3000

