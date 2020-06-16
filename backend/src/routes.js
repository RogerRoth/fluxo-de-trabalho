import { Router } from 'express';
import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionControler';
import TeamController from './app/controllers/TeamController';
import TaskController from './app/controllers/TaskController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); //Novos usuários
routes.post('/sessions', SessionController.store); //Cria session para login

routes.use(authMiddleware); // Responsavel por fazer a autenticação, só passa daqui se estiver logado

routes.put('/team', TeamController.update);
routes.get('/teamMembers', TeamController.index);

routes.post('/taskNew', TaskController.store);
routes.put('/taskUpdate', TaskController.update);
routes.get('/tasks', TaskController.index);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;
