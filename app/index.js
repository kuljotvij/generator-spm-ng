'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var GulpNgGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('This generator will generate a web app project using gulp, bower and angularjs.'));

     var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'Name of your app?',
        default: this.appname.replace(/\s/g,'_').replace(/\-/g,'_')
      }, {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Include Bootstrap?',
        default: false
      }, {
        type: 'confirm',
        name: 'slds',
        message: 'Include SLDS?',
        default: false
      }, {
        type: 'confirm',
        name: 'ngforce',
        message: 'Include ngForce?',
        default: false
      }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.bootstrap = props.bootstrap;
      this.slds = props.slds;
      this.ngforce = props.ngforce;
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.copy('app/_app.css', 'app/styles/main.css');
    this.copy('app/_app.js','app/scripts/main.js');
    this.copy('app/_index.html','app/index.html');
    this.copy('app/_index.page','app/' + this.appName + '.page');
    this.copy('_gitignore','.gitignore');
    // this.mkdir('app/main');
    this.copy('app/main/_main.html', 'app/views/main.html');
  },

  projectfiles: function () {
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_package.json', 'package.json');
    this.copy('_karma-unit.js', 'karma-unit.js');
  }
});

module.exports = GulpNgGenerator;
