const querystring = require('querystring');
const DOUBLE_CRLF = Buffer.from([0x0D,0x0A,0x0D,0x0A]);

/** @module parseBody
 * This module downloads and parses the incoming request body.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 * @param {parseBody~callback} callback - the callback to invoke when done
 */
module.exports = function parseBody(req, res, callback) {
  var chunks = [];

  req.on('data', function(chunk){
    chunks.push(chunk);
  });

  req.on('end', function(){
    var buff = Buffer.concat(chunks);
    switch(req.headers["content-type"].split(";")[0]) {
        
      case 'application/x-www-form-urlencoded':
        req.body = querystring.parse(buff.toString());
        return callback(req, res);
        
      case 'multipart/form-data':
        try {
          var match = /boundary=(.+)$/.exec(req.headers["content-type"]);
          var boundary = match[1];
          req.body = parseMultipart(buff);
          return callback(req, res);
        } catch(err) {
          console.error(err);
          res.statusCode = 422;
          res.statusMessage = "Unprocessable Entity";
          res.end();
        }
        
      case 'text/plain':
        req.body = buff.toString();
        return callback(req, res);
        
      default:
        res.statusCode = 400;
        res.statusMessage = "Bad Request";
        res.end();
    }
  });

  req.on('error', function(err) {
    console.error(err);
    res.statusCode = 400;
    res.statusMessage = "Bad Request";
    res.end();
  });
}

/** @callback parseBody~callback
 * Callback fuction for the parseBody method.
 * The parsed body is attached to the req object.
 * @param {http.incomingMessage} req - the request object 
 * @param {http.serverResponse} res - the response object 
 */


/** @function parseMultipart
 * Parses a buffer encoded using `multipart/form-data` encoding and 
 * returns it as an object of key/value pairs
 * @param {Buffer} buffer - the buffer of multipart data 
 * @param {string} boundary - the boundary bytes separating the parts 
 */
function parseMultipart(buffer, boundary) {
  var formData = {};
  splitContentParts(buffer, boundary).forEach(function(content){
    var parts = parseContent(content);
    formData[parts[0]] = parts[1];
  });
  return formData;
}

/** @function splitContentParts
 * Splits a multipart body into the individual content
 * parts using the supplied boundary bytes.
 * @param {Buffer} buffer - the multipart body to split
 * @param {String} boundary - the bytes that separate content parts in the buffer
 * @returns {Buffer[]} contentParts  - the separated content parts as a buffer array
 */
function splitContentParts(buffer, boundary) {
  var parts = [];
  var boundaryBytes = '--' + boundary;
  var start = buffer.indexOf(boundaryBytes) + boundaryBytes.length;
  var end = buffer.indexOf(boundary, start);
  // invariant: the bytes between start and end
  // in buffer compose a content part. The value of
  // end must therefore be greater than start,
  // and both must fall between [0,buffer.length]
  while(end != -1) {
    parts.push(buffer.slice(start, end - 2));
    start = end + boundaryBytes.length;
    end = buffer.indexOf(boundaryBytes, start);
  }   
  return parts;
}

/** @function parseContentPart 
 * @param {Buffer} content - the content part to parse 
 * @returns {Array} a key/value pair as a two-element array 
 */
function parseContentPart(content) {
  const separator = content.indexOf(DOUBLE_CRLF);
  var head = content.slice(0, separator);
  var body = content.slice(separator + 4);
  var nameMatch = /name="([^"]*)"/.exec(head);
  var filenameMatch = /filename="([^"]*)"/.exec(head);
  if(filenameMatch && filenameMatch[1]) {
    // This is a file!
    var contentTypeMatch = /Content-Type:\s?(\S+)/.exec(head);
    var contentType = (contentTypeMatch && contentTypeMatch[1]) ? contentTypeMatch[1] : 'application/octet-stream';
    return [nameMatch[1], {
      filename: filenameMatch[1],
      contentType: contentType,
      data: body
    }];
  } else {
    // This is a regular input!
    return [nameMatch[1], body.toString()];
  } 
}