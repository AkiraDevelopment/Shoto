module.exports = {
	name: "Prefix",
	id: "prefix",
	sqlvalue: "prefix",
	description: "The bots prefix for non slash commands.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set prefix = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.editReply(`Setting: Prefix Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting prefix: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 