const express = require("express");
const app = express();

app.use(function(req,res,next){ //aisa middleware jisse hoke har req aage jaayehi on the server
    console.log("middleware");
    next(); //makes sure ki req aage forward hojaye
})
app.use(function(req,res,next){ //aisa middleware jisse hoke har req aage jaayehi on the server
    console.log("middleware2");
    next(); //makes sure ki req aage forward hojaye
})//we can add multiple levels of middleware

app.use(express.json());//make the data readable
app.use(express.urlencoded({extended:true})); //make the data readable but in a diff format

app.get('/',function(req,res){
    res.send("Hello");
});

app.get('/profile',function(req,res){//routes
    res.send("Hello from 3");
});

app.use((err,req,res,next)=>{ //always at the end
    console.err(err.stack);
    res.status(500).send("Broke!!");
})

app.listen(3001);
