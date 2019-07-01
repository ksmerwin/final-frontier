const fs = require('fs');
const url = require('url');
const path = require('path');
const serveIndex = require('./serve-index');
const streamMedia = require('./stream-media');
const serveFile = require('./serve-file');
const interpretServerPage = require('./interpret-server-page');
const serveError = require('./serve-error');


module.exports = function requestHandler(req, res) {

    if(req.method !== 'GET') {
    res.statusCode = 501;
    res.statusMessage = "Not Implemented";
    res.end();
    return;
  }
    
    
     var pathname = url.parse(req.url).pathname;
  var filePath = path.join('public', pathname);
  fs.stat(filePath, function(err, stats) {
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
    }

    if(path.extname(filePath) === '.nsp') {
  interpretServerPage(req, res);
}
    else if (stats.isFile()) {
          serveFile(filePath, res, function(err){
              if(err) serveError(err, 500, "Server Error", res);
            });
    } else if(stats.isDirectory()) {
      serveIndex(filePath, res, function(err){
          if(err) serveError(err, 500, "Server Error", res);
            });
    } else {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
    }
        
  // TODO: Serve File or Index
});
} 