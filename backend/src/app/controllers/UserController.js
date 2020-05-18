import User from '../models/User';
import generateUniqueId from '../../utils/generateUniqueId';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if(userExists) {
      return res.status(400).json({ error: 'User already exists. '});
    }

    const { name, email, password, supervisor } = req.body;

    const id = generateUniqueId();

    await User.create({
      id,
      name, 
      email, 
      password, 
      supervisor
    });


    return res.status(200).json({
      id, name, email, supervisor
    });
  }
}

export default new UserController();
