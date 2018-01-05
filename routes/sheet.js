const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  // code goes here
})

router.get('/:id', function(req, res, next) {
  const id = Number(req.params.id)
  knex('sheet')
    .select(
      'char_name',
      'char_class',
      'char_size',
      'char_align',
      'char_race',
      'char_weight',
      'char_age',
      'char_height',
      'char_gender',
      'char_languages',
      'char_level',
      'initative',
      'sr',
      'dr',
      'speed',
      'strength',
      'dexterity',
      'constution',
      'intellect',
      'wisdom',
      'charisma',
      'bab_1',
      'bab_2',
      'bab_3',
      'bab_4',
      'cmb',
      'cmd',
      'max_hp',
      'current_hp',
      'armor_class',
      'fortitude',
      'reflex',
      'will'
    )
    .where('id', id)
    .then((sheet) => {
      if (sheet.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(sheet[0]))
    })
    .catch((err) => next(err))
})

router.post('/', function(req, res, next) {
  const {
    char_name,
    char_class,
    char_size,
    char_align,
    char_race,
    char_weight,
    char_age,
    char_height,
    char_gender,
    char_languages,
    char_level,
    initative,
    sr,
    dr,
    speed,
    strength,
    dexterity,
    constution,
    intellect,
    wisdom,
    charisma,
    bab_1,
    bab_2,
    bab_3,
    bab_4,
    cmb,
    cmd,
    max_hp,
    current_hp,
    armor_class,
    fortitude,
    reflex,
    will,
    users_id
  } = req.body
  knex('sheet')
  .insert({
    char_name: char_name,
    char_class: char_class,
    char_size: char_size,
    char_align: char_align,
    char_race: char_race,
    char_weight: char_weight,
    char_age: char_age,
    char_height: char_height,
    char_gender: char_gender,
    char_languages: char_languages,
    char_level: char_level,
    initative: initative,
    sr: sr,
    dr: dr,
    speed: speed,
    strength: strength,
    dexterity: dexterity,
    constution: constution,
    intellect: intellect,
    wisdom: wisdom,
    charisma: charisma,
    bab_1: bab_1,
    bab_2: bab_2,
    bab_3: bab_3,
    bab_4: bab_4,
    cmb: cmb,
    cmd: cmd,
    max_hp: max_hp,
    current_hp: current_hp,
    armor_class: armor_class,
    fortitude: fortitude,
    reflex: reflex,
    will: will,
    users_id: users.id
  }, '*')
  .then(() => {
    console.log('should render')
    res.redirect('/:id')
  })
})

router.patch('/:id', function(req, res, next) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next()
  }

  knex('sheet')
    .where('id', id)
    .then((rows) => {
      if (!rows) {
        throw boom.create(404, 'Not Found')
      }

      const {
        char_name,
        char_class,
        char_size,
        char_align,
        char_race,
        char_weight,
        char_age,
        char_height,
        char_gender,
        char_languages,
        char_level,
        initative,
        sr,
        dr,
        speed,
        strength,
        dexterity,
        constution,
        intellect,
        wisdom,
        charisma,
        bab_1,
        bab_2,
        bab_3,
        bab_4,
        cmb,
        cmd,
        max_hp,
        current_hp,
        armor_class,
        fortitude,
        reflex,
        will
      } = req.body

      const updateRow = {}

      if (char_name) { updateRow.char_name = char_name }
      if (char_class) { updateRow.char_class = char_class }
      if (char_size) { updateRow.char_size = char_size }
      if (char_align) { updateRow.char_align = char_align }
      if (char_race) { updateRow.char_race = char_race }
      if (char_weight) { updateRow.char_weight = char_weight }
      if (char_age) { updateRow.char_age = char_age }
      if (char_height) { updateRow.char_height = char_height }
      if (char_gender) { updateRow.char_gender = char_gender }
      if (char_languages) { updateRow.char_languages = char_languages }
      if (char_level) { updateRow.char_level = char_level }
      if (initative) { updateRow.initative = initative }
      if (sr) { updateRow.sr = sr }
      if (dr) { updateRow.dr = dr }
      if (speed) { updateRow.speed = speed }
      if (strength) { updateRow.strength = strength }
      if (dexterity) { updateRow.dexterity = dexterity }
      if (constution) { updateRow.constution = constution }
      if (intellect) { updateRow.intellect = intellect }
      if (wisdom) { updateRow.wisdom = wisdom }
      if (charisma) { updateRow.charisma = charisma }
      if (bab_1) { updateRow.bab_1 = bab_1 }
      if (bab_2) { updateRow.bab_2 = bab_2 }
      if (bab_3) { updateRow.bab_3 = bab_3 }
      if (bab_4) { updateRow.bab_4 = bab_4 }
      if (cmb) { updateRow.cmb = cmb }
      if (cmd) { updateRow.cmd = cmd }
      if (max_hp) { updateRow.max_hp = max_hp }
      if (current_hp) { updateRow.current_hp = current_hp }
      if (armor_class) { updateRow.armor_class = armor_class }
      if (fortitude) { updateRow.fortitude = fortitude }
      if (reflex) { updateRow.reflex = reflex }
      if (will) { updateRow.will = will }

      knex('sheet')
        .update(updateRow, '*')
        .where('id', id)
        .then((row) => {
          res.send(row[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', function(req, res, next) {
  const id = Number(req.params.id)
  knex('sheet')
    .where('id', id)
    .returning([
      'char_name',
      'char_class',
      'char_size',
      'char_align',
      'char_race',
      'char_weight',
      'char_age',
      'char_height',
      'char_gender',
      'char_languages',
      'char_level',
      'initative',
      'sr',
      'dr',
      'speed',
      'strength',
      'dexterity',
      'constution',
      'intellect',
      'wisdom',
      'charisma',
      'bab_1',
      'bab_2',
      'bab_3',
      'bab_4',
      'cmb',
      'cmd',
      'max_hp',
      'current_hp',
      'armor_class',
      'fortitude',
      'reflex',
      'will'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})


module.exports = router
