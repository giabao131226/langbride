
const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    tieuDe: String,
    isCorrect: Boolean,
    IDCauHoi: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
})

const Answer = mongoose.model("Answer",answerSchema,"DapAn")
module.exports = Answer;