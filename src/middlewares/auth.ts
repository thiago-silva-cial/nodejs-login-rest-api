import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/config'

export default (req: Request, res: Response, next: NextFunction): Response => {
  // Get header authorization from HTTP Request
  const authHeader = req.headers.authorization

  // Verifica se existe um token
  if (!authHeader) return res.status(401).json({ mensagem: 'Token inválido' })

  // Create an array with the word and token
  const parts = authHeader.split(' ')

  // Verify the token schema
  if (parts.length !== 2) return res.status(401).json({ mensagem: 'Token inválido' })

  // unstructuring array into two variables
  const [scheme, token] = parts

  // Make sure that the word Bearer it's present on header auth
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ mensagem: 'Token inválido' })

  // JWT verification
  jwt.verify(token, jwtSecret, async (err, decoded): Promise<any> => {
    if (err) {
      return res.status(401).json({ mensagem: `${(err.name === 'TokenExpiredError') ? 'Sessão inválida' : 'Não autorizado'}` })
    }

    // Token válido
    req['token'] = token
    // Move to the controller action
    next()
  })
}
