const express = require('express');
const shortid = require('shortid');
const db = require('../connection');

const router = express.Router();

router.get('/', (req,res)=>{
  knex.select().table('lists')
  .then(rows => res.json({rows}));
  // res.json({message: 'newtask test'});
  //create task and resond with unique id
});

router.post('/', (req,res)=>{
  let id = shortid.generate();
  db.insert({
    _list_id: req.body.listId,
    _task_id: id,
    task_order: req.body.order,
    task: req.body.task,
    state: req.body.state,
  }).into('tasks')
  .then(result=>res.send(id));
});

module.exports = router;
