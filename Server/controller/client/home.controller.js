

const Users = require('../../models/user.model')
const validate = require('../../helper/validate.helper')


module.exports.home = async (req, res) => {

    const user = await Users.find({})
    res.json(user);

}

// Xử lý đăng ký
module.exports.signUp = async (req, res) => {
    try {

        const account = req.body;
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
        if (account.passWord != account.confirmpassWord) {
            return res.json({
                success: false,
                message: "Confirm that the password is not the same as the password.",
                possition: "confirmpassWord"
            })
        }
        if(!validate.validateEmail(account.email)){
            return res.json({
                success: false,
                message: "Please enter a valid email address (e.g., example@gmail.com).",
                possition: "email"
            })
        }
        if(!validate.validatePhone(account.phone)){
            return res.json({
                success: false,
                message: "Please enter a valid Vietnamese phone number.",
                possition: "phone"
            })
        }

        const trungUserName = await Users.find({ userName: account.userName })
        const trungEmail = await Users.find({ email: account.email })
        const trungSoDienThoai = await Users.find({ phone: account.phone })

        if (trungUserName.length > 0) {
            return res.json({
                success: false,
                message: "The Username already exists!!",
                possition: "userName"
            })
        } else if (trungEmail.length > 0) {
            return res.json({
                success: false,
                message: "The Email already exists!!",
                possition: "email"
            })
        } else if (trungSoDienThoai.length > 0) {
            return res.json({
                success: false,
                message: "The Phone Number already exists!!",
                possition: "phone"
            })
        }

        const user = await Users.create(req.body);
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
    }

}
// 

module.exports.signIn = async (req, res) => {
    try {
        const account = req.body;

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
        return res.status(200).json({success: true,user: user})

    } catch (error) {
        console.log(error)
    }
}