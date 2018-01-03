
exports.up = function(knex, Promise) {
  return knex.schema.createTable('skills', (table) => {
    table.increments()

    table.integer('acrobatics')
      .defaultTo('')

    table.integer('appraise')
      .defaultTo('')

    table.integer('bluff')
      .defaultTo('')

    table.integer('climb')
      .defaultTo('')

    table.integer('craft')
      .defaultTo('')

    table.integer('diplomacy')
      .defaultTo('')

    table.integer('disable_device')
      .defaultTo('')

    table.integer('disguise')
      .defaultTo('')

    table.integer('escape_artist')
      .defaultTo('')

    table.integer('fly')
      .defaultTo('')

    table.integer('handle_animal')
      .defaultTo('')

    table.integer('heal')
      .defaultTo('')

    table.integer('intimidate')
      .defaultTo('')

    table.integer('knowledge')
      .defaultTo('')

    table.integer('knowledge')
      .defaultTo('')

    table.integer('knowledge')
      .defaultTo('')

    table.integer('knowledge')
      .defaultTo('')

    table.integer('knowledge')
      .defaultTo('')

    table.integer('knowledge')
      .defaultTo('')

    table.integer('linguistics')
      .defaultTo('')

    table.integer('perception')
      .defaultTo('')

    table.integer('perform')
      .defaultTo('')

    table.integer('profession')
      .defaultTo('')

    table.integer('ride')
      .defaultTo('')

    table.integer('sense_motive')
      .defaultTo('')

    table.integer('slight_of_hand')
      .defaultTo('')

    table.integer('spellcraft')
      .defaultTo('')

    table.integer('stealth')
      .defaultTo('')

    table.integer('survival')
      .defaultTo('')

    table.integer('swim')
      .defaultTo('')

    table.integer('use_magic_device')
      .defaultTo('')

    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('skills')
};
