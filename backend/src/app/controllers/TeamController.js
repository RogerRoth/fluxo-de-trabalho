import User from '../models/User';
import Task from '../models/Task';

class TeamController {
  async update(req, res) {
    const { super_id, user_id, add } = req.body;

    const userExists = await User.findOne({ where: { id: user_id } });
    const supervisorExists = await User.findOne({ where: { id: super_id } });

    if(!userExists) {
      return res.status(400).json({ error: 'User does not exist.'});
    }

    if(userExists.team_id != null && add == true) {
      return res.status(400).json({ error: 'User is already part of a team.'});
    }

    if(!supervisorExists) {
      return res.status(400).json({ error: 'Supervisor does not exist.'});
    }

    if(supervisorExists.supervisor == false) {
      return res.status(400).json({ error: 'You do not have enough privileges'});
    }

    const user = await User.findByPk(user_id);

    if(user.supervisor == true){
      return res.status(400).json({ error: 'You cannot add a supervisor as a team member'});
    }

    if(add == true){
      const { id, name, email } = await user.update(
        { team_id: super_id }
      );

      return res.status(200).json({
        id, name, email
      });
    }else{ //Remove user from team

      const userTasks = await Task.findAll({ where: { collaborator_id: user_id } });

      if(userTasks.length > 0){
        await Task.update({ collaborator_name: '', collaborator_id: '', status: 'Pendente' },{ where: { collaborator_id: user_id } })
      }

      const { id } = await user.update(
        { team_id: null }
      );

      return res.status(200).json({
        id,
      });
    }

  }

  async index(req, res) {

    const user = await User.findByPk(req.userId);

    if(user.supervisor == false) {
      return res.status(400).json({ error: 'You do not have enough privileges'});
    }

    const members = await User.findAll({
      where: {
        team_id: req.userId,
      },
      attributes: ['id', 'name', 'email'],
      order: ['name'],
    });

    return res.json(members);

  }
}

export default new TeamController();
