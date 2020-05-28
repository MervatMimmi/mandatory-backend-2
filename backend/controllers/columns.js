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
  } 
  catch(error){
      return res.status(500).end();
  }
}

//function get, show a list of columns
exports.showColumns = async function(req, res) {
    const { id } = req.params
    if(!id) {
        return res.status(400).send();
    }
    try {
        const {columns} = await Board.findOne({
            _id : id
        })
        return  res.status(201).send(columns)
    }
    catch(error) {
        return res.status(500).end();
    }
}

//function delete, delete a column by id
exports.deleteColumn =  async function(req, res) {
    const {columnId} = req.params
    try {
        const {column} = await Board.findOneAndDelete({
            _id : id
        })
        const deleteColumn = await column.deleteColumn({columnId})
        return res.status(201).send(deleteColumn + 'column deleted')
    }
    catch(error){
        return res.status(500).end();
    }
}
