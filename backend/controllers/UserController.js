const createUserToken = require('../helpers/create-user-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
  
  static async register(req, res) {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }
    
    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
      return
    }


    if(password.length <6) {
      res.status(422).json({ message: 'A senha deve ter no minimo 6 caracteres!' })
      return
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
      role: "customer"
    })

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatorio' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatorio' })
      return
    }

    // Check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(422).json({ message: 'Não há usuário cadastrado com este e-mail!' })
      return
    }

    // check if password match with db password
    const ckeckPassword = await bcrypt.compare(password, user.password)


    if (!ckeckPassword) {
      res.status(422).json({ message: 'Senha inválida!' })
      return
    }
    await createUserToken(user, req, res)
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {

      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined

    } else {
      currentUser = null
    }
    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id)
    //const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado!',
      })
      return
    }
    res.status(200).json({ user })
  }

  static async editUser(req, res) {
    const id = req.params.id

    //ckeck if user exists
    const token = getToken(req)
    const user = await getUserByToken(token)

    const { name, email, phone, role, password, confirmpassword } = req.body

    if (req.file) {
      user.image = req.file.filename
    }

    //validetions
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }
    user.name = name
    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório!' })
      return
    }

    const userExists = await User.findOne({ email: email })

    //check if email has already taken
    if (user.email !== email && userExists) {
      res.status(422).json({
        message: 'Por favor, ultilize outro email!',
      })
      return
    }
    user.email = email

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }
    user.phone = phone

    if (!role) {
      res.status(422).json({ message: 'O tipo é obrigatório!' })
      return
    }
    user.role = role

    if (!password || !confirmpassword) {
      res.status(422).json({ message: 'Senha nao pode ser vazia!' })
      return
    }

    if(password.length <6) {
      res.status(422).json({ message: 'A senha deve ter no minimo 6 caracteres!' })
      return
    }


    if (password != confirmpassword) {
      res.status(422).json({ message: 'As senhas não conferem!' })
      return
      //change password
    } else if (password == confirmpassword && password != null) {

      // create a password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
    }

    try {
      // return user udadete data

      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res.status(200).json({
        message: 'Usuário atulizado com sucesso!',
      })

    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }


  /***  static async getUserRole(req, res) {
console.log("no metodo");
    if (req.headers.authorization) {

      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)

    } else {
      currentUser = null
    }
    res.status(200).send(currentUser)
  } 
   *  
   */

}

