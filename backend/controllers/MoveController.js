const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Move = require("../models/Move")

module.exports = class MoveController {
    //create a move

    static async create(req, res) {
        
        const {nameImovel, tipo, preco, descricao, cep, rua, numero, complemento, bairro, cidade, estado} = req.body
        const {name, email, phone, password } = req.body
        const images = req.files
        console.log(images);
        const available = true
        
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
        if(!cep) {
            res.status(422).json({message: "o CEP e obrigatorio!" })
            return
        }

        if(!rua) {
            res.status(422).json({message: "A rua e obrigatorio!" })
            return
        }

        if(!numero) {
            res.status(422).json({message: "O numero e obrigatorio!" })
            return
        }

        if(!complemento) {
            res.status(422).json({message: "O complemento e obrigatorio!" })
            return
        }

        if(!bairro) {
            res.status(422).json({message: "O bairro e obrigatorio!" })
            return
        }
        if(!cidade) {
            res.status(422).json({message: "A cidade e obrigatorio!" })
            return
        }
        if(!estado) {
            res.status(422).json({message: "A estado e obrigatorio!" })
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
      role: "owner",
      image: ''
    })

    images.image.map((item) => {
        user.image= item.filename
    })
        //create move
        const move = new Move({
            name: nameImovel,
            tipo,
            preco,
            descricao,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
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
            const newUser = await user.save()
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
        
        const moves = await Move.find({'renter._id': user._id}).sort('-createdAt')
        res.status(200).json({
            moves,
        })
    }

    static async getAdminImoveis(req, res) {

        //get user from token
        const token = getToken(req)
        const user  = await getUserByToken(token)
        
        const moves = await Move.find({'user._id': user._id}).sort('-createdAt')
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

    
    static async removeRenterById(req, res) {
        const id = req.params.id
        const updatedData = {}

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
            updatedData = {
                name: move.name,
                tipo: move.tipo,
                preco: move.preco,
                cep: move.cep,
                rua: move.rua,
                numero: move.numero,
                complemento: move.complemento,
                bairro: move.bairro,
                cidade: move.cidade,
                estado: move.estado,
                descricao: move.descricao,
                images: move.images,
                renter: {},
                user: move.user,
                available: move.available,
                }


            return
        }

        await Move.findByIdAndUpdate(id, updatedData)
        res.status(200).json({message: "Agendamento removido com sucesso!"})
    }

    static async updateMove (req, res) {
        console.log(req.body);
        const id = req.params.id
        const {name, tipo, preco, cep, rua, numero, complemento, bairro, cidade, estado, descricao, available } = req.body
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
        if(!name) {
            res.status(422).json({message: "O nome do imovel e obrigatorio!" })
            return
        } else {
            updatedData.name = name
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

        if(!cep) {
            res.status(422).json({message: "O cep e obrigatorio!" })
            return
        } else {
            updatedData.cep = cep
        }

        if(!rua) {
            res.status(422).json({message: "A rua e obrigatorio!" })
            return
        } else {
            updatedData.rua = rua
        }

        if(!numero) {
            res.status(422).json({message: "A rua e obrigatorio!" })
            return
        } else {
            updatedData.numero = numero
        }

        if(!complemento) {
            res.status(422).json({message: "O complemento e obrigatorio!" })
            return
        } else {
            updatedData.complemento = complemento
        }

        if(!bairro) {
            res.status(422).json({message: "O bairro e obrigatorio!" })
            return
        } else {
            updatedData.bairro = bairro
        }

        if(!cidade) {
            res.status(422).json({message: "A cidade e obrigatorio!" })
            return
        } else {
            updatedData.cidade = cidade
        }

        if(!estado) {
            res.status(422).json({message: "O estado e obrigatorio!" })
            return
        } else {
            updatedData.estado = estado
        }
        
        if(!descricao) {
            res.status(422).json({message: "A descrição e obrigatorio!" })
            return
        } else {
            updatedData.descricao = descricao
        }
        
        if(images.length > 0) {
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
        if(move.renter) {
            if(move.renter._id.equals(user._id)) { 
            res.status(422).json({message: 'Vocẽ já agendou uma visita para esse imovel!',
            })
            return
            }
        }

        //add user to imovel
        move.renter = {
            _id: user._id,
            name: user.name,
            phone: user.phone
        }

        // Recupera informações do proprietário
        //const owner = await User.findOne({ _id: move.user._id });

        await Move.findByIdAndUpdate(id, move)

      // res.status(200).json({
          //  message: `A visita foi agendada com sucesso, entre em contato com ${owner.name} pelo telefone ${owner.phone} `,
          //  ownerInfo: {
              //  name: owner.name,
               // phone: owner.phone,
            //},
           //  Retorna as informações do proprietário
            res.status(200).json({
                message: `A visita foi agendada com sucesso, entre em contato com ${move.user.name} pelo telefone ${move.user.phone} `
       //})
        });
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

    static async addImovel(req, res) {

        const {nameImovel, tipo, preco, cep, rua, numero, complemento, bairro, cidade, estado, descricao } = req.body
        const images = req.files
        const available = true

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


        if(!cep) {
            res.status(422).json({message: "O CEP e obrigatorio!" })
            return
        }

        if(!rua) {
            res.status(422).json({message: "A rua e obrigatorio!" })
            return
        }

        if(!numero) {
            res.status(422).json({message: "O numero e obrigatorio!" })
            return
        }

        if(!complemento) {
            res.status(422).json({message: "O complemento e obrigatorio!" })
            return
        }

        if(!bairro) {
            res.status(422).json({message: "O bairro e obrigatorio!" })
            return
        }

        if(!cidade) {
            res.status(422).json({message: "A cidade e obrigatorio!" })
            return
        }

        if(!estado) {
            res.status(422).json({message: "O estado e obrigatorio!" })
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

        // images.map((item) => {
        //     user.image= item.filename
        // })

        const token = getToken(req)
        const user  = await getUserByToken(token)

        //create move
        const move = new Move({
            name: nameImovel,
            tipo,
            preco,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
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
                message: 'imovel cadastrado',
                newMove,
            })

        } catch(error) {
            res.status(500).json({message: error})
        }
    }
}


