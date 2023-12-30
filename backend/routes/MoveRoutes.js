const router = require('express').Router()

const MoveController = require('../controllers/MoveController')


//Middlewares
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')


router.post('/create',verifyToken, imageUpload.array('images'), MoveController.create)
router.get('/', MoveController.getAll)
router.get('/mymoves', verifyToken, MoveController.getAllUserMoves)
router.get('/myimoveloptions', verifyToken, MoveController.getAllImoveloptions)
router.get('/:id', MoveController.getMoveById)
router.delete('/:id', verifyToken, MoveController.removeMoveById)
router.patch('/:id', verifyToken, imageUpload.array('images'), MoveController.updateMove)

router.patch('/schedule/:id', verifyToken, MoveController.schedule)
router.patch('/conclude/:id', verifyToken, MoveController.concludeVisit)


module.exports = router
