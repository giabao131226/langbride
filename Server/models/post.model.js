const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    IDAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    conTent: String,
    createAt: String,
    updateAt:String,
    totalLike: String,
    deleted: {
        type: Boolean,
        default: false
    },
    tag: {
        type: String,
        default: "question"
    }
})


const Post = mongoose.model("Post",postSchema,"Post");
module.exports = Post;