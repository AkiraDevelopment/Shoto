module.exports = {
	name: "Prefix",
	id: "prefix",
	sqlvalue: "prefix",
	description: "The bots prefix for non slash commands.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set prefix = "${args[0]}" where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
		}
	}
};