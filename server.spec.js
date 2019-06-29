const request = require('supertest');
const server = require('./server');

const db = require('./data/config');


describe('POST /games', () => {
    it('returns 200 when sent correct data', () => {

    });
    it('returns 422 when sent incomplete data', () => {

    });
    it('verifies release year is a number', () => {

    });
})

describe('GET /games', () => {
   it('always returns an array', async () => {
        const res = await request(server).get('/games');
        expect(Array.isArray(res)).toBeTruthy();
   });

   it('returns all items stored in the db', async () => {
        const games = [
            {
                id: 1,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                id: 2,
                title: 'Digdug',
                genre: 'Arcade',
                releaseYear: 1985
            }
        ]

       await db('games').insert(games);

        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(games);
   });

   it('returns games as objects', async () => {
       const games = [
           {
               id: 1,
               title: 'Pacman', // required
               genre: 'Arcade', // required
               releaseYear: 1980 // not required
           },
           {
               id: 2,
               title: 'Digdug',
               genre: 'Arcade',
               releaseYear: 1985
           }
       ];

       await db('games').insert(games);
       const res = await request(server).get('/games');

       expect(typeof res.body[0]).toBe('object');

   });

    afterEach( async () => {
        await db('games').truncate();
    });

});