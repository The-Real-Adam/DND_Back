
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('feats').del()
    .then(function () {
      // Inserts seed entries
      return knex('feats').insert([
        {id: 1, sheet_id: 2, name: 'Extra Hex', description: 'Add one extra hex from your list'},
        {id: 2, sheet_id: 2, name: 'Glorious Heat', description: 'When the player deals fire damage with a spell, she gains one hp per spell level, and can transfer a +1 bonus on the next attack to a friendly teammate'},
        {id: 3, sheet_id: 2, name: 'Evasion', description: 'When you would usually take half damage from a reflex saving throw, now take none.'},
      ])
      .then(() => {
        return knex.raw("SELECT setval('feats_id_seq',(SELECT MAX(id) FROM feats));")
      })
    })
}
