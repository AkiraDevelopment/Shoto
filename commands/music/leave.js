const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "leave",
	category: "Music",
	description: "Leave voice channel",
	player: false,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	async execute(client, interaction, args) {
       
		const player = interaction.client.manager.get(interaction.guild.id);

		const emojiLeave = interaction.client.emoji.leave;

		player.destroy();
        
		let thing = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setDescription(`${emojiLeave} **Left the voice channel**\nThank you for using ${interaction.client.user.username}!`);
		return interaction.editReply({embeds: [thing]});
	
	}
}; 