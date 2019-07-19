import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/', UserController.SignUp)

export default routes
