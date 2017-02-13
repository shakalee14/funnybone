const pgp = require('pg-promise')()
const CONNECTION_STRING = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : `postgres://${process.env.USER}@localhost:5432/funnybone`
const db = pgp(CONNECTION_STRING)

const createInventoryItem = function(name, description, category, cost, size, available, quantity, img){
  const sql = `
  INSERT INTO inventory
    (name, description, category, cost, size, available, quantity, img)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8)
  `
  return db.any(sql, [name, description, category, cost, size, available, quantity, img])
}

const displayInventoryItems = function(){
  const sql = `
    SELECT * FROM inventory
    WHERE available=true
  `
  return db.any(sql)
}

const displayAllInventoryItems = function(){
  const sql = `
    SELECT * FROM inventory
  `
  return db.any(sql)
}

const displayItemsByCategory = function(category){
  const sql = `
    SELECT * FROM inventory
    WHERE category=$1
  `
  return db.any(sql, [category])
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

const updateItem = function(name, description, category, cost, size, available, quantity, img, id){
  const sql = `
    UPDATE inventory
    SET name=$1,
    description=$2,
    category=$3,
    cost=$4,
    size=$5,
    available=$6,
    quantity=$7,
    img=$8
    WHERE id=$9
    RETURNING *;
  `

  return db.any(sql, [name, description, category, cost, size, available, quantity, img, id])
}

module.exports = {
  createInventoryItem,
  displayInventoryItems,
  archiveItem,
  getItemDetailsById,
  updateItem,
  searchItem,
  displayItemsByCategory,
  displayAllInventoryItems
}
