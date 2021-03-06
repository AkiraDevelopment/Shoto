const Discord = require("discord.js");

module.exports = {
	name: "announce",
	category: "moderation",
	description: "sends an announcement",
	guildOnly: true,
	ephemeral: true,
	permissions: ["MANAGE_MESSAGES"],
	botPermissions: ["MANAGE_MESSAGES"],
	options: [
		{
			name: "message",
			type: "STRING",
			description: "Your announcement message",
			required: true,
		}],

	async execute(client, interaction, args) {

		//get all settings
		const settings = await client.getSettings(interaction);

		//if no channel reply with error
		if (!settings.AchannelID) {
			return interaction.editReply({content: client.lang("no-config", settings.language)});
		}

		if(!interaction.guild.me.permissionsIn(settings.AchannelID).has("SEND_MESSAGES")) return interaction.editReply({content: "I am unable to send messages in the announcement channel"});

		//contstruct embed and send the announcement channel
		const announcmentEmbed = new Discord.MessageEmbed()
                    .setTitle("__**Announcement**__")
                    .setColor(client.embedColor)
                    .setDescription(`${args[0]}`)
                    .setFooter({text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true, size: 2048 })});
		interaction.guild.channels.cache.get(settings.AchannelID).send({embeds: [announcmentEmbed]});
		interaction.editReply({content: "Message Sent!"})

	},
};