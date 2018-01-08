
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('spells').del()
    .then(function () {
      // Inserts seed entries
      return knex('spells').insert([{
        id: 1,
        sheet_id: 2,
        name: 'Fireball',
        casting_time: 'Standard Action',
        spell_level: 3,
        description: 'dusty grey',
        duration: 'instantaneous',
        range: '400 ft + 40 ft/lvl',
        targets: '40 ft radius',
        saving_throw: 'Reflex',
        spell_resistance: true
      },{
        id: 2,
        sheet_id: 2,
        name: 'prismatic spray',
        casting_time: 'Standard Action',
        spell_level: 7,
        description: 'dusty grey',
        duration: 'instantaneous',
        range: '60ft cone',
        targets: 'all',
        saving_throw: 'see table',
        spell_resistance: true
      }])
      .then(() => {
        return knex.raw("SELECT setval('spells_id_seq',(SELECT MAX(id) FROM spells));")
      })
    })
}
