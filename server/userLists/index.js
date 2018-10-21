const express = require('express');
const shortid = require('shortid');
const db = require('../connection');

const router = express.Router();

router.get('/', (req,res,next)=>{
  let promises = [];
  db.select().table('lists')
  .then(lists => {
    for (let list of lists){
      promises.push(db('tasks').where('_list_id',list.id).then(tasks=>list.tasks=tasks));
    }
    Promise.all(promises).then(	()=>res.json(lists));
  }).catch(err=>next(err));
});

module.exports = router;
