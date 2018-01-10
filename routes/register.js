const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

let registered

router.post('/', (req, res, next) => {

  const {
    email,
    password
  } = req.body


  if (!email || !email.trim()) {
    res.status(400)
    res.send('Email must not be empty')
    return
  }

  if (!password || !password.trim()) {
    res.status(400)
    res.send('Password must not be empty')
    return
  }


  bcrypt.hash(password, 5, (err, hash) => {
    knex('users')
      .insert({
        email,
        hashed_password: hash
      }, '*')
      .then((data) => {
        delete data.created_at
        delete data.updated_at
        delete data.hashed_password

      knex('users')
        .update({
          users_id: data[0].id
        })
        .where('id', data[0].id)
          .then(() => {
            registered = data
            res.status(200)
            res.send(registered[0])
          })

      })
      .catch((err) => {
        next(err)
      })
  })
})


module.exports = router
