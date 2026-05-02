
const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    tieuDe: String,
    isCorrect: Boolean,
    IDCauHoi: String
})

const Answer = mongoose.model("Answer",answerSchema,"DapAn")
module.exports = Answer;