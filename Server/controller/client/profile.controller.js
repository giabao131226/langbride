
const User = require('../../models/user.model')

module.exports.editProfile = async (req,res) => { 
    const oldData = await User.find({_id: req.body._id})
    const oldAvatar = oldData[0].avatar || ""
    if(req.file){
        const file = req.file;
        req.body.avatar = `/uploads/${file.filename}`;
    }

    const user =  await User.updateOne({_id: req.body._id},{
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar || oldAvatar
    })

    const account = await User.find({_id: req.body._id})
    res.status(200).json({success: true,account: account[0]});
}

module.exports.forgotPassword = async (req,res) => {
    const email = req.body.email;
    const newPassword = req.body.newPassword

    const user = await User.updateOne({email: email},{passWord: newPassword})
    res.status(200).json({success: true})
}