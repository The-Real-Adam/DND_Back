
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('weapons').del()
    .then(function () {
      // Inserts seed entries
      return knex('weapons').insert([{
        id: 1,
        sheet_id: 2,
        weapon: 'Staff',
        type: 'Simple',
        damage: '1d6 * 1d6',
        critical: 'x2',
        range: '---',
        damage_type: 'bludgeoning',
        special: '---',
        weight: '5 lbs'
      },{
        id: 2,
        sheet_id: 2,
        weapon: 'Whip',
        type: 'Exotic',
        damage: '1d4',
        critical: 'x3',
        range: '15ft',
        damage_type: 'slashing',
        special: 'trip, disarm',
        weight: '5 lbs'
      },{
        id: 3,
        sheet_id: 2,
        weapon: 'warhammer',
        type: 'Martial',
        damage: '1d8',
        critical: 'x3',
        range: '---',
        damage_type: 'bludgeoning',
        special: '---',
        weight: '5 lbs'
      }])
      .then(() => {
        return knex.raw("SELECT setval('weapons_id_seq',(SELECT MAX(id) FROM weapons));")
      })
    })
}
