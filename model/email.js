const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    subject: {
        type: String
    },
    text: {
        type: String
    }
});

module.exports = mongoose.model('Email', emailSchema);