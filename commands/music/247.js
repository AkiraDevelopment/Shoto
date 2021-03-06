const { MessageEmbed } = require("discord.js");

module.exports = {

	name: "247",
	category: "Music",
	description: "24/7 in voice channel",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	async execute(client, interaction, args) {

		const embed = new MessageEmbed()
		.setColor(client.embedColor);

		const player = interaction.client.manager.players.get(interaction.guild.id);
		if (player.twentyFourSeven) {
			player.twentyFourSeven = false;
			embed.setDescription(`24/7 mode is now off.`);
		}
		else {
			player.twentyFourSeven = true;
			embed.setDescription(`24/7 mode is now on.`);
		}
		return interaction.editReply({embeds: [embed]});
	}
}; 