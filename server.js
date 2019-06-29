const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const server = express();

const Games = require('./Games/gamesModel');

server.use(express.json());
server.use(logger('dev'));
server.use(helmet());



server.get('/', (req, res) => {
    res.status(200).json({ hello: "world" });
})

server.get('/games', async (req, res) => {
    const games = await Games.getAll();

    res.status(200).json({ games });
});

module.exports = server;