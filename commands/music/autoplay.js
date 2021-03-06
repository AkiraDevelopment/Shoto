const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "autoplay",
	category: "Music",
	description: "Toggle music autoplay",
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

		const autoplay = player.get("autoplay");

		const emojireplay = interaction.client.emoji.autoplay;

		if (autoplay === false) {
			const identifier = player.queue.current.identifier;
			player.set("autoplay", true);
			player.set("requester", interaction.member.user);
			player.set("identifier", identifier);
			const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
			let res = await player.search(search, interaction.member.user);
			player.queue.add(res.tracks[1]);
			let thing = new MessageEmbed()
                .setColor(interaction.client.embedColor)
                .setTimestamp()
                .setDescription(`${emojireplay} Autoplay is now **enabled**`);
			return interaction.editReply({embeds: [thing]});
		} else {
			player.set("autoplay", false);
			player.queue.clear();
			let thing = new MessageEmbed()
                .setColor(interaction.client.embedColor)
                .setTimestamp()
                .setDescription(`${emojireplay} Autoplay is now **disabled**`);
               
			return interaction.editReply({embeds: [thing]});
		}

	}
}; 