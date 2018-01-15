const knex = require('../knex');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_KEY

const auth = (req, res, next) => {
  console.log('SECRET IN SHEETS IS: ', SECRET)
  console.log('cookies', req.cookies)
  jwt.verify(req.cookies['dnd-jwt'], SECRET, (err, payload) => {
    if (err) {
      console.log('you hit your own error code dumbass', err);
      res.sendStatus(401)
    }
    console.log('before payload', payload);
    req.payload = payload
    console.log("payload: >>>", payload)
    next()
  })
}

router.get('/', auth, function(req, res, next) {
  let id = req.payload.usersId
  knex('sheet')
    .select('id','char_name','char_class', 'char_level', 'users_id')
    .where('users_id', id)
    .then((sheet) => {
      if (sheet.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(sheet))
    })
    .catch((err) => next(err))
})

router.get('/:id', auth, function(req, res, next) {
  const id = Number(req.params.id)
  knex('sheet')
    .select(
      'id',
      'users_id',
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

router.post('/', auth, function(req, res, next) {
  let user_id = req.payload.usersId
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
    users_id: user_id
  }, '*')
  .then(() => {
    console.log('should render')
    res.sendStatus('200')
  })
})

router.patch('/:id', auth, function(req, res, next) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return next()
  }

  knex('sheet')
    .where('id', id)
    .then((sheet) => {
      console.log('sheet is: ', sheet)
      if (!sheet) {
        throw boom.create(404, 'Not Found')
      }

      console.log('reqbody',req.body);
      let myUpdate = {}

      if (req.body.char_name) {
        myUpdate.char_name = req.body.char_name
      }
      if (req.body.char_class) {
        myUpdate.char_class = req.body.char_class
      }
      if (req.body.char_size) {
        myUpdate.char_size = req.body.char_size
      }
      if (req.body.char_align) {
        myUpdate.char_align = req.body.char_align
      }
      if (req.body.char_race) {
        myUpdate.char_race = req.body.char_race
      }
      if (req.body.char_weight) {
        myUpdate.char_weight = req.body.char_weight
      }
      if (req.body.char_age) {
        myUpdate.char_age = req.body.char_age
      }
      if (req.body.char_height) {
        myUpdate.char_height = req.body.char_height
      }
      if (req.body.char_gender) {
         myUpdate.char_gender = req.body.char_gender
       }
      if (req.body.char_languages) {
        myUpdate.char_languages = req.body.char_languages
      }
      if (req.body.char_level) {
        myUpdate.char_level = req.body.char_level
      }
      if (req.body.initative) {
        myUpdate.initative = req.body.initative
      }
      if (req.body.sr) {
        myUpdate.sr = req.body.sr
      }
      if (req.body.dr) {
        myUpdate.dr = req.body.dr
      }
      if (req.body.speed) {
        myUpdate.speed = req.body.speed
      }
      if (req.body.strength) {
        myUpdate.strength = req.body.strength
      }
      if (req.body.dexterity) {
        myUpdate.dexterity = req.body.dexterity
      }
      if (req.body.constution) {
        myUpdate.constution = req.body.constution
      }
      if (req.body.intellect) {
        myUpdate.intellect = req.body.intellect
      }
      if (req.body.wisdom) {
        myUpdate.wisdom = req.body.wisdom
      }
      if (req.body.charisma) {
        myUpdate.charisma = req.body.charisma
      }
      if (req.body.bab_1) {
        myUpdate.bab_1 = req.body.bab_1
      }
      if (req.body.bab_2) {
        myUpdate.bab_2 = req.body.bab_2
      }
      if (req.body.bab_3) {
        myUpdate.bab_3 = req.body.bab_3
      }
      if (req.body.bab_4) {
        myUpdate.bab_4 = req.body.bab_4
      }
      if (req.body.cmb) {
        myUpdate.cmb = req.body.cmb
      }
      if (req.body.cmd) {
        myUpdate.cmd = req.body.cmd
      }
      if (req.body.max_hp) {
        myUpdate.max_hp = req.body.max_hp
      }
      if (req.body.current_hp) {
        myUpdate.current_hp = req.body.current_hp
      }
      if (req.body.armor_class) {
        myUpdate.armor_class = req.body.armor_class
      }
      if (req.body.fortitude) {
        myUpdate.fortitude = req.body.fortitude
      }
      if (req.body.reflex) {
        myUpdate.reflex = req.body.reflex
      }
      if (req.body.will) {
        myUpdate.will = req.body.will
      }

      console.log('myUpdate', myUpdate);
      knex('sheet')
        .where('id', id)
        .update(myUpdate)
        .then((row) => {
          console.log('row', row);
          res.sendStatus(200)
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
