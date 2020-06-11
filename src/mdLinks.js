const { convertPath, validateAllLinks, getLinksAndPathComplete } = require('./index.js');

const mdLinks = (path, options) => new Promise((resolve) => {
  const pathAbsolute = convertPath(path);
  if (options !== undefined && options.validate) {
    resolve(validateAllLinks(path));
  }
  resolve(getLinksAndPathComplete(pathAbsolute));
});
module.export = { mdLinks };
