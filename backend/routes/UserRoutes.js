const router = require('express').Router()
const { checkRole, requireAuth } = require("../middleware/auth");


const UserController = require('../controllers/UserController')

//middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require("../helpers/image-upload")


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, checkRole(['owner']), imageUpload.single("image"), UserController.editUser)



module.exports = router
