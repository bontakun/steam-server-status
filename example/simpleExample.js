#!/usr/bin/env node

//grab a reference to the library, this is simplier when you're using it as a library.
var steamServerStatus = require(__dirname + '/../lib/steam-server-status');

steamServerStatus.getServerStatus(
	'tf.bonta-kun.net', 27015, function(serverInfo) {
		console.log("game: " + serverInfo.gameName);
		console.log("server name: " + serverInfo.serverName);
		console.log("players: " + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers)
});