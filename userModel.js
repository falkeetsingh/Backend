const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/mongoPractice`);

const userSchema = mongoose.schema({
    name : String,
    username : String,
    email : String
});

module.export = mongoose.model("user",userSchema);