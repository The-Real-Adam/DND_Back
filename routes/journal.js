'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('journal')
    .select('journal.id', 'sheet_id', 'journal_heading', 'journal_entry')
    .where('journal.sheet_id', 'sheet.id')
    .innerJoin('sheet', 'journal.sheet_id', 'sheet.id')
    // .select('id', 'sheet_id', 'journal_heading', 'journal_entry')
    // .orderBy('id')
    .then((journal) => {
      console.log('journal is: ', journal)

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(journal))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('journal')
  .select('journal.id', 'sheet_id', 'journal_heading', 'journal_entry', 'sheet.id')
    .where('journal.sheet_id', id)
    .innerJoin('sheet', 'journal.sheet_id', 'sheet.id')
    .then((journal) => {
      console.log('journal is: ', journal)
      if (journal.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(journal))
    })
    .catch((err) => next(err))
})

router.post('/', function(req, res, next) {
  const {
    sheet_id,
    journal_heading,
    journal_entry
  } = req.body
  knex('journal')
    .insert({
      sheet_id: sheet_id,
      journal_heading: journal_heading,
      journal_entry: journal_entry
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

  knex('journal')
    .where('id', id)
    .then((journal) => {
      console.log('journal is: ', journal)
      if (!journal) {
        throw boom.create(404, 'Not Found')
      }

      console.log('reqbody',req.body);
      let myUpdate = {}

      if (req.body.journal_heading) {
        myUpdate.journal_heading = req.body.journal_heading
      }
      if (req.body.journal_entry) {
        myUpdate.journal_entry = req.body.journal_entry
      }

      console.log('myUpdate', myUpdate);

      knex('journal')
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
  knex('journal')
    .where('id', id)
    .returning([
      'journal_heading',
      'journal_entry'
    ])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})

module.exports = router;
