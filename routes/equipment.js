'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('equipment')
    // .select('equipment.id', 'sheet_id', 'name', 'description', 'value')
    // .where('equipment.sheet_id', 'sheet.id')
    // .innerJoin('sheet', 'equipment.sheet_id', 'sheet.id')
    .select('equipment.id', 'sheet_id', 'name', 'description', 'value')
    .orderBy('id')
    .then((equipment) => {
      console.log('equipment is: ', equipment)

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(equipment))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('equipment')
  .select('equipment.id', 'sheet_id', 'name', 'description', 'value')
    .where('equipment.sheet_id', id)
    .innerJoin('sheet', 'equipment.sheet_id', 'sheet.id')
    .then((equipment) => {
      console.log('equipment is: ', equipment)
      if (equipment.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(equipment))
    })
    .catch((err) => next(err))
})

module.exports = router;
