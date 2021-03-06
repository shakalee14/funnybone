const pgp = require('pg-promise')()
const env = require('dotenv').config()
const connectionString = process.env.connectionString
const db = pgp(connectionString)

const createInventoryItem = function( name, description, category, cost, size, available, quantity, img ){
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

const updateItem = function(name, description, available, quantity, img, id){
  const sql = `
    UPDATE inventory
    SET name=$1,
    description=$2,
    available=$3,
    quantity=$4,
    img=$5
    WHERE id=$6
    RETURNING *;
  `
  return db.any(sql, [name, description, available, quantity, img, id])
}

const searchItem = function(searchItem) {
  const term = searchItem.toLowerCase()
  const sql = `
    SELECT *
    FROM inventory
    WHERE lower(name)
    LIKE '%${term}%'
    OR lower(description)
    LIKE '%${term}%'
  `
  return db.any(sql)
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
