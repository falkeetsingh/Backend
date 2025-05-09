const fs = require('fs'); //using the fs module

fs.writeFile("hello.txt","this is a sample file",function(err){ //create and write in a file
    if(err) console.log(err);
    else console.log("done");
});

fs.rename("hello.txt","hi.txt",function(err){
    if(err) console.log(err);
    else console.log("done");
});

fs.readFile("hello.txt","utf8",function(err,data){
    if(err){
         console.log(err);
    }
    else{
        console.log(data);
    }
});