exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {

    table.increments()

    table.varchar('username', 63)
      .notNullable()
      .defaultTo('')
      .unique()

    table.varchar('email', 63)
      .notNullable()
      .defaultTo('')
      .unique()

    table.specificType('hashed_password', 'CHAR(60)')
      .notNullable()

    table.integer('sheet_id_1')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.integer('sheet_id_1')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.integer('sheet_id_1')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.integer('sheet_id_1')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')
      .notNullable()

    table.timestamps(true, true)

  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users')
}
