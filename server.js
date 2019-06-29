const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(logger('dev'));
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ hello: "world" });
})

module.exports = server;