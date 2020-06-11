/* eslint-disable max-len */
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

// validar si la ruta es válida o no (preguntar acerca de esto porque la ruta relativa no la valida)
const validateRoute = (routeInput) => (fs.existsSync(routeInput) ? routeInput : 'The input route is not valid');
// console.log(validateRoute('/etc/passwd')// );
// comprueba si es una ruta absoluta, sino lo es, la convierte.
// el método .isAbsolute devuelve un valor booleano, deacuerdo a ese valor se dan las condiciones
// en el operador ternario
const convertPath = (routeInput) => (path.isAbsolute(routeInput) ? routeInput : path.resolve(routeInput));
// console.log(convertPath('mkdir ~/Fotos')// );
// verificar si es un directorio
const isDirectory = (routeInput) => (fs.statSync(routeInput).isDirectory()); // ? true : 'Is not a directory ');
// console.log(isDirectory('/home/ena/Desktop')// );
// lee el contenido del directorio
const reviewDirectoryContent = (routeInput) => fs.readdirSync(routeInput, 'utf-8');
// console.log(reviewDirectoryContent('/home/ena/Desktop/Proyectos de Laboratoria/LI// M012-card-validation/'));
// verifica si es un archivo
const isFile = (routeInput) => (fs.statSync(routeInput).isFile());
// console.log(isFile('/home/ena/Desktop/Proyectos de Laboratoria/L// IM012-card-validation/README.md'));
// ¿El archivo tiene extensión .md?
const isAMarkdownFile = (routeInput) => (path.extname(routeInput) === '.md');
// console.log(isAMarkdownFile('/home/ena/Desktop/Proyectos de Laboratoria/LIM// 012-card-validation/README.css'));
// revisa el archivo md y extrae las propiedades href, text, file y las guarda en un array
// marked cambia el formato de markdown a html
// new jsdom es objeto constructor de simulacion del dom
const getPropertiesOfMarkdownFile = (file) => {
  const propertiesOfFile = [];
  const readMarkdownFile = fs.readFileSync(file, 'utf-8');
  const markdownToHtml = marked(readMarkdownFile);
  const simulationDom = new JSDOM(markdownToHtml);
  simulationDom.window.document.querySelectorAll('a').forEach((nodeElement) => {
    propertiesOfFile.push({
      href: nodeElement.getAttribute('href'),
      text: nodeElement.textContent,
      path: file,
    });
  });
  return propertiesOfFile;
};
// // console.log(getPropertiesOfMarkdownFile('/home/ena/Desktop/Proyectos de Laboratoria/LIM012-fe-md-links/README.md'));
const getMarkdownFiles = (directory) => {
  const absolutePath = convertPath(directory);
  let arrayMarkdownFiles = [];
  reviewDirectoryContent(absolutePath).forEach((file) => {
    const completePath = path.join(absolutePath, file);
    if (isDirectory(completePath)) {
      arrayMarkdownFiles = arrayMarkdownFiles.concat(getMarkdownFiles(completePath));
    } else if (isFile(completePath)) {
      if (isAMarkdownFile(completePath)) {
        arrayMarkdownFiles.push(completePath);
      }
    }
  });
  return arrayMarkdownFiles;
};

const getLinksAndPathComplete = (route) => {
  let routeAndLink = [];
  const filePaths = getMarkdownFiles(route);
  filePaths.forEach((fileMarkdown) => {
    routeAndLink = routeAndLink.concat(getPropertiesOfMarkdownFile(fileMarkdown));
  });
  return routeAndLink;
};
// funcion que valida el status de cada link
const validateAllLinks = (route) => {
  const arrayAllLinks = getLinksAndPathComplete(route);
  const statusAllLinks = arrayAllLinks.map((link) => fetch(link.href)
    .then((result) => ({
      href: link.href,
      text: link.text,
      path: link.path,
      status: result.status,
      statusText: result.statusText,
    })));
  return Promise.all(statusAllLinks);
};
module.exports = {
  validateRoute,
  convertPath,
  isDirectory,
  isFile,
  reviewDirectoryContent,
  isAMarkdownFile,
  getPropertiesOfMarkdownFile,
  getMarkdownFiles,
  getLinksAndPathComplete,
  validateAllLinks,
};
