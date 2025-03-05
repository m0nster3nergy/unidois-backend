require('dotenv').config(); // This loads the environment variables
// db.js
const { Sequelize } = require('sequelize');

// Set up a connection to your PostgreSQL database
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  logging: false, // set to true to see the raw SQL queries
});

module.exports = sequelize;
