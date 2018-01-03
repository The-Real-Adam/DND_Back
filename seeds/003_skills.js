
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('skills').insert([
        {id: 1, skill: 'acrobatics'},
        {id: 2, skill: 'appraise'},
        {id: 3, skill: 'bluff'},
        {id: 4, skill: 'climb'},
        {id: 5, skill: 'craft'},
        {id: 6, skill: 'diplomacy'},
        {id: 7, skill: 'disable_device'},
        {id: 8, skill: 'disguise'},
        {id: 9, skill: 'escape_artist'},
        {id: 10, skill: 'fly'},
        {id: 11, skill: 'handle_animal'},
        {id: 12, skill: 'heal'},
        {id: 13, skill: 'intimidate'},
        {id: 14, skill: 'knowledge_arcana'},
        {id: 15, skill: 'knowledge_dungeoneering'},
        {id: 16, skill: 'knowledge_engineering'},
        {id: 17, skill: 'knowledge_geography'},
        {id: 18, skill: 'knowledge_history'},
        {id: 19, skill: 'knowledge_local'},
        {id: 20, skill: 'knowledge_nature'},
        {id: 21, skill: 'knowledge_nobility'},
        {id: 22, skill: 'knowledge_planes'},
        {id: 23, skill: 'knowledge_religion'},
        {id: 24, skill: 'linguistics'},
        {id: 25, skill: 'perception'},
        {id: 26, skill: 'perform'},
        {id: 27, skill: 'profession'},
        {id: 28, skill: 'ride'},
        {id: 29, skill: 'sense_motive'},
        {id: 30, skill: 'slight_of_hand'},
        {id: 31, skill: 'spellcraft'},
        {id: 32, skill: 'stealth'},
        {id: 33, skill: 'survival'},
        {id: 34, skill: 'swim'},
        {id: 35, skill: 'use_magic_device'},
      ]);
    });
};
