import Task from '../models/Task';
import User from '../models/User';

class TaskController {
  async store(req, res){

    const user = await User.findOne({ where: { id: req.userId } });

    const userName = await User.findOne({ where: { id: req.body.collaborator_id } });

    if(user.supervisor != true) {
      return res.status(400).json({ error: 'You do not have enough privileges.'});
    }

    const { description, document_link, collaborator_id, status } = req.body;

    const { id } = await Task.create({
      description,
	    document_link,
      collaborator_name: userName.name,
      collaborator_id,
      supervisor: req.userId,
      status,
    });

    return res.status(200).json({
      id,
      description,
	    document_link,
      collaborator_name: userName.name,
      collaborator_id,
      supervisor: req.userId,
      status,
    });

  }

  async update(req, res) {

    const user = await User.findOne({ where: { id: req.userId } });

    const userCheck = await User.findByPk(req.body.collaborator_id );

    const task = await Task.findOne({ where: { id: req.body.id } });

    if(userCheck.name != req.body.collaborator_name){
      return res.status(400).json({ error: 'Wrong input detected, please check your data.'});
    }

    const { id, description, document_link, collaborator_name, collaborator_id, supervisor, status } = await task.update(
      req.body
    );

    return res.status(200).json({
      id, description, document_link, collaborator_name, collaborator_id, supervisor, status
    });

  }

  async index(req, res) {

    const { task_id, collaborator_id, status } = req.query;

    let tasks = {};

    if(status != "" && collaborator_id != ""){

      tasks = await Task.findAll({
        where: {
          status: status,
          collaborator_id: collaborator_id,
          supervisor: req.userId,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }else if(task_id != "" && collaborator_id == req.userId){

      tasks = await Task.findOne({
        where: {
          id: task_id,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }else if(task_id != ""){

      tasks = await Task.findOne({
        where: {
          id: task_id,
          supervisor: req.userId,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }else if(collaborator_id == req.userId){

      tasks = await Task.findAll({
        where: {
          collaborator_id: collaborator_id,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }else if(collaborator_id != "" && collaborator_id != req.userId){

      tasks = await Task.findAll({
        where: {
          collaborator_id: collaborator_id,
          supervisor: req.userId,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }else if(status != ""){

      tasks = await Task.findAll({
        where: {
          status: status,
          supervisor: req.userId,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }else if(collaborator_id != req.userId){

      tasks = await Task.findAll({
        where: {
          supervisor: req.userId,
        },
        attributes: ['id', 'description', 'document_link', 'collaborator_name', 'collaborator_id', 'status'],
        order: ['id'],
      });

    }

    return res.json(tasks);

  }

  async delete(req, res) {
    
    const { task_id } = req.params;

    const user = await User.findOne({ where: { id: req.userId } });

    if(user.supervisor != true) {
      return res.status(400).json({ error: 'You do not have enough privileges.'});
    }

    await Task.destroy({ where: { id: task_id } });

    return res.status(204).send();
    
  }
}

export default new TaskController();