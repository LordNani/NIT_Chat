const sequelize = require('../config/sequelize.config');
const Sequelize = require('sequelize');

const Users = sequelize.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    login: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = Users