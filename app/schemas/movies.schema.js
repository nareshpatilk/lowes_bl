var Promise = require("bluebird");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    "_id": {
        type: Number
    },
    "plot": {
        type: String
    },
    "runtime": {
        type: String
    },
    "fullplot": {
        type: String
    },
    "title": {
        type: Number
    },
    "year": {
        type: String
    },
    "type": {
        type: String
    },
    "lastupdated": {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false
});


var movieData = mongoose.model('movies', movieSchema, 'movies');

module.exports = movieData