/* eslint-disable no-console */
const {
  validateRoute,
  convertPath,
  getLinksAndPathComplete,
  validateAllLinks,
} = require('./index.js');

const mdLinks = (path, options = { validate: true }) => {
  const newPromise = new Promise((resolve, reject) => {
    const absoluteRoute = convertPath(path);
    if (validateRoute(path) === true && options.validate === undefined) {
      resolve(getLinksAndPathComplete(absoluteRoute));
    } else if (validateRoute(path) === true && options.validate === '') {
      resolve(getLinksAndPathComplete(absoluteRoute));
    } else if (validateRoute(path) === true && options.validate === true) {
      validateAllLinks(absoluteRoute).then((resp) => {
        resolve(resp);
      }).catch((err) => { reject(err); });
    } else if (validateRoute(path) === false) {
      resolve(console.log('Invalid Path'));
    }
  });
  return newPromise;
};

module.exports = { mdLinks };
