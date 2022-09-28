const Sequelize = require('sequelize');
// don't need to save 'dotenv' to variable, just need to execute since all of this data is already
// in .env file and will be made available at `process.env.<ENVIRONMENT-VARIABLE-NAME>`
require('dotenv').config();

// create connection to db, pass MySQL information for user and pass
// const sequelize = new Sequelize('just_tech_news_db', 'MySQLusername', 'MySQLpassword', {
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
    });

module.exports = sequelize;