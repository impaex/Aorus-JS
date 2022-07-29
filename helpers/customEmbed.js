const { EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');

// Initialize dotenv
dotenv.config();

module.exports = function customEmbed(title, description, color="#0099ff", url="", author={name: "", iconURL: "", url: ""}) {

    const Embed = new EmbedBuilder()
	.setColor(color)
	.setTitle(title)
	.setURL(url)
	.setAuthor(author)
	.setDescription(description)
	.setTimestamp()
	.setFooter({ text: `${process.env.EMBED_FOOTER_TEXT}` });

    return Embed;
};
