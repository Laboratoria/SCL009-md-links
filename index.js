//const path = require('path')
const fs = require('fs');

let argvLine = process.argv[2]
/* if (!path.isAbsolute(argvLine)){
  console.log(path.resolve(argvLine))
}
else {
  return argvLine
} */

const checkPath = (argvLine) => {
  return new Promise((resolve, reject) => {
    fs.lstat(argvLine, (error, content) => {
      
      if (error){
        reject(error);
      }else {
       resolve(content);
      }
    })
  })
}
    
checkPath(argvLine)
  .then (res => {
    return argvLine
  })
  .catch (error => {
    console.log('Debes ingresar un archivo Markdown válido, Ej. "markdown.md"')
  })


  module.exports = [argvLine];