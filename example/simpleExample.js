#!/usr/bin/env node

//grab a reference to the library, this is simplier when you're using it as a library.
var steamServerStatus = require(__dirname + '/../lib/steam-server-status');

/**
 * Simple callback function to dump server info to logs.
 */
function echoServerInfo(serverInfo) {
    console.log("######");
    console.log("game: " + serverInfo.gameName);
    console.log("server name: " + serverInfo.serverName);
    console.log("players: " + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers)
    console.log("######");
}

// this should return correctly.
steamServerStatus.queryServer('162.248.93.211:27015')
  .then((res) => {
    echoServerInfo(res)
  })
  .catch((err) => {
    console.error("An error occurred", err)
  })

// this should timeout
steamServerStatus.queryServer('31.186.251.170:6654')
  .then((res) => {
    echoServerInfo(res)
  })
  .catch((err) => {
    console.error("An error occurred", err)
  })


// Multiple querys example
steamServerStatus.queryServer([
    '31.186.251.170:27015',
    ['162.248.93.211:27015', {port: 27015}]
  ])
  .then((res) => {
    res.forEach(server => {
        echoServerInfo(server)
    })
  })
  .catch((err) => {
    console.error("An error occurred", err)
  })

steamServerStatus.queryServer([
    '31.186.251.170:27015',
    '87.117.217.32:27017',
    ['162.248.93.211:27015', {port: 27015}]
  ])
  .then((res) => {
    res.forEach(server => {
        echoServerInfo(server)
    })
  })
  .catch((err) => {
    console.error("An error occurred", err)
  }) // will return here, all errors fail the entire stack.
