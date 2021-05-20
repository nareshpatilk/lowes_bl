/**
 * This file contains the method to connect to the mongodb based on the configurations set in config file.
 */

 const config = require("./config").props();
 const mongoose = require("mongoose");
 const MongoClient = require('mongodb');

 
 /**
  * This function establishes the connection to mongo
  * @param {*} environ
  */
 connect = (environ) => {
 
     console.log("mongo db host : " + config.mongodb.host);
     console.log("mongo db host after trim : " + config.mongodb.host.trim());
 
     let url;
     // Checking the environment
     if (environ == "DEV") {
         //You can perform any db url manipulation based on this environment check
          url=`mongodb+srv://${ config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host.trim()}/${config.mongodb.dbName}?retryWrites=true&w=majority`;
     }
 
 
     //Authorizing the connection
     const options = {
        
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000,
        keepAlive: true
        
      };

    // const options = {
        
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     autoIndex: false, // Don't build indexes
    //     poolSize: 10, // Maintain up to 10 socket connections
    //     server:
    //            { socketOptions: 
    //                 { 
    //                     socketTimeoutMS: SOCKET_TIME_OUT_MS, 
    //                     connectTimeoutMS: CONNECTION_TIMEOUT_MS 
    //                 }
    //             }
    //   };

     

     console.log("MONGO DB CONNECTION URL : " + url);
 
     try {
         
        mongoose.connect(url,options)
        .then(() => {
                console.log(" Mongoose is connected") 
        });;

         //Logging based on events emitted by mongo connection
         mongoose.connection.on('connected', function () {
             console.log("Connection to Mongo established successfully");
        });
 
        mongoose.connection.on('error', function (err) {
            console.error('Connection to mongo failed ' + err);
        });

     
        } catch (error) {
            console.log(" Mongoose is connection failed");
            console.log(error);
     }
     
 }
 
 //Creating the object to be exported
 let Mongoose = function(){
     this.connect = connect;
 }
 //Exporting the function as an object
 module.exports = Mongoose;