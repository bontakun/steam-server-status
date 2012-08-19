#!/usr/bin/env node

//grab a reference to the library, this is simplier when you're using it as a library.
var steamServerStatus = require(__dirname + '/../lib/steam-server-status');

/**
 * Simple callback function to dump server info to logs.
 */
function echoServerInfo(serverInfo) {
    if (serverInfo.error) {
        console.log(serverInfo.error);
    } else {
        console.log("game: " + serverInfo.gameName);
        console.log("server name: " + serverInfo.serverName);
        console.log("players: " + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers)
    }
}

// this should return correctly.
steamServerStatus.getServerStatus(
    'tf.bonta-kun.net', 27015, echoServerInfo);

// this should timeout
steamServerStatus.getServerStatus(
    'tf.bonta-kun.net', 80, echoServerInfo);
