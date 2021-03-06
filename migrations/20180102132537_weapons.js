
exports.up = function(knex, Promise) {
  return knex.schema.createTable('weapons', (table) => {
    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('weapon', 63)
      .notNullable()
      .defaultTo('')

    table.string('type')
      .notNullable()
      .defaultTo('')

    table.varchar('damage', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('critical', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('range', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('damage_type', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('special', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('weight', 63)
      .notNullable()
      .defaultTo('')

    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('weapons')

};
