//import models
const Board = require('../models/board');

//function get, show a list of boards
exports.showBoards = function(req, res) {
    Board.find()
        .then(boards => {
            res.send(boards);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();
        });
}

//function post, create a board
exports.createBoard = function(req, res){
    console.log('title: ' + req.body.title);
    const title = req.body.title;
    let newBoard = new Board({title});
    newBoard.save()
        .then(()=> {
            console.log('working working');
            res.status(201).send();
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
}

//function delete, delete a board by id
exports.deleteBoard = function(req, res) {
    let boardId = req.params.id;
    Board.findByIdAndDelete(boardId)
        .then(() => {
            res.send('board deleted');
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
}