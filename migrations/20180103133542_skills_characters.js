
exports.up = function(knex, Promise) {
  return knex.schema.createTable('skills', (table) => {
    table.increments()

    table.integer('sheet_id')
      .references('id')
      .inTable('sheet')
      .onDelete('CASCADE')

    table.integer('skills_id')
      .references('id')
      .inTable('skills')
      .onDelete('CASCADE')

    table.boolean('is_profecient')

    table.boolean('is_trained')

    table.integer('ranks')

  })
};

exports.down = function(knex, Promise) {

};
