const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Servers = require('./models/Servers.js')(sequelize, Sequelize.DataTypes);
// Any associations you apply here.

module.exports = { Servers };
