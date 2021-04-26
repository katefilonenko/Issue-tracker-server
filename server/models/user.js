const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    username: String,
    email: String,
    password: String,
    location: String,
    hireDate: Date, 
    description: String,
    type: String,
    severity: String,
    status: String,
    comment: String 
});

module.exports = mongoose.model('users', userSchema);
