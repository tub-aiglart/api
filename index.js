require('dotenv').config();

const API = require('./src/API');

const Client = new API();

Client.initialize();
