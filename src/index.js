/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const http = require('http');
const path = require('path');
const fs = require('fs');


// validar si la ruta es válida o no (preguntar acerca de esto porque la ruta relativa no la valida)
const validateRoute = (routeInput) => (fs.existsSync(routeInput) ? routeInput : 'The input route is not valid');
console.log(validateRoute('/etc/passwd'));
// comprueba si es una ruta absoluta, sino lo es, la convierte.
// el método .isAbsolute devuelve un valor booleano, deacuerdo a ese valor se dan las condiciones
// en el operador ternario
const convertPath = (routeInput) => (path.isAbsolute(routeInput) ? routeInput : path.resolve(routeInput));
console.log(convertPath('mkdir ~/Fotos'));
// verificar si es un directorio o un archivo
const directory = (routeInput) => (fs.statSync(routeInput).isDirectory()); // ? true : 'Is not a directory ');
console.log(directory('/home/ena/Desktop'));
module.exports = {
  validateRoute,
  convertPath,
  directory,
};
