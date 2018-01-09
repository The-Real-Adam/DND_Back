
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills_character').del()
    .then(function () {
      // Inserts seed entries
      return knex('skills_character').insert([{
        id: 1,
        sheet_id: 2,
        skills_id: 2,
        is_profecient: true,
        is_trained: true,
        ranks: 4
      },{
        id: 2,
        sheet_id: 2,
        skills_id: 3,
        is_profecient: true,
        is_trained: true,
        ranks: 9
      },{
        id: 3,
        sheet_id: 2,
        skills_id: 7,
        is_profecient: false,
        is_trained: false,
        ranks: 4
      }])
        .then(() => {
          return knex.raw("SELECT setval('skills_character_id_seq',(SELECT MAX(id) FROM skills_character));")
        })

    })
}
