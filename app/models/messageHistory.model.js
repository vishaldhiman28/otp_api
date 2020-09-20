const mongoose = require('mongoose');

const MessageHistory = mongoose.Schema({
    body: String,
    date_sent: Date,
    to: String,
},
{ collection : 'messageHistory'});

module.exports = mongoose.model('messageHistory', MessageHistory);
