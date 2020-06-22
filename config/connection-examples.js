// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
  //postgress staging example
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  // My sql production example
  production: {
    client: 'mysql',
    connection: {
      host: mysqlDbConfig.HOST,
      database: mysqlDbConfig.DB,
      user:     mysqlDbConfig.USER,
      password: mysqlDbConfig.PASSWORD,
      options: {
        port: mysqlDbConfig.PORT
      }
    },
    debug: true,
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        console.log('Connection made!');
          done(false, conn)
        }
    }
  }

};
