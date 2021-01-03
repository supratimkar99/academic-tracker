const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    ClassName: {
        type: String,
        trim: true,
        required: true
    },
    ClassCode: {
        type: String,
        trim: true,
        required: true
    },
    Owner: {
        type: String,
        trim: true,
        required: true
    },
    Description: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Class', classSchema);