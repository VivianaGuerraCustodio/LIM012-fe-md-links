/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const { validateRoute, convertPath, directory } = require('./index.js');

describe('Verificar si la ruta es valida', () => {
  it('Es una funcion', () => {
    expect(typeof validateRoute).toBe('function');
  });
  it('Debe verificar si la ruta ingresada es valida', () => {
    expect(validateRoute('/etc/passwd')).toBe('/etc/passwd');
  });
  it('Debe verificar que la ruta ingresada no es válida', () => {
    expect(validateRoute('www.facebook.com')).toBe('The input route is not valid');
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
    expect(convertPath('mkdir ~/Fotos')).toBe('/home/ena/Desktop/Proyectos de Laboratoria/LIM012-fe-md-links/mkdir ~/Fotos');
  });
});

describe('verifica si la ruta ingresada es un directorio', () => {
  it('Es una función', () => {
    expect(typeof directory).toBe('function');
  });
  it('Debe verificar si la ruta es un archivo', () => {
    expect(directory('/home/ena/Desktop/Proyectos de Laboratoria/'))
      .toBe(true);
  });
});
