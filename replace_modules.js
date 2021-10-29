const fse = require("fs-extra");

const srcDir = `modified_modules`;
const destDir = `node_modules`;

console.log("overwriting modules....");

fse.copySync(srcDir, destDir, { overwrite: true });

console.log(
  "replacing modules with SharedArrayBuffer to ArrayBuffer (firefox fix)"
);

//Load the library and specify options
const replace = require('replace-in-file');
const options = {
  files: "node_modules/**",

  from: "SharedArrayBuffer",
  to: "ArrayBuffer",
  encoding: "utf8",
  countMatches: true,
};
try {
  const results = replace.sync(options);
  console.log("Replacement results:", results);
} catch (error) {
  console.error("Error occurred:", error);
}

