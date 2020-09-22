const fs = require('fs-extra');

function cutLines(path, cutIf, cutUnless) {
  let lines = fs.readFileSync(path, 'utf8').split('\n');
  lines = lines.filter(line => !(line.match(cutIf) && (!cutUnless || !line.match(cutUnless))));
  fs.writeFileSync(path, lines.join('\n'));
}

module.exports = function lean(dest) {
  // src/server/installed-apps.js
  cutLines(dest + '/src/server/installed-apps.js', /^\s+\[/, /homepage/);

  // src/apps/...
  fs.readdirSync(dest + '/src/apps').filter(x => x != 'homepage').forEach(app => {
    fs.rmdirSync(`${dest}/src/apps/${app}`, { recursive: true });
  });

  // src/apps/homepage
  fs.writeFileSync(dest + '/src/apps/homepage/homepage-view.js',
    fs.readFileSync(__dirname + '/templates/lean/homepage-view.js'));

  // src/server/style.js
  fs.writeFileSync(dest + '/src/server/style.js',
    fs.readFileSync(__dirname + '/templates/lean/style.js'));

  // src/server/render.js
  cutLines(dest + '/src/server/render.js', /favicon|fontawesome/);

  // public
  fs.emptyDirSync(dest + '/public');

  // nav
  fs.unlinkSync(dest + '/src/components/nav.js');

  // error pages
  fs.writeFileSync(dest + '/src/views/error-view.js',
    fs.readFileSync(__dirname + '/templates/lean/error-view.js'));
  fs.writeFileSync(dest + '/src/views/not-found-view.js',
    fs.readFileSync(__dirname + '/templates/lean/not-found-view.js'));
}
