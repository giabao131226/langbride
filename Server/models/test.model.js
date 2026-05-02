
const mongoose = require('mongoose')
const testSchema = mongoose.Schema({
    id: String,
    deBai: String,
    DoKho: String,
    LoaiCauHoi: String,
    IDBKT: String
})

const Test = mongoose.model("Test",testSchema,"CauHoi")

module.exports = Test;