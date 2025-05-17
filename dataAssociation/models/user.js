const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/dataAssociation");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, //ids banega that will be associated with a particular user so that we know konse user ne konsi post kari hai
            ref: 'post' //kis data model is refeerenced hai
        }
    ]
});

module.exports = mongoose.model("user",userSchema); 