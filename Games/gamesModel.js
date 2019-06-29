const db = require('../data/config');

const getAll = () => {
    return db('games');
}

const getById = id => {
    return null;
}

const getByTitle = title => {
    //console.log(title);
    return db('games').where({ title });
}

const insertGame = game => {
    return null;
}

const updateGame = id => {
    return null;
}

const deleteGame = id => {
    return null;
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    insertGame,
    updateGame,
    deleteGame
}