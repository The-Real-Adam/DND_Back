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

    table.timestamps(true, true)

  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users')
}
