#!/usr/bin/env node

const fs = require('fs-extra');
const { Command } = require('commander');
const inquirer = require('inquirer');
const execSync = require('child_process').execSync;
const chalk = require('chalk');

// When run via "npx" the current source code file will be something like
// /Users/jpsimons/.npm/_npx/8607/lib/node_modules/create-exact-app/src/cli.js

async function go() {
  let projectName;

  let program = new Command();

  program
    .arguments('<project-directory>')
    .action(name => (projectName = name))
    .parse(process.argv);

  if (!projectName) {
    console.error('Must provide a name');
    process.exit();
  }

  // Copy the template over
  const src = __dirname + '/../node_modules/exact-template';
  const dest = process.cwd() + '/' + projectName;
  if (fs.existsSync(dest)) {
    let { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: `Directory ${projectName} already exists. Delete it and proceed?`,
    });
    if (confirm) {
      fs.removeSync(dest);
    } else {
      process.exit();
    }
  }
  fs.mkdirSync(dest);
  fs.copySync(src, dest);

  // Generate package.json
  console.log(chalk.bold('Copying template into place.'));
  let packageJsonTemplate = require(dest + '/package.json');
  let packageJson = {
    name: projectName,
    description: 'Fill this in',
    version: '1.0.0',
    main: packageJsonTemplate.main,
    dependencies: packageJsonTemplate.dependencies,
    devDependencies: packageJsonTemplate.devDependencies,
    scripts: packageJsonTemplate.scripts,
  };
  let json = JSON.stringify(packageJson, undefined, '  ');
  fs.writeFileSync(dest + '/package.json', json);

  // npm install
  console.log(chalk.bold('Installing npm dependencies.'));
  execSync('npm install --prefix ' + projectName, { stdio: 'inherit' });

  console.log(chalk.bold(`Done. cd into ${projectName} and "npm run dev" to start.`));
}

go();
