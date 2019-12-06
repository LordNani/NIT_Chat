const sequelize = require('../config/sequelize.config');
const Sequelize = require('sequelize');

//creating table with 
const Messages = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    from: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    to: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Messages