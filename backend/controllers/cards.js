//import models
const Board = require('../models/board');

//create a card
exports.createCard = async function(req, res) {
    const {title, description, created_at} = req.body
    const {boardId, columnId} = req.params

    if(!title || !columnId || !boardId) {
        return res.status(400).send('Params missing')
    }
    try {
        const board = await Board.findOne({
            _id: boardId
        })
        const cards = await board.addCard(columnId, 
            {
                title,
                description,
            })
        res.status(201).send(cards)
    }
    catch(error) {
        return res.status(500).end();
    }
}

//get a card
exports.showCards = async function(req , res) {
    const {boardId, columnId} = req.params
     try {
        const board = await Board.findOne({
            _id: boardId
        })
        const cards = await board.getCards(columnId)
        console.log('showCards cards: '+ cards) 
        return res.status(201).send(cards);
    }
    catch(error) {
        return res.status(500).end('Server is not working')
    }
}

//delete a card
exports.deleteCard = async function(req, res) {
    const {boardId, columnId, id} = req.params
    console.log('boardId :' + boardId);
    console.log('columnId :' + columnId);
    console.log('cardId :' + id);
    try {
        const updateBoard = await Board.findOneAndUpdate(
            {_id :boardId, "columns._id": columnId },
            {$pull: {'columns.$.cards': {_id : id}}},
            {new: true},
        );
        res.status(201).send(updateBoard);
    }
    catch(e) {
        console.log(e)
        res.status(500).send('Something is wrong with delete card');
    }

}
//update a card
