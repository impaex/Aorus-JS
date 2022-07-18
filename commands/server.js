const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Allows admins to change the serverlist!')
		.addSubcommand(subcommand =>
			subcommand
			.setName('add')
			.setDescription('Add a server to the server list.')
			)
		.addSubcommand(subcommand =>
			subcommand
			.setName('remove')
			.setDescription('Remove a server from the serverlist.')
			)
		.addSubcommand(subcommand =>
			subcommand
			.setName('edit')
			.setDescription('Edit a server from the server list.')
			),
	async execute(interaction) {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};