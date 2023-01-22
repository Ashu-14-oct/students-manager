const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3000;
const db = require('./config/mongoose');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//assets
app.set(express.static('./assets'));

//router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('error while lisenting server on port :', port);
        return;
    }

    console.log('server successfully started on port :', port);
})