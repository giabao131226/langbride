const express = require('express')
const cors = require('cors')
const routes = require("./routes/client/index.route")

// Database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/langbridge')

// 

const app = express();

app.use(cors());
app.use(express.json());

routes(app)

const PORT = 5000;
app.listen(PORT,() => {
    console.log("Connect Success!!")
})