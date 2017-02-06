const express = require('express')
const router = express.Router()
const passport = require('passport')

module.exports = function(app, passport){
  router.get('/', function(request, response){
    response.render('admin')
  })

  router.get('/login', function(request, response){
    response.render('login', { message: request.flash('loginMessage')})
  })

  router.get('/inventory', isLoggedIn, function(request, response){
    response.render('inventory', {
      user: request.user
    })
  })

  router.get( '/logout', function( request, response ){
    request.logout()
    response.redirect('/')
  })

  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}))

  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
}

function isLoggedIn(request, response, next){
  if(request.isAuthenticated())
    return next();

  response.redirect('/')
}
