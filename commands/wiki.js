const { SlashCommandBuilder } = require('discord.js');
const customEmbed = require('../helpers/customEmbed');
const truncateString = require('../helpers/truncateString');
const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');

// Initialize dotenv
dotenv.config();

const _ = undefined;
const domainName = "https://ark.wiki.gg";
const dododexDomainName = "https://www.dododex.com";

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

        // await interaction.deferReply();

        // TODO: Create input sanitizer.
        axios.get(`${domainName}/index.php?search=${searchTerms}`)
            .then(async function (response) {

                const $ = cheerio.load(response.data);

                // If search query doesn't directly find page, send list.
                if (response.request.path.includes("\index.php?search")) {
                    const embed = customEmbed(title="Page not found", 
                        description="We couldn't find the page you're looking for, please choose an option from the list below.", _, _,
                        author={ name: "Wiki Command" });

                    await interaction.reply( {embeds: [embed]} );
                }

                else {
                    const pageTitle = $("#firstHeading").text();
                    const panel = $(".info-arkitex.info-framework div");
                    const thumbnailURL = panel.find('img').attr('src');
                    const entityType = $(".info-unit-caption").first().text();

                    const embed = customEmbed(title=`${pageTitle}`,
                        description="yessiirr", _, url=(domainName + response.request.path),
                        author={name: "Wiki Command"});
                    
                    embed.setThumbnail(`${domainName}${thumbnailURL}`);

                    if (entityType === "Creature") {
                        // Replace existing description with start of dino dossier.
                        const dossierText = truncateString($(".dossier-background").find("p").eq(4).text().trim(), 175);
                        embed.setDescription(dossierText);

                        const temperament = $(".info-X2-60").eq(2).text().trim();
                        const rideable = $(".info-X3-33").eq(10).text().trim();
                        const equipment = $();
                        const riderWeaponry = $();

                        embed.addFields({ name: "Stats", value: `Temperament: **${temperament}**\nRideable: **${rideable}**`, inline: true} );

                        const tamable = $(".info-arkitex-left.info-X3-33").eq(3).text().trim() === 'Yes'? true : false;
                        if (tamable) {
                            // TODO: Make it find relative to the tab. Or use contains jquery selector.
                            const tamingMethod = $(".info-X2-60").eq(5).text().trim();
                            const preferredKibble = $(".info-X2-60").eq(6).text().trim();
                            const preferredFood = $(".info-X2-60").eq(7).text().trim();

                            embed.addFields({ name: "Taming", value: `Taming method: **${tamingMethod}**\nPreferred Kibble: **${preferredKibble}**\nPreferred food: **${preferredFood}**\n\nClick [here](${dododexDomainName + "/taming/" + pageTitle.toLowerCase()}) to go to Dododex page ()`, inline: true});
                        }
                        else {
                            embed.addFields({ name: "Taming", value: "This creature is not tamable.", inline: true });
                        }

                        const breedable = $(".info-X3-33").eq(10).text().trim() === 'Yes'? true : false;
                        if (breedable) {
                            // TODO: Make it find relative to the tab. Or use contains jquery selector.
                            const incubationTemperature = $(".info-arkitex-right.info-X2-60").eq(22).text().split("/")[0].trim();
                            // Splits the incubater temperature from normal temperature, then splits out the Celsius from Fahrenheit.
                            const incubaterTemperature = $(".info-arkitex-right.info-X2-60").eq(22).text().split(":")[1].split("/")[0].trim();

                            embed.addFields({ name: "Breeding", value: `Incubation temperature: **${incubationTemperature}**\nIncubation with [Egg Incubator](https://ark.wiki.gg/wiki/Egg_Incubator): **${incubaterTemperature}**`, inline: true});
                        }
                        else {
                            embed.addFields({ name: "Breeding", value: "This creature is not breedable.", inline: true });
                        }
                        await interaction.reply( {embeds: [embed]} );
                    }
                }
            })
            .catch(async function (error) {
                console.log(error)
                await interaction.reply(`An error occurred when looking up \`${searchTerms}\` on the wiki.`);
            })
		
	},
};