const Promise = require("bluebird");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const urlShortnerSchema = new Schema({
    "urlCode": {
        type: String
    },
    "longUrl": {
        type: String
    },
    "shortUrl": {
        type: String
    },
    "clickCount": {
        type: Number
    }
}, {
    timestamps: false
});

const urlShortner = mongoose.model('url', urlShortnerSchema, 'url');

module.exports = urlShortner