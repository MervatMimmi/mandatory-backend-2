//import models
const Board = require('../models/board');

//function post, create a column
exports.createColumn = async function(req, res){
  const {title} = req.body
  const {id} = req.params

  if (!title || !id) {
      return res.status(400).send('Title are required')
  }
  try {
      const board = await Board.findById(id)
      const columns = await board.addColumn({title})
      return res.status(201).send(columns)
  } catch(err){
      return res.status(500).end();
  }
}
