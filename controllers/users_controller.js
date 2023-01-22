const User = require('../models/user');

module.exports.signUp = function(req, res){
    return res.render('sign_in', {
        title: 'sign-up page'
    });
}
module.exports.signIn = function(req, res){
    return res.render('sign_up', {
        title: 'Make your account'
    });
}
module.exports.createUser = function(req, res){
    if(req.body.confirm_password != req.body.password){
        return res.redirect('back');
    }
    console.log(req.body);

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error while searching user in database');
            return;
        }

        if(!user){
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }, function(err, done){
                if(err){
                    console.log('could not create the account');
                    return;
                }
        
                return res.redirect('/user/sign-in');
            });
        }
        else{
            return res.redirect('/');
        }
    });

    
}

module.exports.createSession = function(req, res){
    
}