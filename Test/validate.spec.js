/* eslint-disable no-undef */

const validate = require('../src/index.js');

const arrayObjetos = [
  {
    href: 'https://www.facebook.com/',
    text: 'Facebook',
    path: '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    path: '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://www.w3schools.com/tags/lololol',
    text: 'W3shools',
    path: '/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md',
    status: 404,
    statusText: 'Not Found',
  },
];

describe('validate', () => {
  it('debería retornar una lista: href, path, text, status , statustext', () => {
    validate.validateAllLinks('/home/ena/Desktop/Proyectos-de-Laboratoria/LIM012-fe-md-links/test/sub/info.md').then((res) => {
      expect(res).toEqual(arrayObjetos);
    });
  });
});
