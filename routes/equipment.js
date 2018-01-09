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

router.post('/', function(req, res, next) {
  const {
    sheet_id,
    name,
    description,
    value
  } = req.body
  knex('equipment')
    .insert({
      sheet_id: sheet_id,
      name: name,
      description: description,
      value: value
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

  knex('equipment')
    .where('id', id)
    .then((equipment) => {
      console.log('equipment is: ', equipment)
      if (!equipment) {
        throw boom.create(404, 'Not Found')
      }

      console.log('reqbody',req.body);
      let myUpdate = {}

      if (req.body.name) {
        myUpdate.name = req.body.name
      }
      if (req.body.description) {
        myUpdate.description = req.body.description
      }
      if (req.body.value) {
        myUpdate.value = req.body.value
      }

      console.log('myUpdate', myUpdate);

      knex('equipment')
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
  knex('equipment')
    .where('id', id)
    .returning([
      'name',
      'description',
      'value'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})

module.exports = router;
