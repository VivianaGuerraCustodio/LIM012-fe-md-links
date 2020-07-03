/* eslint-disable no-undef */
const path = require('path');
const fetchMock = require('../_mocks_/nodeFetch.js');
const md = require('../src/mdLinks.js');

fetchMock
  .mock('https://www.facebook.com/', 200)
  .mock('https://nodejs.org/es/', 404)
  .mock('https://www.w3schools.com/tags/lololol', 404);


const fileMarkdown = path.resolve('test/sub/info.md');

const containerOfAnArrayOfLinks = [
  {
    href: 'https://www.facebook.com/',
    text: 'Facebook',
    file: fileMarkdown,
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node js',
    file: fileMarkdown,
  },
  {
    href: 'https://www.w3schools.com/tags/lololol',
    text: 'W3shools',
    file: fileMarkdown,
  },
];
const containerOfArrayLinksOkAndFail = [
  {
    href: 'https://www.facebook.com/',
    text: 'Facebook',
    file: fileMarkdown,
    status: 200,
    statustext: 'OK',
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node js',
    file: fileMarkdown,
    status: 404,
    statustext: 'FAIL',
  },
  {
    href: 'https://www.w3schools.com/tags/lololol',
    text: 'W3shools',
    file: fileMarkdown,
    status: 404,
    statustext: 'FAIL',
  },
];


describe('mdLinks', () => {
  it('debería retornar una lista: href, path, text, status y ok o fail', () => {
    md.mdLinks(fileMarkdown, { validate: true }).then((res) => {
      expect(res).toEqual(containerOfArrayLinksOkAndFail);
    });
  });

  it('debería retornar una lista: href, path y text', () => {
    md.mdLinks(fileMarkdown, { validate: false }).then((res) => {
      expect(res).toEqual(containerOfAnArrayOfLinks);
    }).catch((error) => {
      console.log(error);
    });
  });
});
