// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/development.sqlite3'
    },
    useNullAsDefault: true
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.sqlite3'
    },
    useNullAsDefault: true
  }


};
