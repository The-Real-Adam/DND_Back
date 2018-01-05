exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sheet').del()
    .then(function () {
      // Inserts seed entries
      return knex('sheet').insert([{
        id:1,
        users_id: 1,
        char_name: "Hantas Yurtbane",
        char_class: "Shaman",
        char_size: "M",
        char_align: "CG",
        char_race: "Half-Elf",
        char_weight: "185 lbs",
        char_age: 25,
        char_height: "6 feet",
        char_languages: "Hallit, Common, Celestial",
        char_level: 17,
        initative: 4,
        sr: 5,
        dr: 10,
        speed: 30,
        strength: 10,
        dexterity: 12,
        constution: 14,
        intellect: 12,
        wisdom: 22,
        charisma: 8,
        bab_1: 17,
        bab_2: 12,
        bab_3: 7,
        bab_4: 2,
        cmb: 12,
        cmd: 24,
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
