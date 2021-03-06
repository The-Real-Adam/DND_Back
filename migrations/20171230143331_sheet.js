
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sheet', (table) => {
    table.increments()

    table.integer('users_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()

    table.varchar('char_name', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_class', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_size', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_align', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_race', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_weight', 63)
      .notNullable()
      .defaultTo('')

    table.integer('char_age')
      .notNullable()
      .defaultTo(0)

    table.varchar('char_height', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_gender', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('char_languages', 256)
      .notNullable()
      .defaultTo('Common')

    table.integer('char_level')
      .notNullable()
      .defaultTo(1)

    table.integer('initative')
      .notNullable()
      .defaultTo(0)

    table.integer('sr')
      .notNullable()
      .defaultTo(0)

    table.integer('dr')
      .notNullable()
      .defaultTo(0)

    table.integer('speed')
      .notNullable()
      .defaultTo(30)

    table.integer('strength')
      .notNullable()
      .defaultTo(10)

    table.integer('dexterity')
      .notNullable()
      .defaultTo(10)

    table.integer('constution')
      .notNullable()
      .defaultTo(10)

    table.integer('intellect')
      .notNullable()
      .defaultTo(10)

    table.integer('wisdom')
      .notNullable()
      .defaultTo(10)

    table.integer('charisma')
      .notNullable()
      .defaultTo(10)

    table.integer('bab_1')
      .notNullable()
      .defaultTo(1)

    table.integer('bab_2')
      .notNullable()
      .defaultTo(0)

    table.integer('bab_3')
      .notNullable()
      .defaultTo(0)

    table.integer('bab_4')
      .notNullable()
      .defaultTo(0)

    table.integer('cmb')
      .notNullable()
      .defaultTo(0)

    table.integer('cmd')
      .notNullable()
      .defaultTo(0)

    table.integer('max_hp')
      .notNullable()
      .defaultTo(0)

    table.integer('current_hp')
      .notNullable()
      .defaultTo(0)

    table.integer('armor_class')
      .notNullable()
      .defaultTo(0)

    table.integer('fortitude')
      .notNullable()
      .defaultTo(0)

    table.integer('reflex')
      .notNullable()
      .defaultTo(0)

    table.integer('will')
      .notNullable()
      .defaultTo(0)

    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sheet')
};
