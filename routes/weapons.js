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

module.exports = router;
