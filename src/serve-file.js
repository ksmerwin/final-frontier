const fs = require('fs');
const url = require('url');
const path = require('path');


module.exports = function serveFile(req, res) {
     
    var pathname = url.parse(req.url).pathname; 
    var filePath = path.join('public/assets', pathname);
    
    fs.readFile(filePath, function(err, body){
      if(err) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
        }
      res.setHeader("Content-Length", body.length);
      
      switch (path.extname(filePath).toLowerCase()) {
          case ".html":
          case ".htm":
            res.setHeader("Content-Type", "text/html");
            break;
          case ".css":
            res.setHeader("Content-Type", "text/css");
            break;
          case ".js":
            res.setHeader("Content-Type", "text/javascript");
            break;
          default:
            res.setHeader("Content-Type", "application/octet-stream");
            break;
        }
     res.end(body);
    })


}