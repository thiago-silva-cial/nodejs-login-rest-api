import { Request, Response } from 'express'

class HelloController {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.json({ Hello: 'World' })
  }
}

export default new HelloController()
