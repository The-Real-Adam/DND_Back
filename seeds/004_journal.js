
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('journal').del()
    .then(function () {
      // Inserts seed entries
      return knex('journal').insert([{
          id: 1,
          sheet_id: 1,
          journal_heading: 'A test',
          journal_entry: 'this has been a test of the emergency journal system'
        }, {
          id: 2,
          sheet_id: 2,
          journal_heading: 'sheet_id === 2',
          journal_entry: 'this has been a test of the emergency journal system'
        }, {
          id: 3,
          sheet_id: 2,
          journal_heading: 'sheet_id === 2 x 2',
          journal_entry: 'this has been a test of the emergency journal system'
        }])
      .then(() => {
        return knex.raw("SELECT setval('journal_id_seq',(SELECT MAX(id) FROM journal));")
      })
    })
}
