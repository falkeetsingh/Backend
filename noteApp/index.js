const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));//tells the backend that all the static files for the frontend will be placed in the public folder

app.set('view engine','ejs');//setting ejs as the view engine for frontend


app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){ //read directory ./files
        res.render("index",{files : files});//res.render will connect with the mentioned .ejs file for frontend
    })
});

//taking data from the form as writing it in a file created in the file folder
app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
    });
})

app.get("/file/:filename",function(req,res){ //dynamic routing with :
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,fileData){
        res.render('show',{filename: req.params.filename, fileData: fileData}); //sending data to the frontend
    });
});

app.get("/edit/:filename",function(req,res){
    res.render("edit",{filename: req.params.filename});
});

app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    });
});

app.listen(3001,function(){
    console.log("running");
});

