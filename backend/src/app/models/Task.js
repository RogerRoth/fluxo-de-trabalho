import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        document_link: Sequelize.STRING,
        collaborator_name: Sequelize.STRING,
        collaborator_id: Sequelize.STRING,
        supervisor: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    
    );

    return this;
  }
}

export default Task;
