/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for column
let columnSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cards: [{
        title: {
            type: String, 
            require: true
        },
        description: {
            type: String,
        },
        type: Date,
        Default: Date.now()
    }]
    boardId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    }
});

module.exports = mongoose.model('Column', columnSchema);*/