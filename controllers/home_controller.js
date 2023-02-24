const User = require('../models/user');
const Post = require('../models/post');
const Student = require('../models/student');
module.exports.home = async function(req, res){
    let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    
    let users = await User.find({});
    let students = await Student.find({});
    return res.render('home', {
        title: 'Welcome',
        posts: posts,
        all_users: users,
        students: students,
    });
}