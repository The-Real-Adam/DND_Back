'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('armors')
    // .select('armors.id', 'sheet_id', 'name', 'description', 'value')
    // .where('armors.sheet_id', 'sheet.id')
    // .innerJoin('sheet', 'armors.sheet_id', 'sheet.id')
    .select('armors.id', 'sheet_id', 'armor', 'armor_bonus', 'max_dex_bonus', 'arcane_failure', 'weight')
    .orderBy('id')
    .then((armors) => {
      console.log('armors is: ', armors)

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(armors))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('armors')
  .select('armors.id', 'sheet_id', 'armor', 'armor_bonus', 'max_dex_bonus', 'arcane_failure', 'weight')
    .where('armors.sheet_id', id)
    .innerJoin('sheet', 'armors.sheet_id', 'sheet.id')
    .then((armors) => {
      console.log('armors is: ', armors)
      if (armors.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(armors))
    })
    .catch((err) => next(err))
})

module.exports = router;
