# otp_api
An API to send an OTP (via SMS) to a list of contacts, one at a time.

## Brief Description

```bash
├── app: This contains main structure of the server application.
│ ├── controllers
│ │ └── contact.controller.js: This contains implementation of all the functionality that will beattached to the different routes.
│ ├── models
│ │ ├── contactList.model.js: This contains schema to store contacts.
│ │ └── messageHistory.model.js: This contains schema to store history of all the messagesent.
│ └── routes
│
└── contact.routes.js: All routes (end point) that API provides.
├── config
│ ├── database.config.js : This contains url of db that you want to use. MongoDB url.
│ └── twilio.config.js: This contains all the information i.e. id, key, number that is needed tosend a message using twilio api.
└── server.js: This defines the root of the server i.e. db connection and server port.
...
