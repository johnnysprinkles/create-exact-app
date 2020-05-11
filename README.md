## About

Scaffolds a new starter template for an isomorphic multipage Node/Express/React
web app.

"Exact" is EXpress + reACT.

### To use

    npx create-exact-app my-app-name
    cd my-app-name
    npm run dev
    http://localhost:3000 in browser

Or you can run the template directly without even creating your own local app,
by doing:

    npx exact-template
    http://localhost:3000 in browser

Either example above can have a port specified as an environment variable, e.g.

    PORT=3131 npm run dev

### Features

* Basic Express setup in `src/main.js`
* Isomorphic page rendering in `src/server/render.js`
* Multipage support by way of a `weback.config.js` that has an array of entries
* Organizational structure that can scale with a large teams
* Various demo pages that you can delete

### Hosted demo

This is just `npx create-exact-app` run nightly in a cron job:

**http://exact.royalbarrel.com**
