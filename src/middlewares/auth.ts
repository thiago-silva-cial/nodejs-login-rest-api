import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/config'

export default (req: Request, res: Response, next: NextFunction): Response => {
  const authHeader = req.headers.authorization

  // Verifica se existe um token
  if (!authHeader) return res.status(401).json({ mensagem: 'Token inválido' })

  const parts = authHeader.split(' ')

  if (parts.length !== 2) return res.status(401).json({ mensagem: 'Token inválido' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ mensagem: 'Token inválido' })

  jwt.verify(token, jwtSecret, async (err, decoded): Promise<any> => {
    if (err) {
      return res.status(401).json({ mensagem: `${(err.name === 'TokenExpiredError') ? 'Sessão inválida' : 'Não autorizado'}` })
    }

    // Valida o tempo limite da sessão
    // TO DO: Recusar a sessão se aberta por mais de 30 minutos

    // Token válido
    req['token'] = token
    next()
  })
}
