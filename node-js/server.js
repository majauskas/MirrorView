
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var os = require('os');
var player = require("./omxplayer.js");

var Server = function() {

this.start = function() {

	console.log("Starting server op port 8080 ... ");

  var host = null;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '/../webapp')));
  app.enable('view cache');
  var server = app.listen(process.env.PORT || 8080, function () {
  	var interfaces = os.networkInterfaces();
  	for (var k in interfaces) {
  		if(interfaces.hasOwnProperty(k)) {
  		    for (var k2 in interfaces[k]) {
  		    	if(interfaces[k].hasOwnProperty(k2)) {
  			        var address = interfaces[k][k2];
  			        if (address.family === 'IPv4' && !address.internal) {
  			        	host = address.address;
  			        }
  		    	}
  		    }
  		}
  	}
  
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
  
   
  });
  
  
  app.get('/play', function(req, res) {
	  player.init('http://lucky.lts1.net:23000/live/mindagaus/x6COWBCJmH/2483.ts');
  });
  
  app.get('/player/:command', function(req, res) {
	  player.command(req.params.command);
  });  

  app.get('/quit', function(req, res) {
	  player.exit();
  });  
  

};

};

module.exports = new Server();


