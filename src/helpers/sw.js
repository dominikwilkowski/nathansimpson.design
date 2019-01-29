const PKG = require("../../package.json");
const minify = require("babel-minify");
const path = require("path");
const fs = require("fs");

const NAME = `'nathan-simpson_${PKG.version}'`;

const isDirectory = (dir, file) =>
  fs.statSync(path.join(dir, file)).isDirectory();

const listFilesInFolder = (dir, root) => {
  root = root || dir;
  let files = [];

  fs.readdirSync(dir)
    .filter(
      file =>
        !file.startsWith(".") &&
        file !== "sw.min.js" &&
        file !== "sw.template.js"
    )
    .forEach(file => {
      if (!isDirectory(dir, file)) {
        const subPath = `${dir}/${file.replace("index.html", "")}`;
        const filePath = path.relative(root, subPath);
        const ext = fs.statSync(subPath).isDirectory() ? "/" : "";
        files.push(JSON.stringify(`${filePath}${ext}`));
      } else {
        files = [...files, ...listFilesInFolder(`${dir}/${file}`, root)];
      }
    });
  return files;
};

const getTemplateText = (NAME, filesToCache) => {
  let template = fs
    .readFileSync("src/templates/sw.template.js", "utf8")
    .replace(/\{\{NAME\}\}/g, NAME)
    .replace(/\{\{FILES\}\}/g, filesToCache);

  const minified = minify(template);
  return minified.code;
};

const filesToCache = listFilesInFolder("public");
const swFile = getTemplateText(NAME, filesToCache);

fs.writeFileSync("public/sw.min.js", swFile);
