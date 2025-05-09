const http = require("http");

const server = http.createServer(function(req,res){
    res.end("helloooo");
})

server.listen(5000);