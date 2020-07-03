#!/usr/bin/env node

/* eslint-disable no-console */

const { mdLinks } = require('./mdLinks');

const optionStats = (linksArr) => {
  const totalLinks = linksArr.length;
  const uniqueLinks = [...new Set(linksArr.map((links) => links.href))].length;
  return { total: totalLinks, unique: uniqueLinks };
};
const statsAndValidate = (linksArr) => {
  const totalLinks = linksArr.length;
  const uniqueLinks = [...new Set(linksArr.map((links) => links.href))].length;
  const brokenLinks = linksArr.filter((element) => element.status >= 400).length;
  return { total: totalLinks, unique: uniqueLinks, broken: brokenLinks };
};
const help = `
Questions❓
Check this little guide 😊 ⬇️⬇️⬇️ 
          mdLinks <path to file> [option]
     ****************OPTIONS*****************
     mdLinks <file path> --validate
     mdLinks <file path> --stats
     mdLinks <file path> --validate --stats
     ****************************************
If you did not find the help you were looking for, contact me at email   
vivianaguerracustodio@gmail.com  
     `;

const argvs = process.argv;
const path = argvs[2];
const option = argvs[3];
const option0 = argvs[4];

const cli = (route, option1, option2) => {
  if (route.length > 0) {
    if ((option1 === undefined) && (option2 === undefined)) {
      mdLinks(route, '').then((resp) => console.log(resp))
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
    if ((option1 === '--stats' && option2 === '--validate') || (option2 === '--stats' && option1 === '--validate')) {
      mdLinks(route, { validate: true }).then((resp) => {
        console.log(`✔️ Total : ${statsAndValidate(resp).total}`);
        console.log(`✔️ Unique : ${statsAndValidate(resp).unique}`);
        console.log(`❌ Broken : ${statsAndValidate(resp).broken}`);
      })
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
    if (option1 === '--validate') {
      mdLinks(route, { validate: true }).then((resp) => console.table(resp))
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
    if (option1 === '--stats') {
      mdLinks(route, { validate: true }).then((resp) => {
        console.log(`✔️ Total : ${optionStats(resp).total}`);
        console.log(`✔️ Unique : ${optionStats(resp).unique}`);
      })
        .catch((error) => console.log(`Error${error} generado n/ ${help}`));
    }
  } if (route === undefined) {
    console.log(`${help}`);
  }
};
cli(path, option, option0);
module.exports = {
  cli,
};
