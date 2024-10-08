
const multer = require('multer')
const path = require('path')

//desting img

const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
            cb(null, `public/images/${folder}`)

        } else if(req.baseUrl.includes("moves") && file.fieldname === "images") {
            folder = "imoveis"
            cb(null, `public/images/${folder}`)
        }
        else if(req.baseUrl.includes("moves") && file.fieldname === "image" ) {
            folder = "users"
            cb(null, `public/images/${folder}`)
        }
        

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/|.(png|jpg)$/)) {
            return cb(new Error ("Por favor, envie apenas jpg ou png"))
        }
        cb(undefined, true)
    },
})

module.exports = {imageUpload}

