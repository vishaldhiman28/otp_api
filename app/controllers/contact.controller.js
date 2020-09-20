const { json } = require('body-parser');
const ContactList = require('../models/contactList.model');
const MessageHistory = require('../models/messageHistory.model');

exports.findAll = (req, res) => {
    ContactList.find()
    .then(contacts => {
        res.send(contacts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Contact."
        });
    });
};


exports.findOne = (req, res) => {
     ContactList.find({"mobile_number": req.params.mobileNumber})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Contact not found " + req.params.mobileNumber
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found " + req.params.mobileNumber
            });                
        }
        return res.status(500).send({
            message: "Error retrieving contact " + req.params.mobileNumber
        });
    });
};


// Update a note identified by the noteId in the request
exports.insertHistory = (req,res) => {
    if(!req.body.to) {
        return res.status(400).send({
            message: "Message content can not be empty"
        });
    }
    const twilioConfig = require('../../config/twilio.config');
    const json_data = req.body;
    const accountSid = twilioConfig.accountSid;
    const authToken = twilioConfig.authToken;
    const from = twilioConfig.from;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: json_data['text'],    
        from: from,
        to: json_data['to'],
        name: json_data['name']
    })
    .then(message =>{
        const message_db = new MessageHistory({
            'body': message['body'],
            'to':  message['to'],
            'date_sent': message['dateCreated'],
            'name': message['name']
          });
    
          message_db.save()
          .then(data => {
              res.send(data);
          }).catch(err => {
              res.status(500).send({
                  message: err.message || "Some error occurred while adding history"
              });
          });
    });
};

exports.findAllHistory = (req,res)=>{
    MessageHistory.find()
    .then(msgHistory => {
        res.send(msgHistory);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving History."
        });
    });
}