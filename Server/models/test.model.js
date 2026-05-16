const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: String,
    level: String,
    language: String,
    LoaiCauHoi: String,
    IDTest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test2"
    }
})

const Question = mongoose.model("Question", questionSchema, "Question");

module.exports = Question;