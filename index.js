/**
 * @fileOverview Entry point of the application
 * Initilizes express app with necessary configurations
 */
const https = require('https');
const configObj = require("./config/config");
configObj.setEnv(process.argv[2]);

const config = configObj.props();

console.log('landing to index routes');
const apis = require("./config/api-config");
const PORT = config.app.port;

// if https is required, we need to add certficates
//const httpsServer = https.createServer(apis.app);


let index = apis.app.listen(PORT, function () {
    console.log('Basic Node Services listening on port ' + PORT + '!');
    console.log('Started Base Service on :', config.app.host + ':' + PORT);
});

module.exports = index;