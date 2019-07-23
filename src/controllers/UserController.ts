import { Request, Response } from 'express'
import User from '../models/user'
import * as bcrypt from 'bcryptjs'

class UserController {
  public async SignUp (req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) return res.status(400).json({ mensagem: 'E-mail já existente' })

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

    // Busca o usuário
    const user = await User.findOne({ email }).select('+senha')

    // Verifica se o usuário existe pelo e-mail
    if (!user) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' })

    // Valida a senha
    if (!bcrypt.compareSync(senha, user.senha)) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' })

    // Atualiza o último login do usuário
    user.set('ultimoLogin', Date.now()).save()

    // Usuário logado com sucesso
    return res.json({
      id: user.id,
      dataCriacao: user.dataCriacao,
      dataAtualizacao: user.dataAtualizacao,
      ultimoLogin: user.ultimoLogin,
      token: user.generateToken()
    })
  }

  public async Index (req: Request, res: Response): Promise<Response> {
    const userId = req.params.user_id

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
