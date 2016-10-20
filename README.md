This is a yeoman generator for an angularjs project that follows the [Best Practice Recommendations for Angular App Structure][1].

It takes advantage of the gulp build tool and makes use of bower and npm for dependency management.

It also allows us to incorporate some most common and useful dependencies on top of Angular App Structure creation along with sample Visualforce page that will help us to get started.

Some common and useful dependencies that will prompt during installation process:
[Bootstrap][6]
[SLDS][7]
[NgForce][8]

-----

#### GENERATED DIRECTORY STRUCTURE ####

      yourAppName/
          app/
          scripts/
              main.js
          styles/
              main.css
          views/
              main.html
          index.html
          yourAppName.page /*Sample Visualforce page*/
          bower_components/    
          node_modules/
          .bowerrc
          .gitignore
          README.md
          bower.json
          gulpgile.js
          karma-unit.js
          package.json

-----

#### FEAUTURES ####
- follows the recommended best practice project structure for angularjs
- all js files in the app/scripts folder are concatenated into build/app.js
- all html files in the app/views folder except index.html are concatenated and compiled into a js file:build/templates.js and loaded into the angular templateCache
- all css files in the app/styles folder are concatenated into build/app.css
- all js files in the bower_components folder are concatenated into build/lib.js
- all css files in the bower_components folder are concatenated into build/lib.css
- index.html is copied to build/index.html
- yourAppName.page in the app folder allows us to quick setup this in Mavensmate
- a static server is run at port 9000 with livereload support
- when any html, js or css file in the build folder changes, they are autoreloaded on the browser

-----

#### Prerequisites ####
- [node.js][2]
- [npm][3]
- [bower][4]
- [gulp.js][5]

-----

#### USAGE ####
1) npm install -g https://github.com/kuljotvij/generator-spm-ng

2) mkdir myApp && cd myApp && yo spm-ng

3) gulp

4) open browser to http://localhost:9000

5) gulp save

----


  [1]: https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub
  [2]: http://nodejs.org/
  [3]: http://www.npmjs.org/
  [4]: http://bower.io/
  [5]: http://gulpjs.com/
  [6]: https://github.com/kuljotvij/ui-tkb-bootstrap
  [7]: https://github.com/kuljotvij/slds-ng-gulp
  [8]: https://github.com/kuljotvij/ngForce-one
