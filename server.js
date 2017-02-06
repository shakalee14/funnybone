const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const pug = require('pug')

app.set('view engine', 'pug')

app.listen(2782, function(){
  console.log('listening on port 2782')
})

app.get('/', function(request, response){
  response.render('index')
})
