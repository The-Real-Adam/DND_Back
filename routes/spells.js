'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('spells')
    // .select('spells.id', 'sheet_id', 'name', 'description', 'value')
    // .where('spells.sheet_id', 'sheet.id')
    // .innerJoin('sheet', 'spells.sheet_id', 'sheet.id')
    .select('spells.id', 'sheet_id', 'name', 'casting_time', 'spell_level', 'description', 'duration', 'range', 'targets', 'saving_throw', 'spell_resistance')
    .orderBy('id')
    .then((spells) => {
      console.log('spells is: ', spells)

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(spells))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('spells')
  .select('spells.id', 'sheet_id', 'name', 'casting_time', 'spell_level', 'description', 'duration', 'range', 'targets', 'saving_throw', 'spell_resistance')
    .where('spells.sheet_id', id)
    .innerJoin('sheet', 'spells.sheet_id', 'sheet.id')
    .then((spells) => {
      console.log('spells is: ', spells)
      if (spells.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(spells))
    })
    .catch((err) => next(err))
})

router.post('/', function(req, res, next) {
  const {
    sheet_id,
    name,
    casting_time,
    spell_level,
    description,
    duration,
    range,
    targets,
    saving_throw,
    spell_resistance
  } = req.body
  knex('spells')
    .insert({
      sheet_id: sheet_id,
      name: name,
      casting_time: casting_time,
      spell_level: spell_level,
      description: description,
      duration: duration,
      range: range,
      targets: targets,
      saving_throw:saving_throw,
      spell_resistance: spell_resistance
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

  knex('spells')
    .where('id', id)
    .then((spells) => {
      console.log('spells is: ', spells)
      if (!spells) {
        throw boom.create(404, 'Not Found')
      }

      console.log('reqbody',req.body);
      let myUpdate = {}

      if (req.body.name) {
        myUpdate.name = req.body.name
      }
      if (req.body.casting_time) {
        myUpdate.casting_time = req.body.casting_time
      }
      if (req.body.spell_level) {
        myUpdate.spell_level = req.body.spell_level
      }
      if (req.body.description) {
        myUpdate.description = req.body.description
      }
      if (req.body.duration) {
        myUpdate.duration = req.body.duration
      }
      if (req.body.range) {
        myUpdate.range = req.body.range
      }
      if (req.body.targets) {
        myUpdate.targets = req.body.targets
      }
      if (req.body.saving_throw) {
        myUpdate.saving_throw = req.body.saving_throw
      }
      if (req.body.spell_resistance) {
        myUpdate.spell_resistance = req.body.spell_resistance
      }

      console.log('myUpdate', myUpdate);

      knex('spells')
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
  knex('spells')
    .where('id', id)
    .returning([
      'name',
      'casting_time',
      'spell_level',
      'description',
      'duration',
      'range',
      'targets',
      'saving_throw',
      'spell_resistance'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})

module.exports = router;
