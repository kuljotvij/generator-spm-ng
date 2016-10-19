var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});
var mainBowerFiles = require('main-bower-files');
var gutil = require('gulp-util');
var gulpFilter = require('gulp-filter');
var path = require('path');


function createFileFromString(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src
}

gulp.task('scripts', function(){
    gulp.src(['!./app/**/*_test.js','./app/**/*.js'])
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest('./build/scripts'));
});
gulp.task('cleanBuild', function () {

    return gulp.src('build', {read: false})
        .pipe(plugins.clean());
});
gulp.task('templates',function(){
    //combine all template files of the app into a js file
    gulp.src(['!./app/index.html',
        './app/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('css', function(){
    gulp.src('./app/**/*.css')
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('vendorJS', function(){
    return gulp.src(mainBowerFiles(), {
            base: './bower_components'
    })
    .pipe(gulpFilter('**/*.js'))
      /*
       * If you need the scripts to be loaded in a different order,
       * edit the array below
       */
    .pipe(plugins.order([
      "**/jquery.js",
      "**/angular.js",
      "**/angular-*.js",
      '**/lo-dash.compat.js',
      '**/safeApply.js',
      '**/restangular.js',
      '**/ngForce.js',
      '**/ngForce-*.js'
    ]))

    .pipe(plugins.concat('lib.js'))
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    return gulp.src(mainBowerFiles(), {
            base: './bower_components'
    })
    .pipe(gulpFilter('**/*.css'))
        .pipe(plugins.concat('lib.css'))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('vendorFonts', function(){
    //concatenate vendor CSS files
    return gulp.src(mainBowerFiles(), {
            base: './bower_components'
    })
    .pipe(gulpFilter('**/fonts/*'))
    .pipe(plugins.flatten())
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('customFonts', function() {
  //concatenate vendor CSS files
  <% if(bootstrap) { %>
  gulp.src('./app/styles/fonts/**')
    .pipe(gulp.dest('./build/fonts'));
  <% } %>
  <% if(slds) { %>
  gulp.src('./node_modules/salesforce-lightning-design-system/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
  <% } %>  
});

gulp.task('copy-index', function() {
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('watch',function(){
    gulp.watch([
        'build/**/*.html',
        'build/**/*.js',
        'build/**/*.css'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js','!./app/**/*test.js'],['scripts']);
    gulp.watch(['!./app/index.html','./app/**/*.html'],['templates']);
    gulp.watch('./app/**/*.css',['css']);
    gulp.watch('./app/index.html',['copy-index']);

});

gulp.task('connect', function() {
  return plugins.connect.server({
      root: ['build'],
      port: 9000,
      livereload: true
   });
});

gulp.task('zip-staticresource', function () {
    return gulp.src('build/**/*')
        .pipe(plugins.zip('<%= appName %>.resource'))
        .pipe(gulp.dest('../src/staticresources'));
});

gulp.task('meta-staticresource', function () {
    return createFileFromString('<%= appName %>.resource-meta.xml', '<?xml version="1.0" encoding="UTF-8"?><StaticResource xmlns="http://soap.sforce.com/2006/04/metadata"><cacheControl>Private</cacheControl><contentType>application/octet-stream</contentType></StaticResource>')
        .pipe(gulp.dest('../src/staticresources'));
});

gulp.task('save-static-resource-zip', ['meta-staticresource','zip-staticresource']);

gulp.task('save', ['save-static-resource-zip']);
gulp.task('build', ['connect','scripts','templates','css','copy-index','vendorJS','vendorCSS','watch','customFonts']);
gulp.task('buildOnly', ['scripts', 'templates', 'css', 'copy-index', 'vendorJS', 'vendorCSS','customFonts']);
gulp.task('cleanAndBuild', ['cleanBuild'], function() {
  gulp.start('build');
});
gulp.task('default',['cleanAndBuild']);
