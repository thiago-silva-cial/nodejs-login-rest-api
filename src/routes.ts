import { Router } from 'express'
import UserController from './controllers/UserController'
import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/user/signup', UserController.SignUp)

routes.post('/user/signin', UserController.SignIn)

routes.get('/user/:user_id', authMiddleware, UserController.Index)

export default routes
