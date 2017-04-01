var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
app.use(bodyParser());
app.use(express.static('public'));


app.post('/api/searchjob', function (req, res) {
  res.json({data: "hello"});
});

app.get('/', function(req,res) {
  res.sendfile('public/index.html');
});

app.get('/*', function(req, res){
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});
