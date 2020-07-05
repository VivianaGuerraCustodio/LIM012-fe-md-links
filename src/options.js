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
module.exports = {
  optionStats,
  statsAndValidate,
  help,
};
