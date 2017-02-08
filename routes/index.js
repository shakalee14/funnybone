const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../database/db.js')

router.get('/', function(request, response){
  if( request.url.length > 40 ){
    db.displayInventoryItems()
    .then( results => {
      response.render('admin', {results})
    })
  } else {
    db.displayInventoryItems()
    .then( results => {
      response.render('index', {results})
    })
  }
})

router.get('/apparel', function(request, response){
  db.displayInventoryItems()
  .then( results => {
    response.render('inventory', {results})
  })
})

router.post('/archive/:id', function(request, response){
  let id = request.params.id
  db.archiveItem(id)
  .then( response.redirect('/'))
})




module.exports = router
