const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Move = require("../models/Move")

module.exports = class MoveController {
    //create a move
    

    static async create(req, res) {
        
        const {nameImovel, tipo, preco, descricao } = req.body
        const {name, email, phone, password } = req.body
        const images = req.files
        const available = true

        //images upload
        
        //validation
        if(!nameImovel) {
            res.status(422).json({message: "O nome do imovel e obrigatorio!" })
            return
        }

        if(!tipo) {
            res.status(422).json({message: "O tipo e obrigatorio!" })
            return
        }

        if(!preco) {
            res.status(422).json({message: "O preço e obrigatorio!" })
            return
        }

        if(!descricao) {
            res.status(422).json({message: "A descrição e obrigatorio!" })
            return
        }

        if(images.length === 0) {
            res.status(422).json({message: "A imagem e obrigatorio!" })
            return
        }

        //get move owner
        // const token = getToken(req)
        // const user = await getUserByToken(token)

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    })

        //create move
        const move = new Move({
            name,
            tipo,
            preco,
            descricao,
            available,
            images:[],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        })

        images.images.map((image) => {
            move.images.push(image.filename)
        })

        try {
            const newMove = await move.save()
            res.status(201).json({
                message: 'imoveis cadastro',
                newMove,
            })

        } catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res) {
        const moves = await Move.find().sort('-createdAt')

        res.status(200).json({
            moves: moves,
        })
    }

    static async getAllUserMoves(req, res) {

        //get user from token
        const token = getToken(req)
        const user  = await getUserByToken(token)
        
        const moves = await Move.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            moves,
        })
    }

    static async getAllImoveloptions(req, res) {

        //get user from token
        const token = getToken(req)
        const user  = await getUserByToken(token)
        
        const moves = await Move.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({
            moves,
        })
    }

    static async getMoveById(req, res) {
        const id = req.params.id

        // check if id valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: "ID inválido!" })
            return
        }

        //check if move exists
        const move = await Move.findOne({_id: id})

        if(!move) {
            res.status(404).json({message: 'Imovel não encontrado!'})
        }

        res.status(200).json({
            move: move,
        })
    }

    static async removeMoveById(req, res) {
        const id = req.params.id

            // check if id valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: 'ID inválido!'})
        }

        //check if move exists
        const move = await Move.findOne({_id: id})

        if(!move) {
            res.status(404).json({message: 'Imovel não encontrado!'})
            return
        }

        //check if loggerd in user registered moves
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(move.user._id.toString() !== user._id.toString()) {
            res.status(422).json({message: 'Problema na solicitação, tente novamente mais tarde!'
            })
            return
        }

        await Move.findByIdAndRemove(id)
        res.status(200).json({message: "Imovel removido com sucesso!"})
    }

    static async updateMove (req, res) {
        const id = req.params.id
        const {imovel, tipo, preco, descricao, available } = req.body
        const images = req.files
        const updatedData = {}

        //check if move exists
        const move = await Move.findOne({_id: id})
        if(!move) {
            res.status(404).json({message: 'Imovel não encontrado!'})
            return
        }

        //check if loggerd in user registered moves
        const token = getToken(req)
        const user = await getUserByToken(token)
        
        if(move.user._id.toString() !== user._id.toString()) {
            res.status(422).json({message: 'Problema na solicitação, tente novamente mais tarde!'
            })
            return
        }

        //validation
        if(!imovel) {
            res.status(422).json({message: "O nome do imovel e obrigatorio!" })
            return
        } else {
            updatedData.imovel = imovel
        }
        
        if(!tipo) {
            res.status(422).json({message: "O tipo e obrigatorio!" })
            return
        }else {
            updatedData.tipo = tipo
        }
        
        if(!preco) {
            res.status(422).json({message: "O preço e obrigatorio!" })
            return
        } else {
            updatedData.preco = preco
        }
        
        if(!descricao) {
            res.status(422).json({message: "A descrição e obrigatorio!" })
            return
        } else {
            updatedData.descricao = descricao
        }
        
        if(images.length === 0) {
            res.status(422).json({message: "A imagem e obrigatorio!" })
            return
        } else {
            updatedData.images = []
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        await Move.findByIdAndUpdate(id, updatedData)
        res.status(200).json({message: "Imovel atualizado com sucesso!" })
    }

    static async schedule(req, res) {
        const id = req.params.id

        //check if move exists
        const move = await Move.findOne({_id: id})
        if(!move) {
            res.status(404).json({message: 'Imovel não encontrado!'})
            return
        }

        //check if user registered the imovel
        const token = getToken(req)
        const user = await getUserByToken(token)
                
        if(move.user._id.equals(user._id)) {
            res.status(422).json({message: 'Vocẽ não pode agendar uma visita com o seu próprio imovel!'
            })
            return
        }

        //check if user has already schedule a visit imovel
        if(move.adopter) {
            if(move.adopter._id.equals(user._id)) { 
            res.status(422).json({message: 'Vocẽ já agendou uma visita para esse imovel!',
            })
            return
            }
        }

        //add user to imovel
        move.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Move.findByIdAndUpdate(id, move)

        res.status(200).json({
            message: `A visita foi agendada com sucesso, entre em contato com ${move.user.name} pelo telefone ${move.user.phone} `
        })
    }

    static async concludeVisit(req, res) {
        const id = req.params.id

        //check if move exists
        const move = await Move.findOne({_id: id})
        if(!move) {
            res.status(404).json({message: 'Imovel não encontrado!'})
            return
        }

        //check if loggerd in user registered moves
        const token = getToken(req)
        const user = await getUserByToken(token)
                
        if(move.user._id.toString() !== user._id.toString()) {
            res.status(422).json({message: 'Problema na solicitação, tente novamente mais tarde!'
            })
            return
        }

        move.available = false
        await Move.findByIdAndUpdate(id, move)
        
        res.status(200).json({
            message: 'Parabéns! o agendamento foi finalizado com sucesso!',
        })
    }
}


