const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    dsaScore: {
        type: String,
        required: true,
    },
    webScore: {
        type: String,
        required: true,
    },
    reactScore: {
        type: String,
        required: true,
    },
    interviewCompany: {
        type: String,
        required: true,
    },
    interviewDate: {
        type: Date,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;