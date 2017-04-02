const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const searchJob = require('./server/controller/searchJob.controller.js');
const app = express();
app.use(bodyParser());
app.use(express.static('public'));

app.post('/api/searchjob', (req, res) => {
  return searchJob()
  .then(result=>{
    console.log("result is>>>", result);
    return res.json(result);
  })
  
});

app.get('/', (req, res) => {
  res.sendfile('public/index.html');
});

app.get('/*', (req, res) => {
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
});
