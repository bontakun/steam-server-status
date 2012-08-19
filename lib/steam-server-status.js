module.exports = {
	getServerStatus: getServerStatus
};

var dgram = require('dgram');
var util = require('util');

/**
 * This method when called will call out to a server and retrieve the steam status.
 * @param serverAddress Server to ask, can be ip or hostname.
 * @param port Port to request on, normally on port 27015.
 * @param callback Called and handed the information about the server.
 */
function getServerStatus(serverAddress, port, callback) {
	var client = dgram.createSocket("udp4");
	var message = createInfoQueryBuffer();
	
	client.on('message', function(msg, rinfo) {
		var serverInfo = parseServerInfo(serverAddress, port, msg);
		client.close();
		callback(serverInfo);
	});
	
	client.send(message, 0, message.length, port, serverAddress);
}

/**
 * TODO
 */
function parseServerInfo(hostname, port, message) {
	//0-3 are just FF, not sure why.
	//4 should 49
	var i = 4;
	var version = toHexString(message[i++]);

	var serverName = "";
	for (++i; message[i] != 0x00; i++) {
		serverName += String.fromCharCode(message[i]);
	}

	var map = "";
	for (++i; message[i] != 0x00; i++) {
		map += String.fromCharCode(message[i]);
	}
	
	var gameDirectory = "";
	for (++i; message[i] != 0x00; i++) {
		gameDirectory += String.fromCharCode(message[i]);
	}
	
	var gameDescription = "";
	for (++i; message[i] != 0x00; i++) {
		gameDescription += String.fromCharCode(message[i]);
	}
	
	//appid is a double byte (short)
	var appId = message.readUInt16LE(++i);
	i++;
	
	var numberOfPlayers = message[++i];
	var maxNumberOfPlayers = message[++i];
	var numberOfBots = message[++i];
	var dedicatedServer = String.fromCharCode(message[++i]);
	var operatingSystem = String.fromCharCode(message[++i]);
	var passwordRequired = message[++i];
	var secure = message[++i];
	
	var gameVersion = "";
	for (++i; message[i] != 0x00; i++) {
		gameVersion += String.fromCharCode(message[i]);
	}
	
	return {
		version: version,
		serverName: serverName,
		map: map,
		gameDirectory: gameDirectory,
		gameName: extractGameNameFromDirectory(gameDirectory),
		gameDescription: gameDescription,
		applicationId: appId,
		numberOfPlayers: numberOfPlayers,
		maxNumberOfPlayers: maxNumberOfPlayers,
		numberOfBots: numberOfBots,
		dedicatedServer: dedicatedServer == "d",
		operatingSystem: operatingSystem,
		passwordRequired: passwordRequired > 0,
		secure: secure > 0,
		gameVersion: gameVersion,
		hostname: hostname,
		port: port
	}
}

/**
 * TODO
 */
function extractGameNameFromDirectory(gameDirectory) {
	if (gameDirectory == "tf") {
		return "Team Fortress 2";
	} else if(gameDirectory == "dod") {
		return "Day of Defeat: Source";
	} else if (gameDirectory == "cstrike") {
		return "Counter-Strike: Source";
	} else if (gameDirectory == "garrysmod") {
		return "Garry's Mod";
	}
	return gameDirectory;
}

/**
 * Very simple wrapper for byte.toString, mainly I use this because it's cleaner.
 * @param byte single byte to be converted into hex string.
 * @return hex string version of byte.
 */
function toHexString(byte) {
	return byte.toString(16);
}

/** 
 * This generates a info query buffer object.
 * There is probably a cleaner way to generate this.
 */
function createInfoQueryBuffer() {
	var buffer = new Buffer(25);
	buffer[0] = 0xFF;
	buffer[1] = 0xFF;
	buffer[2] = 0xFF;
	buffer[3] = 0xFF;
	buffer[4] = 0x54;
	buffer[5] = 0x53;
	buffer[6] = 0x6F;
	buffer[7] = 0x75;
	buffer[8] = 0x72;
	buffer[9] = 0x63;
	buffer[10] = 0x65;
	buffer[11] = 0x20;
	buffer[12] = 0x45;
	buffer[13] = 0x6E;
	buffer[14] = 0x67;
	buffer[15] = 0x69;
	buffer[16] = 0x6E;
	buffer[17] = 0x65;
	buffer[18] = 0x20;
	buffer[19] = 0x51;
	buffer[20] = 0x75;
	buffer[21] = 0x65;
	buffer[22] = 0x72;
	buffer[23] = 0x79;
	buffer[24] = 0x00;
	return buffer;
}
