const winston = require('winston');
const express = require('express');
const mosca = require('mosca');

var pubsubsettings = {
  type: 'redis',
  port: 6379,
  host: 'localhost',
  return_buffers: true
};

var persistencesettings = {
  factory: mosca.persistence.Redis,
  port: 6379,
  host: 'localhost'
};

var moscaSettings = {
  port: 1884,           //mosca (mqtt) port
  backend: pubsubsettings,   //pubsubsettings is the object we created above
  persistence: persistencesettings
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

function setup() {
  console.log('CREA-Mosca server is up and running')
}
console.log(process.pid);
