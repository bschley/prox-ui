import knex from 'knex';

const knexClient = knex({
  client: 'sqlite3',
  connection: {
    filename: "../db/main.db",
  }
});

export default knexClient;