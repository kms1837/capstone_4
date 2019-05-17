var http = require('http');
var app = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type' : 'text/plain'});
  res.end("Hello World");

});
app.listen(3000);
