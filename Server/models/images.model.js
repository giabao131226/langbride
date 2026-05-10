
const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
    IDBaiDang: String,
    url: String,
})

const Images = mongoose.model("Images",imageSchema,"images");

module.exports = Images;