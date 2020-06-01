const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Board
let boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    columns: [{
        title: {
            type: String,
            require: true
        },
        cards: [{
            title: {
                type: String,
                require: true
            },
            description: {
                type: String,
            },
            created_at: {
                type: Date,
            }
        }]
    }]
})

boardSchema.methods.addColumn = async function(obj) {
    this.columns.push(obj)
    const {columns} = await this.save()
    return columns
}

boardSchema.methods.deleteColumn = async function(columnId) {
    const column = this.columns.find( c => c._id === columnId)
    return column
}

boardSchema.methods.addCard = async function(columnId, card) {
    const column = this.columns.find(c => c._id == columnId)
    column.cards.push(card)
    await this.save()
    return column.cards
}

boardSchema.methods.getCards = async function(columnId) {
    const column = this.columns.find(c => c._id == columnId)
    return column.cards
}

module.exports = mongoose.model('Board', boardSchema);