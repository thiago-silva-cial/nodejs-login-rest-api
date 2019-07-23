import routes from './routes'
import express = require('express')
import bodyparser = require('body-parser')
import cors from 'cors'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  private middlewares (): void {    
    this.express.use(bodyparser.json())
    this.express.use(cors())
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
