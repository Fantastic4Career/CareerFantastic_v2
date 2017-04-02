const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser());
app.use(express.static('public'));


app.post('/api/searchjob', (req, res) => {
  res.json({data: "hello"});
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
