exports.up = (knex, Promise) => {
  return knex.schema.createTable('spells', (table) => {

    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('name', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('casting_time', 63)
      .notNullable()
      .defaultTo('')

    table.integer('spell_level')
      .notNullable()
      .defaultTo(0)

    table.string('description')
      .notNullable()
      .defaultTo('')

    table.varchar('duration', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('range', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('targets', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('saving_throw', 63)
      .notNullable()
      .defaultTo('')

    table.boolean('spell_resistance')
      .notNullable()
      .defaultTo(true)


    table.timestamps(true, true)

  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('spells')
}
