
module.exports = {

  development: {
    client: 'pg',
    connection: `postgres://${process.env.USER}@localhost:5432/weather-app`,
    migrations: {
        directory: __dirname + '/migrations',
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: __dirname + '/seeds',
        tableName: 'knex_seeds'
    }
  }
}
