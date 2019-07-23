import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.post('/user/signup', UserController.SignUp)

export default routes
