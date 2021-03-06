const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "shuffle",
	category: "Music",
	description: "Shuffle queue",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	async execute(client, interaction, args) {
    
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}


		player.queue.shuffle();
        
		const emojishuffle = interaction.client.emoji.shuffle;

		let thing = new MessageEmbed()
            .setDescription(`${emojishuffle} Shuffled the queue`)
            .setColor(interaction.client.embedColor)
            .setTimestamp();
		return interaction.editReply({embeds: [thing]}).catch(error => client.logger.error(error));
	
	}
}; 