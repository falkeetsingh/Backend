const mongoose=require("mongoose");


const postSchema = mongoose.Schema({
    postdata: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,  //user se referenced id banegi yaha pe so that we know konse user ki konsi post hai
        ref: 'user' //konse data model se referenced hai
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("post",postSchema); 