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

router.post('/', function(req, res, next) {
  const {
    sheet_id,
    armor,
    armor_bonus,
    max_dex_bonus,
    arcane_failure,
    weight
  } = req.body
  knex('armors')
    .insert({
      sheet_id: sheet_id,
      armor: armor,
      armor_bonus: armor_bonus,
      max_dex_bonus: max_dex_bonus,
      arcane_failure: arcane_failure,
      weight:weight
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

  knex('armors')
    .where('id', id)
    .then((armors) => {
      console.log('armors is: ', armors)
      if (!armors) {
        throw boom.create(404, 'Not Found')
      }

      console.log('reqbody',req.body);
      let myUpdate = {}

      if (req.body.armor) {
        myUpdate.armor = req.body.armor
      }
      if (req.body.armor_bonus) {
        myUpdate.armor_bonus = req.body.armor_bonus
      }
      if (req.body.max_dex_bonus) {
        myUpdate.max_dex_bonus = req.body.max_dex_bonus
      }
      if (req.body.arcane_failure) {
        myUpdate.arcane_failure = req.body.arcane_failure
      }
      if (req.body.weight) {
        myUpdate.weight = req.body.weight
      }

      console.log('myUpdate', myUpdate);

      knex('armors')
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
  knex('armors')
    .where('id', id)
    .returning([
      'sheet_id',
      'armor',
      'armor_bonus',
      'max_dex_bonus',
      'arcane_failure',
      'weight'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})


module.exports = router;
