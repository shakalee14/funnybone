const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', function(request, response){
  request.url < 2 ? response.render('admin') : response.redirect('/loggedout')
})

router.get('/login', function(request, response){
  response.render('login', { message: request.flash('loginMessage')})
})

router.get('/inventory', isLoggedIn, function(request, response){
  response.render('inventory', {
    user: request.user
  })
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
