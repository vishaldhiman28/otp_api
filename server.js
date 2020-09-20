const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to AirL API"});
});

require('./app/routes/contact.routes')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});
