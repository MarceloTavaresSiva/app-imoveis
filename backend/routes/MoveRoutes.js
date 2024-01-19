const router = require('express').Router()
const { checkRole, requireAuth } = require("../middleware/auth");

const MoveController = require('../controllers/MoveController')

//Middlewares
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')
// const multer = require('multer')
// const upload = multer()


router.post('/create', imageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 3 }]), MoveController.create)
// router.post('/create', upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'images', maxCount: 3 },
//   ]), MoveController.create)
router.get('/all',  MoveController.getAll)
router.get('/mymoves', verifyToken, checkRole(['admin']), MoveController.getAllUserMoves)
router.get('/myimoveloptions', verifyToken, MoveController.getAllImoveloptions)
router.get('/:id', MoveController.getMoveById)
router.delete('/:id', verifyToken, MoveController.removeMoveById)
router.patch('/:id', verifyToken, imageUpload.array('images'), MoveController.updateMove)

router.patch('/schedule/:id', verifyToken, MoveController.schedule)
router.patch('/conclude/:id', verifyToken, MoveController.concludeVisit)

module.exports = router


