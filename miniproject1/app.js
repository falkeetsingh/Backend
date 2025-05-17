const express = require("express");
const app=express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const upload = require("./config/multerconfig");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/login");
});

app.get("/profile",isLoggedin, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("posts");//populate the post field else it will show just plain ids not the posts
    res.render("profile",{user});
});

app.get("/profile/upload",(req,res)=>{
    res.render("profileupload");
})

app.post("/upload",isLoggedin,upload.single("image"), async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic = req.file.filename;
    await user.save();

    res.redirect("/profile");
})

app.get("/like/:id",isLoggedin, async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
    await post.save();
    res.redirect("/profile");
});

app.get("/edit/:id",isLoggedin, async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    res.render("edit",{post});
});

app.post("/update/:id",isLoggedin, async (req,res)=>{
    let post = await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.content})
    res.redirect("/profile");
});

//creating a post, assigning user id to it and pushing post it to user
app.post("/post",isLoggedin, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    console.log(req.user);
    let{content}=req.body;
    let post = await postModel.create({
        user:user._id,
        content,
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
})


app.post("/register", async (req,res)=>{
    let{email,username,name,age,password}=req.body;

    //checking if user already exists
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User Already Registered!!");

    //encrypting password
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt, async (err,hash)=>{
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password:hash
            });

            //token as cookie
            let token = jwt.sign({email: email, userid: user._id},"shhh");
            res.cookie("token",token);

            res.send("registered");
        });
    });
});

app.post("/login", async (req,res)=>{
    let{email,password}=req.body;

    //checking if user already exists
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong!!");

    bcrypt.compare(password, user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email: email, userid: user._id},"shhh");
            res.cookie("token",token);
            res.status(200).redirect("/profile");
        }else res.redirect("/login");
    });
});

 //this func check if the user is logged in or not by verifying the cookie
function isLoggedin(req,res,next){ //this helps in created protected routes
    if(req.cookies.token == "")res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token,"shhh");//verifies the cookie on the basis of secret message
        req.user = data;//created a field in req namezs user where the data will be stored that was given in the cookie
        next();
    }
}
app.listen(3001);