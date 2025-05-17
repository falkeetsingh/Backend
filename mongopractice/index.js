const express = require("express");
const path = require("path");
const userModel = require('./models/user.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Home page
app.get("/", function (req, res) {
    res.render("index");
});

// Show all users
app.get("/read", async (req, res) => {
    let Users = await userModel.find();
    res.render("read", { Users });
});

// Delete user
app.get("/delete/:id", async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

// Render edit page
app.get("/edit/:userid", async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user }); // assumes you have edit.ejs
});

// Update user
app.post("/update/:userid", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findOneAndUpdate(
        { _id: req.params.userid },
        { name, email, image },
        { new: true }
    );
    res.redirect("/read");
});

// Create new user
app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect("/read");
});

app.listen(3001, function () {
    console.log("running");
});
