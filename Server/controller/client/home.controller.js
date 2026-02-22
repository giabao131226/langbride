

const Users = require('../../models/user.model')

module.exports.home = async (req,res) => {

    const user = await Users.find({})
    res.json(user);

    res.send("abc")
}

module.exports.signUp = async (req,res) => {

    try {

        const account = req.body;

        const trungUserName = await Users.find({userName: account.userName}) 
        const trungEmail = await Users.find({email: account.email})
        const trungSoDienThoai = await Users.find({phone: account.phone})

        if(trungUserName.length > 0){
            return res.status(409).json({
                success: false,
                message: "The Username already exists!!",
                possition: "userName"
            })
        }else if(trungEmail.length > 0){
            return res.status(409).json({
                success: false,
                message: "The Email already exists!!",
                possition: "email"
            })
        }else if(trungSoDienThoai.length > 0){
            return res.status(409).json({
                success: false,
                message: "The Phone Number already exists!!",
                possition: "phone"
            })
        }

        const user = await Users.create(req.body);
        return res.status(200).json({user})
    }catch(error){
        console.log(error)
    }

}

module.exports.signIn = async (req,res) => {
    try{
        const account = req.body;
        const user = await Users.findOne({userName: account.userName,passWord: account.passWord})

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Incorrect account or password!!"
            })
        }
        return res.status(200).json({user})

    }catch(error){
        console.log(error)
    }
}