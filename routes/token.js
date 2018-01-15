const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_KEY


router.post('/', (req, res, next) => {
  console.log('Hit Post Route')
  const {
    email,
    password
  } = req.body

  if (!email || email.trim() === ('')) {
    console.log('no email')
    res.status(400)
    res.send('Bad email or password')
    return
  }

  if (!password || password.trim() === ('')) {
    console.log('no password')
    res.status(400)
    res.send('Bad email or password')
    return
  }

  if (email.includes('@')) {
    knex('users')
      .where('email', email)
      .first()
      .then((data) => {
        if(!data){
          res.sendStatus(404)
        }

        let match = bcrypt.compareSync(password, data.hashed_password)
        console.log('Match is a Match');
        if (!match) {
          res.sendStatus(404)
          return
        }

        console.log('Data in token is:',data);
        let token = jwt.sign({
          usersId: data.id
        }, SECRET)

        console.log('token is:', token)
        res.send({'token': token})
        res.status(200)
        delete data.hashed_password
        // res.send(data)
        return
      })
      .catch((err) => next(err))
  }

})

router.delete('/', (req, res, next) => {
  console.log('cookie-cleared. logged out')
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
