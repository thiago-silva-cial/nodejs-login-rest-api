import routes from './routes'
import express = require('express')
import bodyparser = require('body-parser')

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(bodyparser.json())
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
