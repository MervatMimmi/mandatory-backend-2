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

//=============Board Routes================//
// show board

//create board
apiRouter.post('/boards/:board', Board.createBoard);

app.use('/api', apiRouter);

server.listen(PORT, function(){
    console.log('Server is running on Port: ' + PORT);
});