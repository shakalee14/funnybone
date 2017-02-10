const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../database/db')

router.get('/', function(request, response){
  if(request.url.length > 40 ){
    db.displayInventoryItems()
    .then( results => {
      response.render('admin', {results})
    })
  } else {
    response.redirect('/loggedout')
  }
})

router.post('/', function(request, response){
  const { name, description, available, quantity, img } = request.body
  db.createInventoryItem( request.body )
    .then( db.displayInventoryItems()
      .then( results => {
        response.render('admin', {results})
      })
    )
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
