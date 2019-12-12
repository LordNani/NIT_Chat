const Sequelize = require("sequelize");

const sequelize = new Sequelize('main_schema', 'admin', 'minecraftdelta', {
    dialect: "mysql",
    host: "database-chat-mysql.czyhpes6bql6.eu-west-3.rds.amazonaws.com",
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