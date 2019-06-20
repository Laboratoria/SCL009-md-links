//module.exports = () => {
// ...
//};

//llamando documentación de node
const fs = require('fs');
const marked = require('marked');

//ruta y callback
//utf lenguaje humano porque entrega solo números
//Se lee ruta del arvhivo md

//fs.readFile('./prueba.md', 'utf8',(err, data) => {
//if (err) {
//throw err;
//}
//console.log(data);
//});

const links = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    //new crear nueva instancia 
    //marked libreria
    //renderer metodo

    let links = [];
    const renderer = new marked.Renderer();
    //.link es un metodo
    renderer.link = function (href, title, text) {
      links.push(
        {
          href: href,
          text: text,
          file: path
        }
      )
    }
    marked(data, { renderer: renderer });
    console.log(links)

  })
}

console.log(links('./prueba.md'));