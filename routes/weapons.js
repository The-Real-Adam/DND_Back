'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('weapons')
    // .select('weapons.id', 'sheet_id', 'name', 'description', 'value')
    // .where('weapons.sheet_id', 'sheet.id')
    // .innerJoin('sheet', 'weapons.sheet_id', 'sheet.id')
    .select('weapons.id', 'sheet_id', 'weapon', 'type', 'damage', 'critical', 'range', 'damage_type', 'special', 'weight')
    .orderBy('id')
    .then((weapons) => {
      console.log('weapons is: ', weapons)
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(weapons))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('weapons')
    .select('weapons.id', 'sheet_id', 'weapon', 'type', 'damage', 'critical', 'range', 'damage_type', 'special', 'weight')
    .where('weapons.sheet_id', id)
    .innerJoin('sheet', 'weapons.sheet_id', 'sheet.id')
    .then((weapons) => {
      console.log('weapons is: ', weapons)
      if (weapons.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(weapons))
    })
    .catch((err) => next(err))
})

router.post('/', function(req, res, next) {
  const {
    sheet_id,
    weapon,
    type,
    damage,
    critical,
    range,
    damage_type,
    special,
    weight
  } = req.body
  knex('weapons')
    .insert({
      sheet_id: sheet_id,
      weapon: weapon,
      type: type,
      damage: damage,
      critical: critical,
      range: range,
      damage_type: damage_type,
      special: special,
      weight: weight
    }, '*')
    .then(() => {
      console.log('should render')
      res.sendStatus(200)
    })
})

router.patch('/:id', function(req, res, next) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return next()
  }

  knex('weapons')
    .where('id', id)
    .then((weapons) => {
      console.log('weapons is: ', weapons)
      if (!weapons) {
        throw boom.create(404, 'Not Found')
      }

      console.log('reqbody',req.body);
      let myUpdate = {}

      if (req.body.weapon) {
        myUpdate.weapon = req.body.weapon
      }
      if (req.body.type) {
        myUpdate.type = req.body.type
      }
      if (req.body.damage) {
        myUpdate.damage = req.body.damage
      }
      if (req.body.critical) {
        myUpdate.critical = req.body.critical
      }
      if (req.body.range) {
        myUpdate.range = req.body.range
      }
      if (req.body.damage_type) {
        myUpdate.damage_type = req.body.damage_type
      }
      if (req.body.special) {
        myUpdate.special = req.body.special
      }
      if (req.body.weight) {
        myUpdate.weight = req.body.weight
      }


      console.log('myUpdate', myUpdate);

      knex('weapons')
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
  knex('weapons')
    .where('id', id)
    .returning([
      'sheet_id',
      'weapon',
      'type',
      'damage',
      'critical',
      'range',
      'damage_type',
      'special',
      'weight'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})


module.exports = router;
