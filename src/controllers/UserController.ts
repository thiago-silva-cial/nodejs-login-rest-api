import { Request, Response } from 'express'
import User from '../models/user'
import mongoose = require('mongoose')

class UserController {
  public async SignUp(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) return res.status(400).json({ mensagem: 'E-mail já existente' })

      const user = await User.create(req.body)

      return res.json({
        id: user.id,
        data_criacao: user.dataCriacao,
        data_atualizacao: user.dataAtualizacao,
        ultimo_login: user.ultimoLogin,
        token: user.generateToken()
      })
    } catch (error) {
      return res.status(400).json({ mensagem: 'Falha ao tentar cadastrar o usuário' })
    }
  }
}

export default new UserController()
