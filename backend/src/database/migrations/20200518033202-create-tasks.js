module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      document_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      collaborator_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      collaborator_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      supervisor: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('tasks');
  }
};
