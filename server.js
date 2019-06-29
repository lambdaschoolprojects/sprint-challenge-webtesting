const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const server = express();

const Games = require('./Games/gamesModel');
const validateGame = require('./Games/validateGame');

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

server.post('/games', validateGame, async (req, res) => {
    if (typeof req.body != 'object') return res.status(422).json({ message: req.body });

    try {

        await Games.insertGame(req.body);

        return res.status(200).json({message: "Game inserted"});
    } catch(err) {
        return res.status(500).json({ err });
    }

});

module.exports = server;