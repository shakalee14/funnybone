const pgp = require('pg-promise')
const connectionString = 'postgres://localhost:5432/funnybone'
const db = pgp(connectionString)
