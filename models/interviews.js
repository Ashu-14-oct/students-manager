const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    assignedStudent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;