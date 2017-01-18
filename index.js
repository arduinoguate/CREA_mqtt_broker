const express = require('express');
const mosca = require('mosca');

var pubsubsettings = {
  type: 'redis',
  port: 6380,
  host: 'localhost',
  return_buffers: true
};

var persistencesettings = {
  factory: mosca.persistence.Redis,
  port: 6380,
  host: 'localhost'
};

var moscaSettings = {
  port: 1884,           //mosca (mqtt) port
  backend: pubsubsettings,   //pubsubsettings is the object we created above
  persistence: persistencesettings
};

var server = new mosca.Server(moscaSettings);   //here we start mosca
server.on('ready', setup);  //on init it fires up setup()

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
