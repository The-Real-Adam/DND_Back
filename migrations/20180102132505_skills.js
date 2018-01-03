
exports.up = function(knex, Promise) {
  return knex.schema.createTable('skills', (table) => {
    table.increments()

    table.varchar('skill', 63)
      .notNullable()
      .defaultTo('')

    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('skills')
};
