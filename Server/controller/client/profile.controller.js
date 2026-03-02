
const User = require('../../models/user.model')

module.exports.editProfile = async (req,res) => {
    const file = req.file;

    req.body.avatar = `/uploads/${file.filename}`;

    const user =  await User.updateOne({_id: req.body._id},{
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar
    })

    const account = await User.find({_id: req.body._id})
    
    res.status(200).json({success: true,account: account[0]});
}