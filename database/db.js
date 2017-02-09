const pgp = require('pg-promise')
const connectionString = process.env.connectionString
const db = pgp(connectionString)
