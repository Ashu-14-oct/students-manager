const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
        title: "Profile",
        profile_user: user
      });
    });
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/user/profile');
    }
    return res.render('sign_in', {
        title: 'sign-up page'
    });
}
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/user/profile');
    }
    return res.render('sign_up', {
        title: 'Make your account'
    });
}
module.exports.signOut = function(req, res){
    console.log(req.body);
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    // return res.redirect('/');
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
        
                return res.redirect('/');
            });
        }
        else{
            return res.redirect('/');
        }
    });

    
}
module.exports.studentForm = function(req, res){
    return res.render('student_form', {
        title: 'student form',
    });
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}