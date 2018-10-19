const express = require('express');
const shortid = require('shortid');
const db = require('../connection');

// const db = require('../connection');

const router = express.Router();

router.get('/', (req,res)=>{
  db.select().table('lists')
  .then(rows => res.json(rows));
});

router.post('/', (req,res)=>{
  let id = shortid.generate();
  db.insert({
      id: id,
      listname: req.body.name,
      color: req.body.color,
    }).into('lists')
    .then(()=>res.send(id));
});

module.exports = router;
