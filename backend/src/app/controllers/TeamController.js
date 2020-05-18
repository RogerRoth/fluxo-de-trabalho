import User from '../models/User';

class TeamController {
  async update(req, res) {
    const { super_id, user_id, add } = req.body;

    const userExists = await User.findOne({ where: { id: user_id } });
    const supervisorExists = await User.findOne({ where: { id: super_id } });

    if(!userExists) {
      return res.status(400).json({ error: 'User does not exist.'});
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
    }else{
      const { id } = await user.update(
        { team_id: null }
      );

      return res.status(200).json({
        id
      });
    }

  }

  async index(req, res) {

    const user = await User.findByPk(req.body.id);

    if(user.supervisor == false) {
      return res.status(400).json({ error: 'You do not have enough privileges'});
    }

    const members = await User.findAll({
      where: {
        team_id: req.body.id,
      },
      attributes: ['id', 'name', 'email'],
      order: ['name'],
    });

    return res.json(members);

  }
}

export default new TeamController();
