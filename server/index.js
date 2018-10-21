const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')

const newList = require('./newlist');
const newTask = require('./newtask');
const userLists = require('./userLists');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
  res.json({
    message: 'Hello World'
  });
});

app.use('/user', userLists);
app.use('/newlist', newList);
app.use('/newtask', newTask);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ', req.originUrl);
  next(error);
}

function errorHandler(err, req, res, next){
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
  console.log('Listening on port', port);
});
