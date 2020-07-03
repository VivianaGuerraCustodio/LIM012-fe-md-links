/* eslint-disable max-len */
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

const validateRoute = (routeInput) => fs.existsSync(routeInput);

const convertPath = (routeInput) => (path.isAbsolute(routeInput) ? routeInput : path.resolve(routeInput));

const isDirectory = (routeInput) => (fs.statSync(routeInput).isDirectory());

const reviewDirectoryContent = (routeInput) => fs.readdirSync(routeInput, 'utf-8');

const isFile = (routeInput) => fs.statSync(routeInput).isFile();

const isAMarkdownFile = (routeInput) => (path.extname(routeInput) === '.md');

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

const getMarkdownFiles = (directory) => {
  const absolutePath = convertPath(directory);
  let arrayMarkdownFiles = [];
  if (isDirectory(absolutePath)) {
    reviewDirectoryContent(absolutePath).forEach((file) => {
      const completePath = path.join(absolutePath, file);
      arrayMarkdownFiles = arrayMarkdownFiles.concat(getMarkdownFiles(completePath));
    });
  } else if (isFile(absolutePath)) {
    if (isAMarkdownFile(absolutePath)) {
      arrayMarkdownFiles.push(absolutePath);
    }
  }
  return arrayMarkdownFiles;
};

const getLinksAndPathComplete = (route) => {
  let routeAndLink = [];
  const filePaths = getMarkdownFiles(route);
  filePaths.forEach((fileMarkdown) => {
    routeAndLink = routeAndLink.concat(getMarkdownFiles(fileMarkdown));
  });
  return routeAndLink;
};

const createAnIterableArray = (arr) => arr.map((file) => getPropertiesOfMarkdownFile(file));

const validateAllLinks = (route) => {
  const arrayAllLinks = getLinksAndPathComplete(route);
  const matrixElementsConcatenated = createAnIterableArray(arrayAllLinks).flat();
  const statusAllLinks = matrixElementsConcatenated.map((object) => fetch(object.href)
    .then((response) => ({
      href: object.href,
      text: object.text,
      path: object.path,
      status: response.status,
      statusText: response.statusText,
    })).catch((err) => ({
      status: err.status,
      statusText: err.statusText,
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
