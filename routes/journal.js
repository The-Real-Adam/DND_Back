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

router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.sheet_id)
  knex('journal')
    .where('id', id)
    .first()
    .update({
      id: req.body.id,
      journal_heading: req.body.journal_heading,
      journal_entry: req.body.journal_entry
    }, '*')
    .then((journalUpdate) => {
      let newUpdate ={
        id: journalUpdate[0].id,
        journal_heading: journalUpdate[0].journal_heading,
        journal_entry: journalUpdate[0].journal_entry
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(newUpdate)
    })
    .catch((err) => next(err))
})

router.post('/', (req, res, next) => {
  knex('journal')
    .insert({
      sheet_id: req.body.sheet_id,
      journal_heading: req.body.journal_heading,
      journal_entry: req.body.journal_entry
    }, '*')
    .then((newJournal) => {
      let newRow = {
        sheet_id: newJournal[0].sheet_id,
        journal_heading: newJournal[0].journal_heading,
        journal_entry: newJournal[0].journal_entry
      }
      res.send(newRow)
    })
    .catch((err) => next(err))
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  knex('journal')
    .where('id', id)
    .returning(['id', 'journal_heading', 'journal_entry'])
    .del()
    .then((deletedRow) => {
      res.send(deletedRow[0])
    })
    .catch((err) => next(err))
})

module.exports = router;
