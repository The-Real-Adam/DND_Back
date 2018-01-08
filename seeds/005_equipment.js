
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipment').del()
    .then(function () {
      // Inserts seed entries
      return knex('equipment').insert([{
        id: 1,
        sheet_id: 2,
        name: 'Ioun Stone',
        description: 'dusty grey',
        value: '250gp'
      },{
        id: 2,
        sheet_id: 2,
        name: 'Torch',
        description: 'if(isOnFire === true) hold non-glowy end',
        value: '50gp'
      },{
        id: 3,
        sheet_id: 2,
        name: 'goblet of infinite ale',
        description: 'pearl encrusted and smells of mead',
        value: '2250gp'
      }])
      .then(() => {
        return knex.raw("SELECT setval('equipment_id_seq',(SELECT MAX(id) FROM equipment));")
      })
    })
}
