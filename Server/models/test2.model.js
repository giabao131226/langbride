
const mongoose = require("mongoose");
const testSchema = mongoose.Schema({
    testName: String,
    level: String,
    timeLimit: Number,
    totalQuestion: Number,
    language: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

const Test2 = mongoose.model("Test2",testSchema,"test");
module.exports = Test2;