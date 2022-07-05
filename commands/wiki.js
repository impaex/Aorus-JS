const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Search the official ARK wiki!')
        .addStringOption(option =>
            option.setName('terms')
                .setDescription('Type what you want to know from the wiki.')
                .setRequired(true)
            ),
	async execute(interaction) {
        const searchTerms = interaction.options.getString('terms');
		await interaction.reply(searchTerms);
	},
};