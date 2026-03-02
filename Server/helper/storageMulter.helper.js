const multer = require('multer');
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req,file,cb){
            cb(null,"uploads/")
        },
        filename: function (req,file,cb){
            const suffixName = Date.now()
            cb(null,`${suffixName}-${file.originalname}`)
        }
    })
    return storage;
}