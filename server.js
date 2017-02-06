const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const pug = require('pug')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').Strategy
const admin = require('./routes/admin.js')(passport)
const routes = require('./routes/index.js')
const mongoose = require('mongoose');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session')

const configDB = require('./config/database.js');
mongoose.createConnection(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'iloveshakashakashaka' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

const GOOGLE_CLIENT_ID = '197695806879-8rtcu8gb9joo2ob3tg28rs2nqf9k8vkm.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '_btkQ7Z65MV3YmRtCbn5CfIF'

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use('/', routes)
app.use('/admin', admin)

app.listen(2782, function(){
  console.log('listening on port 2782')
})
