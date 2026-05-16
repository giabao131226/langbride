
const User = require("../../models/user.model");
const mongoose = require("mongoose");

// [GET] "/admin1/quan-ly-tai-khoan"
module.exports.getAccounts = async (req, res) => {
    const find = {};
    const page = parseInt(req.query.page) || 1;
    const status = req.query.status;
    const level = req.query.level;

    if(level!="all") find.level = level

    if (status != undefined && status != "") find.status = status;
    if (textSearch && textSearch !== "") {
        find.$or = [
            { userName: { $regex: textSearch, $options: "i" } },
            { email: { $regex: textSearch, $options: "i" } },
            { phone: { $regex: textSearch, $options: "i" } }
        ];

        // nếu search là ObjectId thì thêm vào
        if (mongoose.Types.ObjectId.isValid(textSearch)) {
            find.$or.push({ _id: new mongoose.Types.ObjectId(textSearch) });
        }
    }
    try {
        const count = await User.countDocuments(find);
        const countToTal = await User.countDocuments();
        const countActive = await User.countDocuments({"status": "active"});
        const countBanned = await User.countDocuments({"status": "banned"});
        const numberPages = Math.ceil(count / 10);
        let firstPage;
        let lastPage;
        if(numberPages <=5){
            firstPage = 1;
            lastPage = numberPages;
        }else{
            if(page == 1){
                firstPage = 1;
                lastPage = 5;
            }else{
                firstPage = page - 1;
                console.log("Page + 3 = "+(page+3));
                if(page + 3 > numberPages){
                    lastPage = numberPages;
                    firstPage = numberPages - 4;
                }else lastPage = page+3;
            }
        }
        console.log(`First Page là ${firstPage} và Last Page là ${lastPage}`);
        const listAccount = await User.find(find).skip((page - 1) * 10).limit(10);

        return res.json({ "success": true, listAccount: listAccount, 
            pageInfo: {
            pageCurrent: page,
            firstPage: firstPage,
            lastPage: lastPage,
            numberPages: numberPages
            },
            tongQuanTaiKhoan: {
                countActiveAccount: countActive,
                countBannedAccount: countBanned,
                countToTalAccount: countToTal
            }
        });

    } catch (error) {
        console.log(error)
        return res.json({ "success": false, "error": error });
    }
}

// [PATCH] /admin1/quan-ly-tai-khoan/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    if (id && status) {
        try {
            const check = await User.updateOne({ "_id": id }, { "status": status });
            return res.json({ "success": true, "message": `Thay đổi thành công status của item có id là ${id} thành ${status}` });
        } catch (error) {
            console.log(error);
            return res.json({ "success": false, "error": error });
        }
    }
    return res.json({ "success": false, "message": "Không thể tìm thấy id" });
}

// [GET] /admin1/quan-ly-tai-khoan/account/:id
module.exports.getAccount = async (req,res) => {
    const id = req.params.id;
    if(id){
        try{
            const accDetail = await User.findOne({"_id":id});

            return res.json({"success": true,"accDetail": accDetail});

        }catch(error){
            console.log("Lỗi kết nối cơ sở dữ liệu khi lấy dữ liệu tài khoản: "+error);
            return res.json({"success": false,"message": error});
        }
    }
}