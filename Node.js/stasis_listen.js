#!/usr/bin/env node

'use strict';

// env handler
const env = require('../../lib/node_modules/node-env-file');


// controllers.say_balance = require('./functions/say_balance.js');

// Export configs
env(__dirname + '/.env');

var mysql = require('../../lib/node_modules/mysql');

// Connect to MySQL
var db_connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

db_connection.connect();

var log4js = require('../../lib/node_modules/log4js');

log4js.configure({
    appenders: [
        { "type": "dateFile",  "filename": "/var/log/asterisk/ws_js.log", "pattern": "-yy-MM-dd", "alwaysIncludePattern": false }
    ]
});
var logger = log4js.getLogger('ws_js');


//  Load dialplan functions "dynamically"

global.js_func_id = [];

var attached_files = [];
var fs = require('fs');
var path_module = require('path');
var module_holder = {};


function LoadModules(path) {
console.log(path);
    fs.lstat(path, function(err, stat) {
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function(err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);
                    LoadModules(f);
                }
            });
        } else {
	  	var is_attached = 0, l = attached_files.length, i;

			if (l > 0) {
	    			for (i = 0; i < l; i++){
	    
					if(path === attached_files[i]){
					is_attached = 1;
					break;
					}
	    			}
			}

			if (is_attached === 0){
           		// we have a file: load it	

            		require(path)(module_holder);
			attached_files[attached_files.length]=path;
			}
        	}
    });
}

var DIR = path_module.join(__dirname, 'functions');

LoadModules(DIR);

exports.module_holder = module_holder;

fs.watch(DIR, (eventType, filename) => {

	if (eventType === 'change' || eventType === 'rename') {

        setTimeout(function () { LoadModules(DIR); console.log(DIR); } , 10000);		
	}
});

// Load Asterisk ARI module

var ari_client = require('../../lib/node_modules/ari-client');

ari_client.connect("http://127.0.0.1:8088","ari_user","12345678", ari_client_loaded);

function ari_client_loaded (err, ari) {

  if (err) {
    throw err; // program will crash if it fails to connect
  }

  ari.on('StasisStart', channel_joined);

  	function channel_joined (event, channel) {
	
	var event_args = event.args;

	var event_args_1 = event_args.toString().split(",")[0];
	var event_args_2 = event_args.toString().split(",")[1];


	var function_name=global.js_func_id[event_args_1];

		if(typeof function_name !== 'undefined'){
		module_holder[function_name](event_args_2, ari, channel, event, db_connection, logger);
		}
  	};

   ari.start('invoke_js_function');
 
}
