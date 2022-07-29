const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

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
	async execute(interaction, Servers) {
		if (interaction.options.getSubcommand() === 'add') {
			const modal = new ModalBuilder()
				.setCustomId('serverAdd')
				.setTitle('Add a Server');
			
			const ipInput = new TextInputBuilder()
				.setCustomId('ipInput')
				.setLabel('The server\'s IP (ip:queryport):')
				.setStyle(TextInputStyle.Short);

			
			const tamingInput = new TextInputBuilder()
				.setCustomId('tamingInput')
				.setLabel('The server\'s taming multiplier:')
				.setStyle(TextInputStyle.Short);


			const breedingInput = new TextInputBuilder()
				.setCustomId('breedingInput')
				.setLabel('The server\'s breeding multiplier:')
				.setStyle(TextInputStyle.Short);
			
			
			const harvestInput = new TextInputBuilder()
				.setCustomId('harvestInput')
				.setLabel('The server\'s harvest multiplier:')
				.setStyle(TextInputStyle.Short);
			

			const xpInput = new TextInputBuilder()
				.setCustomId('xpInput')
				.setLabel('The server\'s xp multiplier:')
				.setStyle(TextInputStyle.Short);	
			

			const firstActionRow = new ActionRowBuilder().addComponents([ipInput]);
			const thirdActionRow = new ActionRowBuilder().addComponents([tamingInput]);
			const fifthActionRow = new ActionRowBuilder().addComponents([breedingInput]);
			const seventhActionRow = new ActionRowBuilder().addComponents([harvestInput]);
			const ninethActionRow = new ActionRowBuilder().addComponents([xpInput]);

			modal.addComponents([firstActionRow, thirdActionRow, fifthActionRow, seventhActionRow, ninethActionRow]);

			await interaction.showModal(modal);
		}
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};