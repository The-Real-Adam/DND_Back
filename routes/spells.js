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

module.exports = router;
