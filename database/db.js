const pgp = require('pg-promise')
const connectionString = process.env.connectionString
const db = pgp(connectionString)

const createInventoryItem = function( name, description, available, quantity, img ){
  const sql = `
  INSERT INTO inventory
    (name, description, available, quantity, img)
  values
    ($1, $2, $3, $4, $5)
  `
  return db.any(sql, [name, description, available, quantity, img])
}

const displayInventoryItems = function(){
  const sql = `
    SELECT * FROM inventory
    WHERE available=true
  `
  return db.any(sql)
}

module.exports = {
  createInventoryItem: createInventoryItem,
  displayInventoryItems: displayInventoryItems
}
