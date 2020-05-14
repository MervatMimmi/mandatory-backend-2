//import models
const Board = require('../models/board');

//function get, show a list of boards

//function post, create a board
exports.createBoard = function(req, res){
    console.log('title: ' + req.body.title);
    let newBoard = new Board({
        title:req.body.title
    });
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