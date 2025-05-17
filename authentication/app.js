const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const userModel = require("./models/user");
const app = express();

app.use(cookieParser());
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
    res.render("index");
})

app.post("/create", (req,res)=>{

    bcrypt.genSalt(10,(err,salt)=>{
        let{username,email,password,age}=req.body;
        bcrypt.hash(password,salt,async (err,hash)=>{
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });

            let token = jwt.sign({email},"shhhhh");
            res.cookie("token",token);
            
            res.send(createdUser);
        });
    });
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send("Something went wrong!");

    bcrypt.compare(req.body.password,user.password, (err,result)=>{
        if(result) {
            let token = jwt.sign({email: user.email},"shhhhh");
            res.cookie("token",token);
            res.send("logged in");
        }
        else res.send("cant!");
    });
})


app.get("/logout",function(err,res){
    res.cookie("token","");
    res.redirect("/");
});

 app.listen(3001);
