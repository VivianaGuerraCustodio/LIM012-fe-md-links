/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const {
  validateRoute,
  convertPath,
  isDirectory,
  isFile,
  reviewDirectoryContent,
  isAMarkdownFile,
  getPropertiesOfMarkdownFile,
  getMarkdownFiles,
  getLinksAndPathComplete,
} = require('../src/index.js');

describe('Verificar si la ruta es valida', () => {
  it('Es una funcion', () => {
    expect(typeof validateRoute).toBe('function');
  });
  it('Debe verificar si la ruta ingresada es valida', () => {
    expect(validateRoute('/etc/passwd')).toBe(true);
  });
  it('Debe verificar que la ruta ingresada no es válida', () => {
    expect(validateRoute('www.facebook.com')).toBe(false);
  });
});

describe('verifica si una ruta es relativa o absoluta , si es relativa la convierte a absoluta', () => {
  it('Es una función', () => {
    expect(typeof convertPath).toBe('function');
  });
  it('Debe verificar si la ruta es absoluta y devolver su mismo valor', () => {
    expect(convertPath('/home/ena/Desktop/Proyectos de Laboratoria/LIM012-fe-md-links/~/imagen.jpg'))
      .toBe('/home/ena/Desktop/Proyectos de Laboratoria/LIM012-fe-md-links/~/imagen.jpg');
  });
  it('Debe convertir una ruta relativa a absoluta', () => {
    expect(convertPath('mkdir ~/Fotos')).toBe('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/mkdir ~/Fotos');
  });
});

describe('Verifica si la ruta ingresada es un directorio', () => {
  it('Es una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('Debe verificar si la ruta es un directorio', () => {
    expect(isDirectory('/home/ena/Desktop/Proyectos-de-Laboratoria/'))
      .toBe(true);
  });
});

describe('Verifica si la ruta ingresada es un archivo', () => {
  it('Es una función', () => {
    expect(typeof isFile).toBe('function');
  });
  it('Debe verificar si la ruta es un archivo', () => {
    expect(isFile('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-card-validation/README.md'))
      .toBe(true);
  });
});

describe('Revisa el contenido de un directorio', () => {
  it('Es una función', () => {
    expect(typeof reviewDirectoryContent).toBe('function');
  });
  it('Devuelve el contenido del directorio', () => {
    expect(reviewDirectoryContent('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-card-validation/'))
      .toEqual([
        '.babelrc',
        '.editorconfig',
        '.eslintrc',
        '.git',
        '.gitignore',
        'README.md',
        'package-lock.json',
        'package.json',
        'src',
        'test',
      ]);
  });
});

describe('Verifica si es un archivo markdown', () => {
  it('Es una función', () => {
    expect(typeof isAMarkdownFile).toBe('function');
  });
  it('Debe validar que es un archivo con extension .md', () => {
    expect(isAMarkdownFile('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-card-validation/README.md'))
      .toBe(true);
  });
  it('Debe validar devolver false ya que no es un archivo con extension .md', () => {
    expect(isAMarkdownFile('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-card-validation/README.css'))
      .toBe(false);
  });
});

describe('Retorna el href, path, file de un archivo markdown', () => {
  it('Es una función', () => {
    expect(typeof getPropertiesOfMarkdownFile).toBe('function');
  });
  it('Retorna href, path, file de un archivo markdown', () => {
    expect(getPropertiesOfMarkdownFile('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md'))
      .toEqual([
        {
          href: 'https://www.facebook.com/',
          text: 'Facebook',
          path: '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
        },
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          path: '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
        },
        {
          href: 'https://www.w3schools.com/tags/lololol',
          text: 'W3shools',
          path: '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
        },
      ]);
  });
});

describe('Retorna los archivos markdown de un directorio', () => {
  it('Es una función', () => {
    expect(typeof getMarkdownFiles).toBe('function');
  });
  it('Retorna los archivos con formato markdown de un directorio', () => {
    expect(getMarkdownFiles('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test'))
      .toContain(
        '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
        '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/sub/empty/empty.md',
        '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/sub/empty/other.md',
      );
  });
});

describe('La ruta relativa que fue ingresada de un archivo markdown , la retorna pero en absoluta ', () => {
  it('Es una función', () => {
    expect(typeof getLinksAndPathComplete).toBe('function');
  });
  it('Retorna la ruta absoluta de un archivo markdown', () => {
    expect(getLinksAndPathComplete('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md'))
      .toContain(
        '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
      );
  });
});
