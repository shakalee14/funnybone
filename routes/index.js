const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../database/db.js')

router.get('/', function(request, response){
  response.render('index')
})

router.get('/all', function(request, response){
  db.displayInventoryItems()
    .then( results => {
      response.render('inventory', {results})
    })
})

router.get('/about', function(request, response){
  response.render('about')
})

router.get('/contact', function(request, response){
  response.render('contact')
})

router.get('/apparel', function(request, response){
  db.displayInventoryItems()
    .then( results => {
      response.render('threads', {results})
    })
})

router.get('/art', function(request, response){
  db.displayItemsByCategory('art')
    .then( results => {
      response.render('art', {results})
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

router.get('/search', function(request, response){
  const { searchItem } = request.query

  db.searchItem(searchItem)
    .then( results => response.render('inventory', {results}))
    .catch(error => response.render('inventory', {error: 'no items match search'}))
})

module.exports = router
