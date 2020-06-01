const express = require('express');
const app = express();
const server = require('http').Server(app);
const apiRouter = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 9595;
const dbUrl = 'mongodb://localhost:27017/trello'

mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology: true});
const connection = mongoose.connection;

//Catch Mongoose errors
connection.on('error', function(error){
    console.log('Mongoose Error: ', error);
});

// connect to database
connection.once('open', () => {
    console.log('MongoDB databas connection established sucessfully');
});

apiRouter.use(express.json());
apiRouter.use(express.urlencoded());

const Board = require('./controllers/boards');
const Column = require('./controllers/columns');
const Card = require('./controllers/cards');


//=============Board Routes================//
// show board
apiRouter.get('/boards/', Board.showBoards);
//create board
apiRouter.post('/boards/', Board.createBoard);
//delete board
apiRouter.delete('/boards/:id/', Board.deleteBoard);

//=============Column Routes================//
// show column
apiRouter.get('/columns/:id/', Column.showColumns);
//create column
apiRouter.post('/columns/:id/', Column.createColumn);
//delete column
apiRouter.delete('/columns/:id/', Column.deleteColumn);

//==============Card Routes ===================//
// show card
apiRouter.get('/columns/:boardId/:columnId/cards',Card.showCards);
//create card
apiRouter.post('/columns/:boardId/:columnId/cards', Card.createCard);

app.use('/api/', apiRouter);

server.listen(PORT, function(){
    console.log('Server is running on Port: ' + PORT);
});