const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const routes = require("./routes/client/index.route")

// Database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/langbridge')
// 

const app = express();

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(cors());
app.use(express.json());

app.use(express.static("public"))
app.use("/uploads",express.static("uploads"))


routes(app)

const PORT = 5000;
app.listen(PORT,() => {
    console.log("Connect Success!!")
})