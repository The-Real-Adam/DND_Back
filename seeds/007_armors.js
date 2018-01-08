
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('armors').del()
    .then(function () {
      // Inserts seed entries
      return knex('armors').insert([{
        id: 1,
        sheet_id: 2,
        armor: 'Mithril Chainshirt',
        armor_bonus: 4,
        max_dex_bonus: +3,
        arcane_failure: 25,
        weight: '10 lbs'
      },{
        id: 2,
        sheet_id: 1,
        armor: 'Mithril Chainshirt',
        armor_bonus: 4,
        max_dex_bonus: +3,
        arcane_failure: 25,
        weight: '10 lbs'
      },{
        id: 3,
        sheet_id: 2,
        armor: 'Heavy Plate',
        armor_bonus: 8,
        max_dex_bonus: -3,
        arcane_failure: 50,
        weight: '25 lbs'
      }])
      .then(() => {
        return knex.raw("SELECT setval('armors_id_seq',(SELECT MAX(id) FROM armors));")
      })
    })
}
