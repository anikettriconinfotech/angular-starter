var gulp = require('gulp');
var config = require('./config/gulp.config');
var args = require('yargs').argv;

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var print = require('gulp-print');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var server = require( 'gulp-develop-server' );
var bs = require( 'browser-sync' );

var options = {
    server: {
        path: config.serverPath
    },
    bs: {
        proxy: 'http://localhost:3659',
        port : 3001,
        files : config.appFiles,
        reloadDelay : 600,
        notify : false,
        injectChanges : true
    }
};

gulp.task( 'serve-dev', function() {
    server.listen( options.server, function( error ) {
        if( ! error ) bs( options.bs );
    });
});

gulp.task('lint',function() {

  log('Analyzing source files with jshint and jscs');

  return gulp.src([config.srcJs])
        .pipe(gulpif(args.verbose,print()))
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose : true} ))
        .pipe(jshint.reporter('fail'));
});


gulp.task('css',['clean-css'],function() {

  log('Doing Autoprefixing to css files');

  return gulp.src([config.styles])
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.distStyles)) 
});


function log(msg) {
  util.log(util.colors.yellow(msg));
}

function clean(path,done) {
  log('Cleaning: '+path);
  del(path).then(function (paths) {
      log('Cleaning Done');
      done();
  });
}

gulp.task('clean-dist',function(done) {
  log('Cleaning Dist');
  var path = config.allDistFiles;
  clean(path,done);
});

gulp.task('clean-css',function(done) {
  log('Cleaning Dist Css');
  var path = config.distStyles;
  clean(path,done);
});


