

// Validate Name
module.exports.validateName = (value) => {
    return /^[a-zA-Z0-9]{1,8}$/.test(value);
}
// 
// Validate password
module.exports.validatePassword = (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)
}
//
// Validate Email
module.exports.validateEmail = (value) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
}
// Validate Phone
module.exports.validatePhone = (value) => {
    return /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(value)
}
// 
