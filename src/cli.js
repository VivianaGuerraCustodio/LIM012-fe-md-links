#!/usr/bin/env node
/* eslint-disable consistent-return */

/* eslint-disable no-console */

const { mdLinks } = require('./mdLinks');
const {
  optionStats,
  statsAndValidate,
  help,
} = require('./options');

const argvs = process.argv;
const path = argvs[2];
const option = argvs[3];
const option0 = argvs[4];

const cli = (route, option1, option2) => {
  if (route === undefined) {
    return console.log(`${help}`);
  }
  if (route.length > 0) {
    if ((option1 === undefined) && (option2 === undefined)) {
      return mdLinks(route, '').then((resp) => console.log(resp))
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
    if ((option1 === '--stats' && option2 === '--validate') || (option2 === '--stats' && option1 === '--validate')) {
      return mdLinks(route, { validate: true }).then((resp) => {
        console.log(`✔️ Total : ${statsAndValidate(resp).total}`);
        console.log(`✔️ Unique : ${statsAndValidate(resp).unique}`);
        console.log(`❌ Broken : ${statsAndValidate(resp).broken}`);
      })
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
    if (option1 === '--validate') {
      return mdLinks(route, { validate: true }).then((resp) => console.table(resp))
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
    if (option1 === '--stats') {
      return mdLinks(route, { validate: true }).then((resp) => {
        console.log(`✔️ Total : ${optionStats(resp).total}`);
        console.log(`✔️ Unique : ${optionStats(resp).unique}`);
      })
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
  }
};
cli(path, option, option0);
module.exports = {
  cli,
};
