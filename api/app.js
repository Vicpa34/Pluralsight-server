const express = require('express');
const path = require('path');
const router = require('./src/router.js');

const app = express();

const pathToIndex = path.resolve(_dirname, '../client/index.html');

app.use('/', router);
app.use(express.static(path.resolve(__dirname, 'uploads')));

module.exports = app;