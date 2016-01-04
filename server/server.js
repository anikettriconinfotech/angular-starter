var express = require('express');
var http = require('http');
var path = require('path');

var app =express();

app.use(express.static(path.join(__dirname, '../client')));

var server = http.createServer(app);

var port = Number(process.env.PORT || 3659);

server.listen(port,function() {
  console.log("server running at PORT:"+port);
});
