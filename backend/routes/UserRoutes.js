const router = require('express').Router()
const { checkRole, requireAuth } = require("../middleware/auth");


const UserController = require('../controllers/UserController')

//Middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require("../helpers/image-upload");
const OwnerController = require('../controllers/OwnerController');

//User - customer router
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', verifyToken, checkRole(['admin']), UserController.getUserById)
router.patch('/edit/:id', verifyToken, checkRole(['admin', 'owner']), imageUpload.single("image"), UserController.editUser)

//User - Owner routes
router.get('/register-owner', OwnerController.registerOwner)

module.exports = router
