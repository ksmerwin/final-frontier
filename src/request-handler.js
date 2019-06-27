const serveFile = require('./serve-file');
const streamMedia = require('./stream-media');
var http = require('http');

module.exports = function requestHandler(req, res) {
    
    if(req.method !== 'GET') {
      res.statusCode = 501;
      res.statusMessage = "Not Implemented";
      res.end();
      return;
    }
    
    if(req.headers.range) streamMedia(req, res);
    else serveFile(req, res);
}