module.exports = (function() {

  var client = './client/';
  var dist = client + 'dist';

  var config = {
    srcJs : client + 'app/**/*.js',
    styles : client + 'styles/**/*.css',    
    dist : dist,
    allDistFiles : dist + '/*',
    distStyles : dist + '/styles'
  };

  return config;


})();
