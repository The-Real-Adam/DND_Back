
exports.up = function(knex, Promise) {
  return knex.schema.createTable('armors', (table) => {
    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('armor', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('armor_bonus', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('max_dex_bonus', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('arcane_failure', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('weight', 63)
      .notNullable()
      .defaultTo('')

    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('armors')

};
