const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sl')
		.setDescription('Shows the server\'s statuses!'),
	async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nProfile Picture: ${interaction.user.avatarURL()}`);
	},
};