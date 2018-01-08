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

module.exports = router;
