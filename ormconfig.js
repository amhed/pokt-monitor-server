const config = {
  type: process.env.NODESTACK_DB_ENGINE,
  host: process.env.NODESTACK_DB_HOST,
  port: Number(process.env.NODESTACK_DB_PORT),
  username: process.env.NODESTACK_DB_USERNAME,
  password: process.env.NODESTACK_DB_PASSWORD,
  database: process.env.NODESTACK_DB_DATABASE,
  synchronize: false,
  logging: true,
  extra: { 
    ssl: process.env.NODE_ENV !== 'development'
  },
  entities: [
    'src/entities/**/*.ts'
  ],
  migrations: [
    'dist/migrations/**/*.js'
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations'
  }
}

module.exports = config