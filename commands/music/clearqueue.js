const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "clearqueue",
	category: "Music",
	description: "Clear Queue",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	async execute(client, interaction, args) {
  
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		player.queue.clear();

		const emojieject = interaction.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(interaction.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Removed all songs from the queue`);
			  return interaction.editReply({embeds: [thing]});
	}
}; 