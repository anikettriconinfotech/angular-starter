module.exports = (function() {

  var client = './client/';
  var dist = client + 'dist';

  var config = {
    srcJs : client + 'app/**/*.js',
    styles : client + 'styles/**/*.css',    
    dist : dist,
    allDistFiles : dist + '/*',
    distStyles : dist + '/styles',
    appFiles : [client + 'index.html', client + 'styles/**/*.css',
                client + 'app/**/*.js',client + 'app/**/*.html'],
    serverPath : './server/server.js'            
  };

  return config;


})();
