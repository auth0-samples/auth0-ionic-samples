var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');

var authenticate = jwt({
  secret: new Buffer('LqLk6m16AFYUMZ8Hi9pBA9TndPiexOJRn87FqEXOqG6YLXRh_g5OTNS909rdrz2t', 'base64'),
  audience: 'sINEV7gPqaCo6S4GPZE0vw8RLpRKCi9y'
});

app.use(cors());

app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', authenticate, function(req, res) {
  res.send(200, {text: "All good. You only get this message if you're authenticated"});
})

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
