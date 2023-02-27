const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialApp');

const db = mongoose.connection;

db.once('open', function(){
    console.log('database successfully connected to the server');
});

module.exports = db;