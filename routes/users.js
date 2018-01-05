var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .select('id', 'username', 'email')

});


router.post('/', (req, res, next) => {
  knex('users')
    .insert({
      username: req.body.username,
      email: req.body.email
    }, '*')
    .then((newUser) => {
      let newRow = {
        username: newUser[0].username,
        email: newUser[0].email
      }
      res.send(newRow)
    })
    .catch((err) => next(err))
})


module.exports = router;
