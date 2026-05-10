const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    IDAccount: String,
    conTent: String,
    createAt: String,
    updateAt:String,
    totalLike: String,
})


const Post = mongoose.model("Post",postSchema,"Post");
module.exports = Post;