const express = require("express");
const app = express();

const userModel = require('./userModel');

app.get("/",function(req,res){
    res.send("hey");
});

app.get("/create",async (req,res)=>{
    let createdUser = await userModel.create({
        name: "falkeet",
        username: "superNINJA",
        email: "falkeet@gmail.com"
    })

    res.send(createdUser);
});

app.get("/update",async (req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate({username:superNINJA},{name:naina},{new:true});

    res.send(updatedUser);
});

app.get("/read",async (req,res)=>{
    let users = await userModel.find(); //findOne bhi hai aur username ya name se search bhi

    res.send(users);
});

app.get("/delete",async (req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({username:superNINJA},{name:naina},{new:true});

    res.send(users);
});



app.listen(3002);