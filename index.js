/**
 * @fileOverview Entry point of the application
 * Initilizes express app with necessary configurations
 */
const http = require('http');
const configObj = require("./config/config");
const kafkaConsumer = require('./app/kafka/consumer.js')
configObj.setEnv(process.argv[2]);

const config = configObj.props();

const Mongoose = require("./config/mongoose")

console.log('landing to index routes');
const apis = require("./config/api-config");
const PORT = config.app.port;
const mong = new Mongoose();
mong.connect("DEV");

// if https is required, we need to add certficates
const httpsServer = http.createServer(apis.app);

kafkaConsumer.consume().catch((err) => {
	console.error("error in consumer: ", err)
})

let index = httpsServer.listen(PORT, function () {
    console.log(`Basic Node Services listening on port  ${PORT}` );
    console.log(`Started Base Service on :  ${config.app.host}:${PORT}`);
});

module.exports = index;