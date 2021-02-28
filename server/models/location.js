const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locname: String
});

module.exports = mongoose.model('locations', locationSchema);