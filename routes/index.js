const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', function(request, response){
  request.url.length > 40 ? response.render('admin') : response.render('index')
})

module.exports = router
