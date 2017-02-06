const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const pug = require('pug')
const admin = require('./routes/admin.js')
const routes = require('./routes/index.js')

app.set('view engine', 'pug')
app.use('/', routes)
app.use('/admin', admin)

app.listen(2782, function(){
  console.log('listening on port 2782')
})
