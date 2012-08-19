Steam Server Status library
=========================

How to get it
-------------

The easiest way to get it is via [npm]

    npm install steam-server-status

If you want to run the latest version (i.e. later than the version available
via [npm]) you can clone this repo, then use [npm] to link-install it:

    npm link /path/to/your/clone

Of course, you can just clone this, and manually point at the library itself,
but I really recommend using [npm]!

How to use it
-------------

The library provides basic functionality for requesting the status and statistics of a steam source engine game. The simplest use case you just make a call like this:

    var steamServerStatus = require(steam-server-status');
    steamServerStatus.getServerStatus(
        'tf.bonta-kun.net', 27015, function(serverInfo) {
            if (serverInfo.error) {
                console.log(serverInfo.error);
            } else {
                console.log("game: " + serverInfo.gameName);
                console.log("server name: " + serverInfo.serverName);
                console.log("players: " + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers)
            }
    });

This will connect to a server and split out ot the logs what game the server is playing, what the server name is listed as and how many people are playing on it.

Server Info Object
------------------

This object hems very closely to the [Valve's response format documentation](https://developer.valvesoftware.com/wiki/Source_Server_Queries#Reply_format_3).

### error 

This is used to check if there was an error talking to the server, it will be undefined if there were no problems, if it's populated it'll be a error message.

### version

Version, as far as I can tell it's always 49.

### serverName

This is what the server's name is listed as. It corresponds to the hostname attribute in server.cfg, but is not a network hostname.

### map

Current map.

### gameDirectory

Game directory, can be used to determine what game is being played.

### gameName

A nicer representation of the game name, extracted from the value for gameDirectory.

### gameDescription

The game description returned by the server, it's generally slightly less than acurate.

### applicationId

Steam application id. See [this page](https://developer.valvesoftware.com/wiki/Steam_Application_IDs) if you're interested in learning more.

### numberOfPlayers

Current number of players on teh server.

### maxNumberOfPlayers

Maximum (visible) number of players.

### numberOfBots

Number of bots currently running around on ther server.

### dedicatedServer

If the server is a dedicated server or not.

### operatingSystem

Host operating system of the server. 'l' for Linux, 'w' for Windows.

### passwordRequired

Boolean to say if the server requires a password.

### secure

Boolean to say whether is VAC secured or not.

### gameVersion

Current version of the game the server is running.

### hostname

This is just echoed back from the request.

### port

This is just echoed back from the request.
