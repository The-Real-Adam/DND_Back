exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Adam', email: '73maxwell@gmail.com', hashed_password: '$2a$12$U2EMt2ABpe5l4bzNLlxQXOzkaKhnKjJadYX2ilQnnA70yL9meGA/G'}
      ])
      .then(() => {
        return knex.raw("SELECT setval('users_id_seq',(SELECT MAX(id) FROM users));")
      })
    })
}
