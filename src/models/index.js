const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '12012004',
  database: 'crud_csv',
  dialectOptions: {
    charset: 'utf8mb4',  
  },
});


sequelize.authenticate()
  .then(() => console.log('Connection established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = { sequelize };  
