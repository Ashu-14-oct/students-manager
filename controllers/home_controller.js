const User = require('../models/user');

module.exports.home = function(req, res){
    console.log(req.cookies);
    return res.render('home', {
        title: 'Welcome'
    });
}