const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3000;
const db = require('./config/mongoose');
const app = express();
const csvtojson = require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//assets
app.use(express.static(path.join(__dirname, 'assets')));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//for passport
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeil',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/socialApp',
            autoRemove: 'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('error while lisenting server on port :', port);
        return;
    }

    console.log('server successfully started on port :', port);
})