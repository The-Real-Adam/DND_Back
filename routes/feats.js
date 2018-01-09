'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('feats')
    // .select('feats.id', 'sheet_id', 'name', 'description', 'value')
    // .where('feats.sheet_id', 'sheet.id')
    // .innerJoin('sheet', 'feats.sheet_id', 'sheet.id')
    .select('feats.id', 'sheet_id', 'name', 'description')
    .orderBy('id')
    .then((feats) => {
      console.log('feats is: ', feats)

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(feats))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('feats')
  .select('feats.id', 'sheet_id', 'name', 'description')
    .where('feats.sheet_id', id)
    .innerJoin('sheet', 'feats.sheet_id', 'sheet.id')
    .then((feats) => {
      console.log('feats is: ', feats)
      if (feats.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(feats))
    })
    .catch((err) => next(err))
})

router.post('/', function(req, res, next) {
  const {
    sheet_id,
    name,
    description
  } = req.body
  knex('feats')
    .insert({
      sheet_id: sheet_id,
      name: name,
      description: description
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

  knex('feats')
    .where('id', id)
    .then((feats) => {
      console.log('feats is: ', feats)
      if (!feats) {
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

      console.log('myUpdate', myUpdate);

      knex('feats')
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
  knex('feats')
    .where('id', id)
    .returning([
      'name',
      'description'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})

module.exports = router;
