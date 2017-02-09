const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../database/db')

router.post('/', function(request, response){
  let { name, description, available, quantity, img } = request.body
  db.createInventoryItem( name, description, available, quantity, img)
  .then( db.displayInventoryItems()
    .then( results =>  response.render('admin', {results}))
  )
})

router.post('/edit/:id', function(request, response){
  const { name, description, available, quantity, img } = request.body
  const id = request.params.id
  db.updateItem(name, description, available, quantity, img, id)
    .then( db.displayInventoryItems()
      .then( results =>  response.redirect(`/admin/details/${id}`))
    )
})

router.get('/details/:id', function(request, response){
  const id = request.params.id
  db.getItemDetailsById(id)
    .then( result => response.render('item', {result}))
})

router.get('/login', function(request, response){
  response.render('login', { message: request.flash('loginMessage')})
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}))

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/inventory',
  failureRedirect: '/login'
}))

router.get('/logout', function(request, response){
  request.logout()
  response.redirect('loggedout')
})

router.get('/loggedout', function(request, response){
  response.render('loggedout')
})

function isLoggedIn(request, response, next){
  if(request.isAuthenticated())
    return next();
  response.redirect('/admin')
}

module.exports = router
