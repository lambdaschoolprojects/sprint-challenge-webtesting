
exports.up = async function(knex) {
  await knex.schema.createTable('games', tbl => {
      tbl.increments('id');
      tbl.string('title').notNullable();
      tbl.string('genre').notNullable();
      tbl.integer('releaseYear');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('games');
};
