/**
 * @fileOverview Entry point of the application
 * Initilizes express app with necessary configurations
 */
const http = require('http');
const configObj = require("./config/config");
configObj.setEnv(process.argv[2]);

const config = configObj.props();
const logger = require("./logger");

const Mongoose = require("./config/mongoose")

console.log('landing to index routes');
const apis = require("./config/api-config");
const PORT = config.app.port;
const mong = new Mongoose();
mong.connect(process.argv[2]);

// if https is required, we need to add certficates
const httpsServer = http.createServer(apis.app);


let index = httpsServer.listen(PORT, function () {
    logger.info(`Basic Node Services listening on port  ${PORT}` );
    logger.info(`Started Base Service on :  ${config.app.host}:${PORT}`);
});

module.exports = index;