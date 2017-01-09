#!/usr/bin/env node

//grab a reference to the library, this is simplier when you're using it as a library.
var steamServerStatus = require(__dirname + '/../lib/steam-server-status');

/**
 * Simple callback function to dump server info to logs.
 */
function echoServerInfo(serverInfo) {
    console.log("game: " + serverInfo.gameName);
    console.log("server name: " + serverInfo.serverName);
    console.log("players: " + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers)
}

// this should return correctly.
steamServerStatus.queryServer('tf.bonta-kun.net:27015')
  .then((res) => {
    echoServerInfo(res)
  })
  .catch((err) => {
    console.error("An error occurred", err)
  })

// this should timeout
steamServerStatus.queryServer('tf.bonta-kun.net:80')
  .then((res) => {
    echoServerInfo(res)
  })
  .catch((err) => {
    console.error("An error occurred", err)
  })


// Multiple querys example
steamServerStatus.queryServer([
    'tf.bonta-kun.net:27015',
    ['tf.bonta-kun.net:80', {port: 27015}]
  ])
  .then((res) => {
    echoServerInfo(res)
  })
  .catch((err) => {
    console.error("An error occurred", err)
  })

steamServerStatus.queryServer([
    'tf.bonta-kun.net:27015',
    'tf.bonta-kun.net:80',
    ['tf.bonta-kun.net:80', {port: 27015}]
  ])
  .then((res) => {
    echoServerInfo(res)
  })
  .catch((err) => {
    console.error("An error occurred", err)
  }) // will return here, all errors fail the entire stack.
