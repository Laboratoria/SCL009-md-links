const fs = require('fs');
const resolve = require('path').resolve;
const marked = require('marked');
const Filehound = require('filehound');

const pathToAbsolute = path => {
  return resolve(path);
};

// const readFile = (fileName, type) => {
//   return new Promise((resolve, reject) => {
//     // Read a file
//     fs.readFile(fileName, type ,(err, data) => {
//       if (err){
//       reject(err);
//       } else {
//         resolve(data.toString());
//       }
//     });
//   });
//  };


//  readFile("prueba.txt", "utf-8")
//   .then(resolve => {
//     console.log("Archivo:" , resolve);
//   })
//   .catch(err => {
//     console.log(err)
//   })

// //llamando documentación de node
// const fs = require('fs');
// //const marked = require('marked');
// const FileHound = require('filehound');

// //ruta y callback
// //utf lenguaje humano porque entrega solo números
// //Se lee ruta del arvhivo md

// //fs.readFile('./prueba.md', 'utf8',(err, data) => {
// //if (err) {
// //throw err;
// //}
// //console.log(data);
// //});


 
// const files = FileHound.create()
//   .paths('/some/dir')
//   .ext('json')
//   .find();
 
// files.then(console.log);



// // const links = (path) => {
// //   fs.readFile(path, 'utf8', (err, data) => {
// //     if (err) {
// //       throw err;
// //     }
// //     //new crear nueva instancia 
// //     //marked libreria
// //     //renderer metodo

// //     let links = [];
// //     const renderer = new marked.Renderer();
// //     //.link es un metodo
// //     renderer.link = function (href, title, text) {
// //       links.push(
// //         {
// //           href: href,
// //           text: text,
// //           file: path
// //         }
// //       )
// //     }
// //     marked(data, { renderer: renderer });
// //     console.log(links)

// //   })
// // }

// // console.log(links('./prueba.md'));