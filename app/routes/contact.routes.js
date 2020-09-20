module.exports = (app) => {
    const contacts = require('../controllers/contact.controller.js');

    app.get('/contacts', contacts.findAll);

    app.get('/contact/:mobileNumber', contacts.findOne);

    app.post('/sendMsg', contacts.insertHistory);
    app.get('/history',contacts.findAllHistory);
}