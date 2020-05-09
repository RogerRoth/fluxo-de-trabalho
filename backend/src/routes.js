import { Router } from 'express';
import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionControler';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); //Novos usuários
routes.post('/sessions', SessionController.store); //Cria session para login

routes.use(authMiddleware); // Responsaver por fazer a autenticação, só passa daqui se estiver logado

routes.put('/users', UserController.update);

export default routes;
