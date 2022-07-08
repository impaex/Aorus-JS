const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');

// Initialize dotenv
dotenv.config();

module.exports = function customEmbed(title, description, color="#0099ff", url="") {

    const Embed = new MessageEmbed()
	.setColor(color)
	.setTitle(title)
	.setURL(url)
	.setDescription(description)
	.setTimestamp()
	.setFooter({ text: `${process.env.EMBED_FOOTER_TEXT}` });

    return Embed;
};
