const fs = require('fs');
const url = require('url');
const path = require('path');

module.exports = function streamMedia(req, res) {
  var pathname = url.parse(req.url).pathname;
  var filePath = path.join('public', pathname);
      switch(path.extname(pathname)){
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
          case ".wav":
            res.setHeader("Content-Type", "audio/wav");
            break;
          case ".mov":
            res.setHeader("Content-Type", "video/quicktime");
            break;
          case ".mp4":
            res.setHeader("Content-Type", "video/mp4");
            break;
          case ".gif":
            res.setHeader("Content-Type", "image/gif");
            break;
          case ".jpg":
            res.setHeader("Content-Type", "image/jpeg");
            break;
          case ".png":
            res.setHeader("Content-Type", "image/png");
            break;
          case ".pdf":
            res.setHeader("Content-Type", "application/pdf");
            break;
          case ".ttf":
            res.setHeader("Content-Type", "font/ttf");
            break;
          case ".wof":
            res.setHeader("Content-Type", "font/woff");
            break;
          default:
            res.setHeader('Content-Type', 'application/octet-stream');
      }

    var match = /bytes=(\d+)-(\d*)/.exec(req.headers.range);
    var start = parseInt(match[1], 10);

    fs.stat(filePath, (err, stats) => {
      if(err) {
        console.error(err);
        res.statusCode = 404;
        res.end();
        return;
      }

      var end = match[2] ? parseInt(match[2], 10) : stats.size - 1;
      res.setHeader("Content-Length", end - start + 1);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Range", `bytes ${start}-${end}/${stats.size}`);
      res.statusCode = 206;
      res.statusMessage = "Partial Content";
      var stream = fs.createReadStream(filePath, {start: start, end: end})
      .on('open', () => stream.pipe(res))
      .on('error', (err) => res.end(err));
    })

            }