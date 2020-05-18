module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      supervisor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      team_id: {
        type: Sequelize.STRING,
        defaultValue: null,
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
    return queryInterface.dropTable('users');
  }
};
