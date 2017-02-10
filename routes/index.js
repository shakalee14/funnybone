const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../database/db.js')

router.get('/', function(request, response){
  db.displayInventoryItems()
    .then( results => {
      response.render('index', {results})
    })
})

router.get('/apparel', function(request, response){
  db.displayInventoryItems()
    .then( results => {
      response.render('inventory', {results})
    })
})

router.get('/apparel/details', function(request, response){
  const { id }  = request.body
  db.getItemDetailsById(id)
    .then( result => {
      response.json(result)
    })
})

router.post('/archive/:id', function(request, response){
  const { id } = request.params
  db.archiveItem(id)
  .then( response.redirect('/'))
})

module.exports = router
