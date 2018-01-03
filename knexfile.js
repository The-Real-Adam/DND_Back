// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/DND_back'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/DND_back'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
