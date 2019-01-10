"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var auth = require('http-auth');


let samplesAdminUser = process.env.BOTS_SAMPLES_USER || 'MyTestUser';
let samplesAdminPwd = process.env.BOTS_SAMPLES_PASSWORD || 'MyTestPassword';
const basic = auth.basic({
		realm: "Bots Default Custom Component Service"
	}, (username, password, callback) => {
		callback(username === samplesAdminUser && password === samplesAdminPwd);
	}
);

var createComponentsServer = function(urlPath, config) {
    var app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

		var logger = (config ? config.logger : null);
	  if (!logger) {
	    const log4js = require('log4js');
	    logger = log4js.getLogger();
	    logger.setLevel('INFO');
	    log4js.replaceConsole(logger);
	  }
		if (config){
			config.logger = logger;			
		}

		var shell = require('./shell')(config);

    var router = express.Router();
    router.use(morgan('combined'));
    router.use(auth.connect(basic));

    // Return component metadata
    router.route('/').get(function (req, res) {
        res.set('Content-Type', 'application/json')
           .status(200)
           .json(shell.getAllComponentMetadata());
    });

    // Invoke component by name
    router.route('/:componentName').post(function (req, res) {
        const componentName = req.params.componentName;
        shell.invokeComponentByName(req.params.componentName, req.body, {}, function(err, data) {
            if (!err) {
                res.status(200).json(data);
            }
            else {
                switch (err.name) {
                    case 'unknownComponent':
                        res.status(404).send(err.message);
                        break;
                    case 'badRequest':
                        res.status(400).json(err.message);
                        break;
                    default:
                        res.status(500).json(err.message);
                        break;
                }
            }
        });
    });

    app.use(urlPath, router);

    logger.info('Express server: component server created at context path=' + urlPath);

    app.locals.endpoints = [];
    app.locals.endpoints.push({
      name: 'metadata',
      method: 'GET',
      endpoint: urlPath
    });
    app.locals.endpoints.push({
      name: 'invocation',
      method: 'POST',
      endpoint: urlPath+'/:componentName'
    });

		app.locals.ui = {
  		name: 'Metadata',
  		endpoint: urlPath
  	};

    return app;
};

module.exports = createComponentsServer;
