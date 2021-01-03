const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Usn: {
        type: String,
        trim: true,
        required: true
    },
    Name: {
        type: String,
        trim: true,
        required: true
    },
    Marks: {
        type: Number,
        trim: true
    },
    Attendance: {
        type: Number,
        trim: true
    },
    ClassId: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema);