
exports.up = function(knex, Promise) {
  return knex.schema.createTable('journal', (table) => {
    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('journal_heading', 63)
      .notNullable()
      .defaultTo('')

    table.string('journal_entry')
      .notNullable()
      .defaultTo('')

    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('journal')
};
