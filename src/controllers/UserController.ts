import { Request, Response } from 'express'
import User from '../models/user'
import * as bcrypt from 'bcryptjs'

class UserController {
  public async SignUp (req: Request, res: Response): Promise<Response> {
    // Get user e-mail from http body
    const { email } = req.body

    try {
      // Check if the e-mail already exists
      if (await User.findOne({ email })) return res.status(400).json({ mensagem: 'E-mail já existente' })

      // get the user doc from Mongo atlas
      const user = await User.create(req.body)

      return res.json({
        id: user.id,
        dataCriacao: user.dataCriacao,
        dataAtualizacao: user.dataAtualizacao,
        ultimoLogin: user.ultimoLogin,
        token: user.generateToken()
      })
    } catch (error) {
      return res.status(400).json({ mensagem: 'Falha ao tentar cadastrar o usuário' })
    }
  }

  public async SignIn (req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body

    // get the user doc from Mongo atlas
    const user = await User.findOne({ email }).select('+senha')

    // Verify if it's an existant user
    if (!user) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' })

    // Verify if the passed password matchs the saved password
    if (!bcrypt.compareSync(senha, user.senha)) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' })

    // Update last user login
    user.set('ultimoLogin', Date.now()).save()

    // User has been logged sucessfuly
    return res.json({
      id: user.id,
      dataCriacao: user.dataCriacao,
      dataAtualizacao: user.dataAtualizacao,
      ultimoLogin: user.ultimoLogin,
      token: user.generateToken()
    })
  }

  public async Index (req: Request, res: Response): Promise<Response> {
    // Get the user id from URL PARM
    const userId = req.params.user_id

    // get the user doc from Mongo atlas
    let user = await User.findById(userId)

    return res.json({
      id: user.id,
      dataCriacao: user.dataCriacao,
      dataAtualizacao: user.dataAtualizacao,
      ultimoLogin: user.ultimoLogin,
      token: req['token']
    })
  }
}

export default new UserController()
