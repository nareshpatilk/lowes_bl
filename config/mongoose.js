/**
 * This file contains the method to connect to the mongodb based on the configurations set in config file.
 */

 const config = require("./config").props();
 const mongoose = require("mongoose");
 const MongoClient = require('mongodb');

 const logger = require("../logger");
 
 /**
  * This function establishes the connection to mongo
  * @param {*} environ
  */
 connect = (environ) => {
 
     logger.info("mongo db host : " + config.mongodb.host);
     logger.info("mongo db host after trim : " + config.mongodb.host.trim());
 
     let url;
     // Checking the environment
     if (environ == "DEV") {
         //You can perform any db url manipulation based on this environment check
          url=`mongodb+srv://${ config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host.trim()}/${config.mongodb.dbName}?retryWrites=true&w=majority`;
     }
 
 
     //Authorizing the connection
     const options = {
        
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
      };

     

     logger.info("MONGO DB CONNECTION URL : " + url);
 
     try {
         
        mongoose.connect(url,options)
        .then(() => {
                logger.info(" Mongoose is connected") 
        });;

         //Logging based on events emitted by mongo connection
         mongoose.connection.on('connected', function () {
             logger.info("Connection to Mongo established successfully");
        });
 
        mongoose.connection.on('error', function (err) {
            logger.error('Connection to mongo failed ' + err);
        });

     
        } catch (error) {
            logger.info(" Mongoose is connection failed");
            console.log(error);
     }
     
 }
 
 //Creating the object to be exported
 let Mongoose = function(){
     this.connect = connect;
 }
 //Exporting the function as an object
 module.exports = Mongoose;