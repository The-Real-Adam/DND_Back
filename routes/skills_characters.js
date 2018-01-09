'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.params.id
  knex('skills_character')
    .select('skills_character.id', 'sheet_id', 'skills_id', 'is_profecient', 'is_trained', 'ranks')
    .where('skills_character.sheet_id', 'sheet.id')
    .innerJoin('sheet', 'skills_character.sheet_id', 'sheet.id')
    // .select('id', 'sheet_id', 'skills_character_heading', 'skills_character_entry')
    // .orderBy('id')
    .then((skills_character) => {
      console.log('skills_character is: ', skills_character)

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(skills_character))
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  knex('skills_character')
  .select('skills_character.id', 'sheet_id', 'skills_character_heading', 'skills_character_entry', 'sheet.id')
    .where('skills_character.sheet_id', id)
    .innerJoin('sheet', 'skills_character.sheet_id', 'sheet.id')
    .then((skills_character) => {
      console.log('skills_character is: ', skills_character)
      if (skills_character.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(skills_character))
    })
    .catch((err) => next(err))
})

router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.sheet_id)
  knex('skills_character')
    .where('id', id)
    .first()
    .update({
      id: req.body.id,
      skills_character_heading: req.body.skills_character_heading,
      skills_character_entry: req.body.skills_character_entry
    }, '*')
    .then((skills_characterUpdate) => {
      let newUpdate ={
        id: skills_characterUpdate[0].id,
        skills_character_heading: skills_characterUpdate[0].skills_character_heading,
        skills_character_entry: skills_characterUpdate[0].skills_character_entry
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(newUpdate)
    })
    .catch((err) => next(err))
})

router.post('/', (req, res, next) => {
  knex('skills_character')
    .insert({
      sheet_id: req.body.sheet_id,
      skills_character_heading: req.body.skills_character_heading,
      skills_character_entry: req.body.skills_character_entry
    }, '*')
    .then((newJournal) => {
      let newRow = {
        sheet_id: newJournal[0].sheet_id,
        skills_character_heading: newJournal[0].skills_character_heading,
        skills_character_entry: newJournal[0].skills_character_entry
      }
      res.send(newRow)
    })
    .catch((err) => next(err))
})

// router.delete('/:id', (req, res, next) => {
//   const id = Number(req.params.id)
//   knex('skills_character')
//     .where('id', id)
//     .returning(['skills_character.id', 'sheet_id', 'skills_id', 'is_profecient', 'is_trained', 'ranks'])
//     .del()
//     .then((deletedRow) => {
//       res.send(deletedRow[0])
//     })
//     .catch((err) => next(err))
// })

module.exports = router;
