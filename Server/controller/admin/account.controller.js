const validate = require("../../helper/validate.helper")
const Users = require("../../models/user.model")
const jwt = require("jsonwebtoken");

module.exports.signIn = async (req,res) => {
    
    try {
        const account = req.body;
        console.log(account)

        if (!validate.validateName(account.userName)) {
            return res.json({ success: false, 
                            message: "Username must be 6–16 characters long and contain only letters and numbers.", 
                            possition: "userName" })
        }
        if(!validate.validatePassword(account.passWord)){
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long and contain only letters or numbers.",
                possition: "passWord"
            })
        }

        const user = await Users.findOne({ userName: account.userName, passWord: account.passWord })
        if (!user) {
            return res.json({
                success: false,
                message: "Incorrect account or password!!"
            })
        }
        const token = jwt.sign({"userName": user.userName},"daylachuky",{expiresIn:"24h"});
        
        return res.status(200).json({success: true,token: token})

    } catch (error) {
        console.error("🔥 SERVER ERROR:", error);
    return res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
}
