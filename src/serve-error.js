module.exports = function serveError(err, code, message, res) {
  // Log the error 
  console.error(err);
  // Send the response 
  res.statusCode = code;
  res.statusMessage = getStatusMessage(message);
  res.end();
}