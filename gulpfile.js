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
var taskListing = require( 'gulp-task-listing' );
var imageMin = require( 'gulp-imagemin' );
var htmlMin = require('gulp-htmlmin');
var angularTemplateCache = require( 'gulp-angular-templatecache' );
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');

var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var Server = require('karma').Server;

var serverOptions = {
  path: config.serverPath
};

gulp.task( 'serve-dev', function() {
    server.listen( serverOptions, function( error ) {
        if( ! error ) {
          startBrowserSync(true);
        }
    });
});


gulp.task( 'serve-build',['optimize'], function() {

    serverOptions.env = {
      NODE_ENV: 'production'
    };
    
    server.listen( serverOptions, function( error ) {
        if( ! error ) {
          startBrowserSync(false);
        }
    });
});

gulp.task( 'serve-build-watch',['optimize'], function() {

    serverOptions.env = {
      NODE_ENV: 'production'
    };
    
    server.listen( serverOptions, function( error ) {
        if( ! error ) {
          startBrowserSync(false,true);
        }
    });
});


function startBrowserSync(isDev,watch) {

  if(args.nosync || bs.active) {
    return;
  }

  var filesToWatch = isDev ? config.appFiles : [];

  if(!isDev && watch) {
    gulp.watch(config.appFiles,['optimize',bs.reload]);
  }

  var options = {
        proxy: 'http://localhost:3659',
        port : 3001,
        files : filesToWatch,
        reloadDelay : 600,
        notify : false,
        injectChanges : true
    };

  bs(options);  

}

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
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

gulp.task('help',taskListing);

gulp.task('template-cache',['clean-dist'],function() {

  return gulp
          .src(config.htmlTemplates)
          .pipe(htmlMin({}))
          .pipe(angularTemplateCache(config.templateCache.file,config.templateCache.options))
          .pipe(gulp.dest(config.distCache));
});

gulp.task('optimize',['template-cache'],function() {

  var templateCacheFile = config.distCache + config.templateCache.file; 
  var cssFilter = filter('**/*.css',{restore : true});
  var jsFilter = filter('**/*.js',{restore : true});
  var htmlFilter = filter(['**/*.js','**/*.css'],{restore : true});

  return gulp
          .src(config.index)  
          .pipe(plumber())
          .pipe(inject(gulp.src(templateCacheFile, {read : false}), {
            starttag : '<!-- inject:templates:js -->',
            ignorePath: '/client',
            addRootSlash: false
          }))
          .pipe(useref())
          .pipe(cssFilter)
          .pipe(csso())
          .pipe(cssFilter.restore)
          .pipe(jsFilter)
          .pipe(uglify())
          .pipe(jsFilter.restore)
          .pipe(htmlFilter)
          .pipe(rev())
          .pipe(htmlFilter.restore)
          .pipe(revReplace())
          .pipe(gulp.dest(config.dist))
          .pipe(rev.manifest())
          .pipe(gulp.dest(config.dist));

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

gulp.task('images',['clean-images'],function() {
    log('Copying and Optimizing Images to dist');

    gulp
        .src([config.images])
        .pipe(imageMin({optimizationLevel : 4}))
        .pipe(gulp.dest(config.distImages));     
});

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

gulp.task('clean-images',function(done) {
  log('Cleaning Dist Images');
  var path = config.distImages;
  clean(path,done);
});


