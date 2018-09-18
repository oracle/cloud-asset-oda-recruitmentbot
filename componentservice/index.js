"use strict";
const express = require("express");
const morgan = require("morgan");
const Main = require("./app");
const pkg = require('./package.json');
const app = express();
// request logs
app.use(morgan('combined'));
// add custom services
app.locals._baseUri = '/';
Main(app);
const HTTP = app.listen(process.env.PORT || 7950, () => {
    console.log(`${pkg.name} server listening http://bots-service-recruitment-bot:7950`);
});
module.exports = HTTP;
