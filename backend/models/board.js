const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Board
let boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    created_at: {
        Date
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    }
});

module.exports = mongoose.model('Board', boardSchema);