const Sequelize = require('sequelize');

module.exports = sequelize.define('servers', {
	ip: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	port: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	name: Sequelize.TEXT,
	tamingRate: Sequelize.INTEGER,
	breedingRate: Sequelize.INTEGER,
	harvestRate: Sequelize.INTEGER,
	XPRate: Sequelize.INTEGER,
	weekendTamingRate: Sequelize.INTEGER,
	weekendBreedingRate: Sequelize.INTEGER,
	weekendHarvestRate: Sequelize.INTEGER,
	WeekendXPRate: Sequelize.INTEGER,
})