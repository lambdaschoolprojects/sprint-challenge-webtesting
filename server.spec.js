const request = require('supertest');
const server = require('./server');

const db = require('./data/config');


describe('POST /games', () => {
    it('returns 200 when sent correct data', async () => {
        const game = {
                id: 1,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            };

        const res = await request(server)
            .post('/games')
            .send({...game})
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);

    });
    it('returns 422 when sent incomplete data', async () => {
        const game = {
            id: 1,
            title: 'Pacman', // required
            releaseYear: 1980 // not required
        };

        const res = await request(server)
            .post('/games')
            .send({...game})
            .set('Accept', 'application/json');

        //console.log(res);

        expect(res.status).toBe(422);

    });
    it('verifies release year is a number', async () => {
        const game = {
            id: 1,
            title: 'Pacman', // required
            releaseYear: "1zz0" // not required
        };

        const res = await request(server)
            .post('/games')
            .send({...game})
            .set('Accept', 'application/json');

        expect(res.status).toBe(422);
    });

    xit('verifies the title is unique', async () => {
        const games = [
            {
                id: 1,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                id: 2,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
        ];

        await db('games').insert([games[0]]);

        const res = await request(server)
            .post('/games')
            .send({ ...games[1] })
            .set('Accept', 'application/json');

        const resgames = await db('games');

        //console.log(resgames, res);

        expect(res.status).toBe(405);
    });

    afterEach( async () => {
        await db('games').truncate();
    });
})

describe('GET /games', () => {
   it('always returns an array', async () => {
        const res = await request(server).get('/games');
        expect(Array.isArray(res.body.games)).toBeTruthy();
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
        expect(res.body.games).toEqual(games);
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

       expect(typeof res.body.games[0]).toBe('object');

   });

    afterEach( async () => {
        await db('games').truncate();
    });

});