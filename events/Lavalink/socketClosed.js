module.exports = async (client, player, payload) => {

	if (payload.byRemote == true) {
        player.destroy();
    }

    client.logger.error(`Socket has been closed because ${payload.reason} in [${player.guild}]`);

}