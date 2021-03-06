
const Discord = require("discord.js");
const {fetch} = require("../../utilities/utilities.js");

module.exports = {
	name: "magik",
	category: "image-manipulation",
	description: "photo go magik",
	cooldown: 15,
	ephemeral: false,
	botPermissions: ["ATTACH_FILES"],
	options: [{
		name: "intensity",
		type: "INTEGER",
		description: "number 1 - 10",
		required: true,
	},
	{
		name: "user",
		type: "USER",
		description: "Persons profile pic to magik",
		required: false,
	},
	],
	async execute(client, interaction, args) {

		//Get command executors profile picture if user is not specified, query api and respond with result
		const file = args[1] ? interaction.guild.members.cache.get(args[1]).user.displayAvatarURL({ format: "png", size: 2048 }) : interaction.user.displayAvatarURL({ format: "png", size: 2048 });
		const mgk = await interaction.editReply("Generating Magik...");
		const res = await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${file}&intensity=${args[0]}`);
		const magikd = new Discord.MessageAttachment(res.message, "Magik.png");
		interaction.editReply({content: null, files: [magikd]});
	},
}; 