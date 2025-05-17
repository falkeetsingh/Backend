const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/",(req,res)=>{
    res.send("hello");
});

app.get("/create", async (req,res)=>{
    let user = await userModel.create({
        username: "falkeet",
        email: "falkeet@gmail.com",
        age: 25
    });

    res.send(user);
});

app.get("/post/create", async (req,res)=>{
    let post = await postModel.create({
        postdata: "hello everyone",
        user: "68236cd7e06ede309b91864b", //yeh id user ki generate hui thi, abhi copy kari hai from /create

    });

    let user = await userModel.findOne({_id:"68236cd7e06ede309b91864b"}); //user model mei user dhundha with the id
    user.posts.push(post._id);//user ke pass mei jo posts array hai usmei user ki id push kardi
    await user.save();//manual changes needs to be saved

    res.send({post,user});

    //this way user has post id and post has user id
});

app.listen(3001);