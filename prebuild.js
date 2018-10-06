const fs = require('fs');
const child_process = require('child_process');
const packageJson = require('./package.json');

let buildPackageJson;
try {
  buildPackageJson = require('./build/package.json');
} catch (e) {
  buildPackageJson = false;
}

if (!buildPackageJson || JSON.stringify(packageJson) !== JSON.stringify(buildPackageJson)) {
  fs.writeFile("./build/package.json", JSON.stringify(packageJson, null, '  '), (err) => {
    if (err) {
      console.log(err);
      process.exit();
    }
  });

  console.log();
  console.log('Installing only production dependencies in ./build via: (cd build && npm install --only=production)')
  console.log('This make take a while depending on the size of production dependencies..')
  child_process.exec('(cd build && npm install --only=production)');
}