const path = require('path');

/** @function determineContentType 
 * Determines the MIME type associated with 
 * the provided file path.
 * @param {string} filePath - the file path to evaluate 
 */
module.exports = function determineContentType(filePath) {
  switch(path.extname(filePath).toLowerCase()){
    case ".html":
          case ".htm":
            return "text/html";
          case ".css":
            return "text/css";
          case ".js":
            return "text/javascript";
          case ".wav":
            return "audio/wav";
          case ".mov":
            return "video/quicktime";
          case ".mp4":
            return "video/mp4";
          case ".gif":
            return "image/gif";
          case ".jpg":
            return "image/jpeg";
          case ".png":
            return "image/png";
          case ".pdf":
            return "application/pdf";
          case ".ttf":
            return "font/ttf";
          case ".wof":
            return "font/woff";
          default:
            return "application/octet-stream";
  }
}