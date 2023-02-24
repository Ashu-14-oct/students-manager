const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.createPost = async function(req, res){
    console.log(req.body.content);

    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
       const newPost = await Post.findById(post._id).populate('user');
    
    
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: newPost
                },
                message: "Post created"
            });
        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }

    
    
}

module.exports.delete = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();
            
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}