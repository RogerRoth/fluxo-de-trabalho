import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionControler {
  async store(req,res) {
    const {email, password} = req.body;

    const user = await User.findOne({ where: { email } });

    if(!user) {
      return res.status(401).json({ error: 'Invalid credentials please try again.' });
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Invalid credentials please try again.' })
    }

    const { id, name, supervisor, team_id } = user;

    console.log(user.team_id)
    return res.json({
      user: {
        id,
        name,
        email,
        supervisor,
        team_id,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    })

  }
}

export default new SessionControler();
