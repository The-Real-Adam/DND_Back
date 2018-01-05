exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sheet').del()
    .then(function () {
      // Inserts seed entries
      return knex('sheet').insert([{
        id: 1,
        users_id: 1,
        char_name: 'Hantas',
        char_class: 'Yurtbane',
        char_size: 'M',
        char_align: 'CG',
        char_race: 'Half-Elf',
        char_weight: '185 lbs',
        char_age: 25,
        char_height: '6 feet',
        char_languages: 'Hallit, Common, Celestial',
        strength: 10,
        dexterity: 12,
        constution: 14,
        intellect: 12,
        wisdom: 22,
        charisma: 8,
        max_hp: 155,
        current_hp: 85,
        armor_class: 24,
        fortitude: 11,
        reflex: 8,
        will: 15
      }])
      .then(() => {
        return knex.raw("SELECT setval('sheet_id_seq',(SELECT MAX(id) FROM sheet));")
      })
    })
}
