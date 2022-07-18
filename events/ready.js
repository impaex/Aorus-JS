const Servers = require("../db/Servers");

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		Servers.sync();
		console.log("Synced the Servers database.");
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};