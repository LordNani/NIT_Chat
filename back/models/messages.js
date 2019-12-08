const sequelize = require('../config/sequelize.config');
const Sequelize = require('sequelize');

const Messages = sequelize.define('messages', {
    message_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    author: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    send_time: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Messages