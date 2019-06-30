const fs = require('fs');
//const FileHound = require('filehound');

const { argvLine } = require('./index.js');


fs.readFile(argvLine, function(err,data){
  if(err){
    console.log(err)
  }
  console.log(data.toString())
})




/* fs.readdir(argvLine, function(err,files){
  if(err){
    console.log(err)
  }
  files = FileHound.create()
  .paths(argvLine)
  .ext('md')
  .find();

files.then(console.log);
}) */
