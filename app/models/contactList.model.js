const mongoose = require('mongoose');

const ContactList = mongoose.Schema({
    mobile_number: String,
    name: String
}, { collection : 'contactList' });


module.exports = mongoose.model('contactList', ContactList);
