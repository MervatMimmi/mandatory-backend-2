//import models
const Board = require('../models/board');

exports.createCard = async function(req, res) {
    const {title} = req.body
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
            title
        })
        res.status(201).send(cards + 'created cards')
    }
    catch(error) {
        return res.status(500).end();
    }
}

//
exports.showCards = async function(req , res) {
    const {boardId, columnId} = req.params
     try {
        const board = await Board.findOne({
            _id: boardId
        })
        const cards = await board.getCards(columnId)
        console.log('cards: '+ cards) 
        return res.status(201).send(cards);
    }
    catch(error) {
        return res.status(500).end('Server is not working')
    }
}