/* eslint-disable consistent-return */
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
    if ((validateRoute(path) === true && options.validate === undefined) || (validateRoute(path) === true && options.validate === '')) {
      return resolve(getLinksAndPathComplete(absoluteRoute));
    } if (validateRoute(path) === true && options.validate === true) {
      return validateAllLinks(absoluteRoute).then((resp) => {
        resolve(resp);
      }).catch((err) => { reject(err); });
    } if (validateRoute(path) === false) {
      return resolve(console.log('Invalid Path'));
    }
  });
  return newPromise;
};

module.exports = { mdLinks };
