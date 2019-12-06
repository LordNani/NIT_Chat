const Sequelize = require("sequelize");

const sequelize = new Sequelize('main_schema', 'root', 'TheDelta28super', {
    dialect: "mysql",
    host: "localhost",
    ssl: false,
    logging:  console.log,
    
    pool: {
        max: 20,
        min: 0,
        idle: 5000
    },

    define: {
        timestamps: false
    }
});

module.exports = sequelize;