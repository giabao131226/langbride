const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const routes = require("./routes/client/index.route")
const routeAdmin = require('./routes/admin/index.route')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require("dotenv").config();

console.log("🔥 FILE SERVER NÀY ĐANG CHẠY");

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
// 

const app = express();

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'));

app.use(cors());
//Dùng để đọc dữ liệu từ form HTML
app.use(express.urlencoded({ extended: true }));
// Dùng để đọc dữ liệu dạng JSON
app.use(express.json());

app.use(express.static("public"))
app.use("/uploads", express.static("uploads"))

routes(app);
routeAdmin(app);
app.get("/",(req,res) => {
    res.send("abc");
})

app.listen(process.env.PORT, () => {
    console.log("PORT",process.env.PORT)
    console.log("Connect Success!!")
})