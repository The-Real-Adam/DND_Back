
exports.up = (knex, Promise) => {
  return knex.schema.createTable('feats', (table) => {
    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('name', 63)
      .notNullable()
      .defaultTo('')

    table.string('description')
      .notNullable()
      .defaultTo('')

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('feats')
}
