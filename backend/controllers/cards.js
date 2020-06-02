//import models
const Board = require('../models/board');

//create a card
exports.createCard = async function(req, res) {
    const {title, description, date} = req.body
    const {boardId, columnId} = req.params
    console.log('created cards :' + date);
    
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
                date,
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
    //console.log('boardId :' + boardId);
    //console.log('columnId :' + columnId);
    //console.log('cardId :' + id);
    try {
        const updateBoard = await Board.findOneAndUpdate(
            {_id :boardId, "columns._id": columnId },
            {$pull: {'columns.$.cards': {_id : id}}},
            {new: true},
        );
        res.status(204).send(updateBoard);
    }
    catch(error) {
        console.log(error)
        res.status(500).send('Something is wrong with delete card');
    }

}
//update a card
exports.updateCard = async function (req, res) {
    const {boardId, columnId, id} = req.params;
    const title = req.body.title;
    const description = req.body.description;
    console.log('boardId : ' + boardId);
    console.log('columnId : ' + columnId);
    console.log('id : ' + id);
    console.log('title :' + title);
    console.log('description :' + description);
    
    const data = {title : req.body.title, description: req.body.description}
    
    try {
    let updateBoard  = await Board.findOneAndUpdate(
        {_id: boardId, 'columns._id': columnId },
        {$set: {'columns.$.cards': {_id : id, 'title': title,
                'description': description}}},
        {new: true});
        console.log('updateboard: ' + updateBoard.id)
        return res.status(204).send(updateBoard);
    }   
    catch(error) {
        console.log(error)
        res.status(500).send('Something is wrong with update card');
    }
}