// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

// Initialize dotenv
dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Initiate database
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

// Assign models
const Servers = sequelize.define('servers', {
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

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Runs commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);