const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    userName: String,
    passWord: String,
    email: String,
    phone: String,
    token: String,
    avatar: String,
})

const Users = mongoose.model('Users',userSchema,'users')

module.exports = Users
