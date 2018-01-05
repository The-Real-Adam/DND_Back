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
  // code goes here
})

router.patch('/:id', function(req, res, next) {
  const id = Number(req.params.id)
  const {
    char_name,
    char_class,
    char_size,
    char_align,
    char_race,
    char_weight,
    char_age,
    char_height,
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
  // code goes here
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
