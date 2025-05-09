const express = require("express");
const app = express();

app.get('/',function(req,res){
    res.send("Hello");
});

app.get('/profile',function(req,res){
    res.send("Hello from 3");
});

app.listen(3001);
