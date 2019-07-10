const fs = require('fs');
const url = require('url');
const path = require('path');
const vm = require('vm');
const querystring = require('querystring');

/** @function interpretServerPage() 
 * Serves a server page, interpreting any 
 * JavaScript embedded within and concatenating 
 * it back into the page.
 * @param {http.incomingMessage} req - Request object
 * @param {http.serverResponse} res - Response object
 */
module.exports = function interpretServerPage(req, res) {
  // TODO: Load and Interpret Server Page
  // Determine the file to open
  var pathname = url.parse(req.url).pathname;
  var filePath = path.join('public', pathname);
  
  fs.readFile(filePath, {encoding: "utf-8"}, function(err, body){
  if(err) {
    console.error(err);
    res.statusCode = 400;
    res.statusMessage = "Not Found";
    res.end();
    return;
  }
 function serve(html) {
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Content-Length", html.length);
      res.end(html);
    }
    
    try {
      const queryString = url.parse(req.url).query;
      const queryParams = querystring.parse(queryString);
      var sandbox = {
        dataSource: dataSource,
        queryParams: queryParams,
        postParams: req.body || {},
        serve: serve
      }
      // Interpret the page
     vm.runInNewContext(body, sandbox);
  } catch(err) {
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = "Server Error";
      res.end();
  }
      
     
  });
}