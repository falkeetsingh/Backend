const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cookieParser());

// app.get("/",function(re,res){
//     // res.cookie("name","falkeet");
//     bcrypt.genSalt(10,function(err,salt){ 
//         bcrypt.hash("falkeet1233",salt,function(err,hash){
//             console.log(hash);//hash is the encrypted pass generated and is stored in the db
//         })
//     })
//     //way to read the encrypted data(comaprison)
//     bcrypt.compare("falkeet1233","$2b$10$O3miMbOePhgtbOoMnt5dueCMfLN6rgLVblGkVzT0soe7fwdDucujy",function(err,result){ 
//         console.log(result);//will return true if pass and hash matches
//     });
//     res.send("done");

// });

//creating tokens using jwt
app.get("/",function(re,res){
    let token = jwt.sign({email:"falkeet@gmail.com"},"secret");  //on bsis of "secret" the data is encrypted hence it is kept very safelt and securely
    res.cookie("token",token);//sending the token created as a cookie to the broswer
    res.send("done");
});

app.get("/read",function(req,res){
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
});

app.listen(3001);