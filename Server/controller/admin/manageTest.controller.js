const Question = require("../../models/test.model");
const Test = require("../../models/test2.model");
const Answer = require("../../models/answer.model");
const mongoose = require("mongoose");


// [POST] /quan-ly-bai-test/create
module.exports.CreateTest = async (req, res) => {
    const data = req.body;
    const testDetail = {
        "testName": data.testName,
        "level": data.level,
        "timeLimit": data.timeLimit,
        "totalQuestion": data.totalQuestion,
        "language": data.language
    }
    try {
        const testResult = await Test.create(testDetail);
        if (testResult) {
            const question = data.question;
            for (const item of question) {
                const dataQuestion = {
                    "IDTest": testResult._id,
                    "title": item.title,
                    "level": data.level,
                    "language": item.language
                }
                const newQuestion = await Question.create(dataQuestion);

                for (const answer of item.answer) {
                    const dataAnswer = {
                        "tieuDe": answer.title,
                        "isCorrect": answer.isCorrect,
                        "IDCauHoi": new mongoose.Types.ObjectId(newQuestion._id)
                    }
                    const newAnswer = await Answer.create(dataAnswer);
                }
            }
            return res.json({ "success": true });
        }

    } catch (error) {
        console.log("Lỗi khi thêm bài test: ", error);
        return res.json({ "success": false, "message": error });
    }
}

// [GET] /quan-ly-bai-kiem-tra/
module.exports.GetTest = async (req, res) => {
    const find = {"deleted": false};
    const page = parseInt(req.query.page) || 1;
    const level = req.query.level;
    const language = req.query.language;
    const status = req.query.status;


    if(level != "all" && level != "") find.level = level;
    if(language != "all" && language != "") find.language = language;
    if(status != "all" && status != "") find.status = status;

    try {
        const count = await Test.countDocuments(find);
        const countToTal = await Test.countDocuments();
        const countActive = await Test.countDocuments({ "status": "active" });
        const countInActive = await Test.countDocuments({ "status": "in-active" });
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
        const listTest = await Test.find(find).skip((page-1)*10).limit(10);
        return res.json({
            "success": true,
            "listTest": listTest,
            "pageInfo": {
                pageCurrent: page,
                firstPage: firstPage,
                lastPage: lastPage,
                numberPages: numberPages
            },
            "tongQuanBaiTest": {
                countActiveTest: countActive,
                countInActiveTest: countInActive,
                countToTalTest: countToTal
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({ "success": false, "message": error })
    }
}

// [PATCH] /quan-ly-bai-kiem-tra/remove/
module.exports.RemoveTest = async (req,res) => {
    const id = req.body.id;
    try{
        const resultRemove = await Test.updateOne({"_id": id},{"deleted": true});

        return res.json({"success": true});
    }catch(error){
        console.log(error);
        return res.json({"success": false,"message": error});
    }
}

// [PATCH] /quan-ly-bai-kiem-tra/change-status/:id/:status
module.exports.ChangeStatus = async (req,res) => {
    const id = req.params.id;
    const status = req.params.status;

    if (id && status) {
        try {
            const check = await Test.updateOne({ "_id": id }, { "status": status });
            return res.json({ "success": true, "message": `Thay đổi thành công status của item có id là ${id} thành ${status}` });
        } catch (error) {
            console.log(error);
            return res.json({ "success": false, "error": error });
        }
    }
    return res.json({ "success": false, "message": "Không thể tìm thấy id" });
}