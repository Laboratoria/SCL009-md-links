const mdLinks = require('../');


describe('mdLinks', () => {
  

  it('debería imprimir en terminal las carpetas encontradas en la ruta dada por el usuario', () => {
    expect('node src/md-links.js')
    .toEqual(['src\\prueba.md', 'src\\prueba.1.md']);
  });

  it('Deberia retornarme una lista de links del archivo prueba.md', () => {
    expect.assertions(1);
    expect(mdLinks.getLinks('\Users\\jocel\\OneDrive\\Laboratoria\\Commomcore009\\Frontend\\SCL009-md-links\\prueba.md'))
      .toEqual([{"route":"C:\\Users\\jocel\\OneDrive\\Laboratoria\\Commomcore009\\Frontend\\SCL009-md-links\\prueba.md","text":"archivo de prueba","href":"http://github.com/workshopper/learnyounode"}])
    
  });

});



