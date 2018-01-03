exports.up = (knex, Promise) => {
  return knex.schema.createTable('equipment', (table) => {
    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('name', 63)

    table.string('description')
      .notNullable()
      .defaultTo('')
      
    table.varchar('value', 63)

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('equipment')
}
