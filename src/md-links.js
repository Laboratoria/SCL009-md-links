const chalk = require('chalk');
const mdLinks = require("../index");
const argv = require('yargs').argv;

// argv._[0] es el primer argumento
// node .\src\md-links.js .\prueba.md

mdLinks(argv._[0])
  .then(links => {
    links.forEach(link => {
        console.log(`${chalk.green(link.file)} ${chalk.yellow(link.href)} ${chalk.magenta(link.text)}`);
    });
  })
  .catch(err => {
    console.error(chalk.red('Se ha encontrado un error: '), chalk.cyan(err.message));
  });