
const User = require('../../models/user.model')
// Thư viện để gửi email
const nodemailer = require("nodemailer")
// 

module.exports.editProfile = async (req, res) => {
    const oldData = await User.find({ _id: req.body._id })
    const oldAvatar = oldData[0].avatar || ""
    if (req.file) {
        const file = req.file;
        req.body.avatar = `/uploads/${file.filename}`;
    }

    const user = await User.updateOne({ _id: req.body._id }, {
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar || oldAvatar
    })

    const account = await User.find({ _id: req.body._id })
    res.status(200).json({ success: true, account: account[0] });
}


module.exports.sendCode = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email)

        const user = await User.find({ email: email })

        // Tạo transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "dobao13122006@gmail.com",
                pass: "elhejvmlgtumctgg",
            },
        });

        const otp = Math.floor(100000 + Math.random() * 900000);

        await transporter.sendMail({
            from: '"LangBridge" <dobao13122006@gmail.com>',
            to: `${email}`,
            subject: "Password Reset Verification Code - LangBridge",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #4CAF50;">LangBridge</h2>
            
            <p>Hello,</p>
            
            <p>We received a request to reset your password.</p>
            
            <p>Your verification code is:</p>
            
            <h1 style="color: #000; letter-spacing: 5px;">${otp}</h1>
            
            <p>This code will expire in <b>5 minutes</b>.</p>
            
            <p>If you did not request this, please ignore this email.</p>
            
            <hr />
            <p style="font-size: 12px; color: gray;">
                This is an automated email. Please do not reply.
            </p>
        </div>
            `,
        });
        return res.json({ success: true , otp: otp})
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.newPassword

    console.log(email,newPassword)

    const user = await User.updateOne({ email: email }, { passWord: newPassword })
    return res.status(200).json({ success: true })
}