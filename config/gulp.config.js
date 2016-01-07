module.exports = (function() {

  var client = './client/';
  var dist = client + 'dist';

  var config = {
    srcJs : client + 'app/**/*.js',
    styles : client + 'styles/**/*.css',
    htmlTemplates : client + 'app/**/*.html',    
    dist : dist,
    allDistFiles : dist + '/*',
    distStyles : dist + '/css',
    distJs : dist + '/js',
    distImages : dist + '/images',
    distCache : dist + '/cache/',
    appFiles : [client + 'index.html', client + 'styles/**/*.css',
                client + 'app/**/*.js',client + 'app/**/*.html'],
    serverPath : './server/server.js',
    images : client + 'assets/images/**/*.*',
    templateCache : {
      file : 'template.js',
      options : {
        module : 'agora.core',
        standAlone : false,
        root : 'app/'
      }
    },
    index : client + 'index.html'    
  };

  return config;


})();
