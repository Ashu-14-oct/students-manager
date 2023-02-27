const User = require('../models/user');
const Student = require('../models/student');
const Interview = require('../models/interviews');
module.exports.home = async function(req, res){
    let users = await User.find({});
    let students = await Student.find({});
    let interviews = await Interview.find({});
    return res.render('home', {
        title: 'Welcome',
        all_users: users,
        students: students,
        interviews: interviews,
    });
}