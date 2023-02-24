const User = require('../models/user');
const Post = require('../models/post');
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    
    let users = await User.find({});

    return res.render('home', {
        title: 'Welcome',
        posts: posts,
        all_users: users
       
    });
}