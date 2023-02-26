const User = require('../models/user');
const Student = require('../models/student');
const Interview = require('../models/interviews');
const csvtojson = require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');


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

//for csv
module.exports.download = async function(req, res){
    try{
        //fetch data from database
        const data = await Student.find().lean();
        //convert data from json to csv format using json2csv library

        const fields = ['name', 'batch', 'status', 'dsaScore', 'webScore', 'reactScore', 'interviewCompany', 'interviewDate', 'result'];
        const json2csvParser = new Parser({ fields });
        const csvData = json2csvParser.parse(data);

        //save CSV data to a file
        const filename = 'data.csv';
        fs.writeFileSync(filename, csvData);

        //set HTTP responses header to download the file
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'text/csv');
        res.download(filename);

    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
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
module.exports.interviewForm = async function(req, res){
    let students = await Student.find({});
    return res.render('interview', {
        title: 'Make an interview',
        students: students,
    })
}
module.exports.createStudent = function(req, res){
    Student.create(req.body, function(err, done){
        if(err){
            console.log('could not create the student', err);
            return;
        }
        console.log('created the student!');
        return res.redirect('/');
    });
}
module.exports.studentProfile = async function(req, res){
    let student = await Student.findById(req.params.id);
    return res.render('student_profile',{
        title: 'student',
        students: student,
    });
}

// module.exports.interviewProfile = async function(req, res){
//     let interview = await Interview.findById(req.params.id);
//     return res.render('interview_profile',{
//         title: 'interviews',
//         interviews: interview,
//     })
// }


module.exports.interviewProfile = async function(req, res) {
    try {
      const interviews = await Interview.findById(req.params.id).populate('assignedStudent');
      if (!interviews) {
        return res.status(404).send('Interview not found');
      }
      return res.render('interview_profile', {
        title: 'Interview Profile',
        interviews: interviews,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports.createInterview = async function(req, res) {
    const studentId = req.body.studentId;
    try {
        const interview = await Interview.create(req.body);
        console.log('created the interview!');
        if (studentId) {
            interview.assignedStudent.push(studentId);
            await interview.save();
            console.log('assigned student to interview!');
        }
        return res.redirect('/');
    } catch (err) {
        console.log('could not create the interview', err);
        return res.status(500).send('Could not create the interview');
    }
}

// module.exports.createInterview = function(req, res){

//     const studentId = req.body.studentId;

//     Interview.create(req.body, function(err, done){
//         if(err){
//             console.log('could not create the student', err);
//             return res.status(500).send('Could not create the interview');
//         }
//         console.log('created the interview!');
        
//         return res.redirect('/');
//     });
// }



module.exports.createSession = function(req, res){
    return res.redirect('/');
}