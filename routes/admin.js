const express = require('express')
const router = express.Router()

router.get('/', function(request, response){
  response.render('admin')
})

module.exports = router
