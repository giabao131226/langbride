const Post = require("../../models/post.model");
const Users = require("../../models/user.model");
const Images = require("../../models/images.model");
const mongoose = require("mongoose");

module.exports.getPost = async (req, res) => {
    const find = { "deleted": false };
    const publishedDate = req.query["published-date"];
    if (publishedDate && publishedDate.length > 0) find.createAt = publishedDate;
    const type = req.query.type;
    if (type && type != "all" && type.length > 0) find.tag = type;
    const search = req.query.search;
    if (search && search.length > 0) {
        const users = await Users.find({
            userName: { $regex: search, $options: "i" }
        });

        const userIds = users.map(item => item._id);

        find.$or = [
            { conTent: { $regex: search, $options: "i" } },
            { IDAccount: { $in: userIds } }
        ];
    }

    console.log(find);

    try {
        const listPost = await Post.find(find).populate("IDAccount", "-passWord");
        console.log(listPost);
        const lastData = await Promise.all(listPost.map(async (item) => {
            const images = await Images.find({ "IDBaiDang": item._id });
            // console.log(user);

            return {
                ...item.toObject(), "images": images
            };
        }))
        // console.log(lastData);

        return res.json({ "success": true, listPost: lastData });

    } catch (error) {
        console.log(error);
        return res.json({ "success": false, "message": error });

    }
}

// [PATCH] /quan-ly-bai-dang/remove/:id
module.exports.RemovePost = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const result = await Post.updateOne({ "_id": id }, { "deleted": true });
            return res.json({ "success": true, "message": "Xoá bài thành công" });
        } catch (error) {
            console.log("Lỗi khi truy cập vào cơ sở dữ liệu: " + error);
            return res.json({ "success": false, "message": error });
        }
    }
    return res.json({ "success": false, "message": "Xoá bài đăng không thành công vì không tìm thấy id nào là " + id })
}