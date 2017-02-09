const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/funnybone'
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

const getItemDetailsById = function(id){
  const sql = `
    SELECT * FROM inventory WHERE id=$1;
  `
  return db.one(sql, [id])
}

const archiveItem = function(id){
  const sql = `
    UPDATE inventory
    SET available=false
    WHERE id=$1
  `
  return db.none(sql, [id])
}

module.exports = {
  createInventoryItem,
  displayInventoryItems,
  archiveItem,
  getItemDetailsById
}
