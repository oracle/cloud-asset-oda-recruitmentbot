"use strict";
const path = require("path");
const OracleBot = require("@oracle/bots-node-sdk");
const Config = require('../config.json');
/**
 * Custom component middleware as a service.
 * services/component
 */
function ComponentServices() {
    // create a registry of components
    // NOTE: A legacy registry.components may also be used as a direct replacement for the config object.
    return OracleBot.Middleware.customComponent({        
            cwd: path.resolve(__dirname, '..'),
            register: Config.componentPaths // list of configured registry paths
    });
}
module.exports = ComponentServices;
