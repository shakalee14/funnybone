const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const pug = require('pug')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').Strategy
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const env = require('dotenv').config()

const router = express.Router

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser())

const admin = require('./routes/admin.js')
const index = require('./routes/index.js')

app.use(session({ secret: 'iloveshakashakashaka' }))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport.js')(passport)
app.use(flash())

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', index)
app.use('/admin', admin)

const server = app.listen(process.env.PORT || 2782, function(){
  console.log('listening on port 2782')
})

module.exports = server
