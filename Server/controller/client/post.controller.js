
const Post = require("../../models/post.model");
const Images = require("../../models/images.model");
const Users = require("../../models/user.model");
const mongoose = require("mongoose");


module.exports.getPost = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const count = await Post.countDocuments();
        const numberPages = Math.ceil(count / 10);

        let firstPage;
        let lastPage;
        if (numberPages <= 5) {
            firstPage = 1;
            lastPage = numberPages;
        } else {
            if (page == 1) {
                firstPage = 1;
                lastPage = 5;
            } else {
                firstPage = page - 1;
                console.log("Page + 3 = " + (page + 3));
                if (page + 3 > numberPages) {
                    lastPage = numberPages;
                    firstPage = numberPages - 4;
                } else lastPage = page + 3;
            }
        }
        console.log(`First Page là ${firstPage} và Last Page là ${lastPage}`);

        const resultPost = await Post.find().sort({ "createAt": -1 }).skip((page - 1) * 10).limit(10);

        const lastData = await Promise.all(resultPost.map(async (item) => {
            const images = await Images.find({ "IDBaiDang": item._id });
            const user = await Users.find({ "_id": new mongoose.Types.ObjectId(item.IDAccount) });
            return {
                ...item.toObject(), "images": images, "userDetail": {
                    "userName": user[0].userName,
                    "avatar": user[0].avatar,
                    "status": user[0].status,
                    "nation": user[0].nation

                }
            };
        }))
        return res.json({
            "success": true, listPost: lastData, pageInfo: {
                pageCurrent: page,
                firstPage: firstPage,
                lastPage: lastPage,
                numberPages: numberPages
            }
        });

    } catch (error) {
        console.log(error);
        return res.json({ "success": false });
    }
}

// [POST] /create
module.exports.create = async (req, res) => {
    const data = { ...req.body };
    console.log(data);
    let files = [];
    if (req.files) {
        files = [...req.files];
    }
    if (data) {
        if (data.conTent.trim().length == 0) {
            return res.json({ "success": false, "message": "You must enter content for the post." });
        }
        try {
            const resultPost = await Post.create(data);
            if (resultPost) {
                const idPost = resultPost._id;

                const imagesResult = await Promise.all(files.map(async (item) => {
                    const dataImage = {
                        "IDBaiDang": idPost,
                        "url": "/" + item.destination + item.filename
                    }
                    const result = await Images.create(dataImage);
                    return result;
                }))

                // lấy dữ liệu để trả ra
                const post = await Post.find({ "_id": idPost });
                const images = await Images.find({ "IDBaiDang": idPost });
                const user = await Users.find({ "_id": new mongoose.Types.ObjectId(post[0].IDAccount) });

                const dataPost = {
                    ...post[0].toObject(), images: images, "userDetail": {
                        "userName": user[0].userName,
                        "avatar": user[0].avatar,
                        "status": user[0].status,
                        "nation": user[0].nation || "Vietnam"
                    }
                };
                console.log(dataPost);
                return res.json({ "success": true, "message": "Uploaded successfully!!", "newPost": dataPost });
            }

        } catch (error) {
            console.log(error);
            return res.json({ "success": false });
        }
    }
}