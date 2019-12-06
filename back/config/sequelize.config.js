const Sequelize = require("sequelize");

if (process.env.NODE_ENV === 'development') {
    const sequelize = new Sequelize('your db name', 'your db user', 'your db password', {
        dialect: "your db type eg postgres, mysql",
        protocol: "same ad above",
        ssl: false,
        logging:  true,
      
      pool: {
          max: 20,
          min: 0,
          idle: 5000
      }
      });
} else {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "db type",
        protocol: "db type",
        ssl: false,
        logging:  false,
      
          pool: {
              max: 20,
              min: 0,
              idle: 5000
          }
      });
}

module.exports = sequelize;