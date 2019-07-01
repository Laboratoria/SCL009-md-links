const fs = require('fs');
const resolve = require('path').resolve;
const marked = require('marked');
const Filehound = require('filehound');


const pathToAbsolute = path => {
  return resolve(path);
};

const checkValidPath = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.isFile()) {
        resolve('FILE');
      } else if (stats.isDirectory()) {
        resolve('DIRECTORY');
      } else {
        reject(new Error('INVALID_PATH'));
      }
    });
  });
}

//funcion para obtener los links de un archivos con extensión md 
//usando marked y extrayendo el href, título y el texto
const getLinks = document => {
  const links = [];

  //new (se crea nueva instancia)
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    links.push({
      href,
      title,
      text
    })
  }

  marked(document, {renderer});

  return links;
}

//const isLinkValid = link => {

//}


const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

//funcion que liste en base a una ruta una lista de los archivos
const listDirectoryFiles = path => {
  return new Promise((resolve, reject) => {
    const filehound = Filehound.create();

    //no se valida directorio porque la extension es md en filehound
    filehound
      .ext('md')
      .depth(0)
      .paths(path)
      .find((err, files) => {
        if (err) {
          reject(err);
          return;
        }
    
        resolve(files);
      });
  });
};



//funcion para crear la data de requerimiento en readme
//en marked obtenemos , title, href y text
//pero el requerimiento pide href ,text y file(ruta)
//map() crea un nuevo array con los resultados de la llamada a la función indicada 
const createData = (path, data) => {
  const links = getLinks(data);

  return links.map(link => {
    return {
      href: link.href,
      text: link.text,
      file: path
    };
  });
};


//valida la extensión de archivo (md)
const isValidExtension = (path) => {
  return path.toLowerCase().endsWith('.md');
};




const mdLinks = path => {
  return new Promise((resolve, reject) => {
    const absolutePath = pathToAbsolute(path); 

    checkValidPath(absolutePath)
      .then(type => {
        if (type === 'FILE') {
          if (!isValidExtension(absolutePath)) {
            reject(new Error('La extensión de archivo no es válida'));
            return;
          }

          readFile(absolutePath)
            .then(data => {
              resolve(createData(absolutePath, data));
            }).catch(err => {
              reject(err);
              return;
            });
        }
  
        //no se valida directorio(isValidExtension)porque la extension es md en filehound
        if (type === 'DIRECTORY') {
          listDirectoryFiles(absolutePath) // Se lista directorio (promesa)
            .then(files => {  // Se resuelve promesa, se entrega lista de rutas a archivo
              const promises = [];

              files.forEach(file => { // por cada ruta de archivo
                promises.push(  // se crea promesa por cada ruta y se añade al arreglo
                  readFile(file) // se lee ruta y se obtiene el contenido e archivo (promesa)
                    .then(data => { // se resolvió bien y obtuvo el contenido del archivo (es string)
                      return createData(file, data); // al arreglo de promesas se le entrega el objeto deseado por readme, no la data
                    }).catch(err => {
                      reject(err);
                      return;
                    })
                );
              });

              //todas las promesas deben cumplirse
              Promise.all(promises)
                .then(allData => { // aca se resolvió readFile pero se agrega un then antes tranformando la data
                  resolve(allData.reduce((a, b) => a.concat(b))); // a = [1, 2]; b = [2,3]; c = [a, b]; c.reduce((x, y) => x.concat(y))
                }).catch(err => {
                  reject(err);
                  return;
                });
            }).catch(err => {
              reject(err);
            });
        }
      }).catch(err => {
        reject(err);
      });
  });
}

module.exports = mdLinks;





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