const fs = require('fs');
var categories = fs.readdirSync('data');
var cache = {};
categories.forEach(function(file) {
  var json = fs.readFileSync(`data/${file}`, {encoding: "utf-8"});
  var category = file.replace('.json', '');
  cache[category] = JSON.parse(json);
});


/** @function saveCache
 * Saves the specified cache catgory to a file based on its name
 * @param {string} category - the cache category to save 
 */
function saveCache(category){
  try {
    var json = JSON.stringify(cache[category]);
    fs.writeFile(`data/${category}.json`, json, {encoding: "utf-8"}, function(err) {
      if(err) console.error(err);
    });
  } catch (err) {
    console.error(err);
  }
}



/** @module DataSource 
 * Exposes CRUD methods for working with a data source.
 */
module.exports = {
  create: create,
  read: read
}

/** @function create 
 * Creates the item in the data source
 * @param {string} category - the category to add the item to
 * @param {object} item - the item to add. 
 * @param {create~callback} callback - the callback to invoke when done.
 */
function create(category, item, callback){
  fs.readFile(`data/${category}.json`, {encoding: "utf-8"}, function(err, data){
    if(err) return callback(err);
    var items = JSON.parse(data);
    var id = item.id;
    items[id] = item;
    var newData = JSON.stringify(items);
    fs.writeFile(`data/${category}.json`, newData, {encoding: "utf-8"}, function(err){
      if(err) return callback(err);
      callback(null, item);
    });
  });
}


/** @callback create~callback 
 * Callback invoked by the dataSource.create() method.
 * @param {string|object} error - any error that occured, or a falsy value if none
 * @param {string} id - the identifier assigned to the item.
 */

/** @function read
 * Reads the item from the data source
 * @param {string} id - the identifier of the item to read. 
 * @param {create~callback} callback - the callback to invoke when done.
 */
function read(id, callback) {
  var parts = id.split("/");
  switch(parts.length){
    case 1:
      if(cache && cache[parts[0]]) {
      // If execution reaches this point, then the category exists
        callback(null, Object.values(cache[parts[0]]));
      } else {
      // But if it reaches here, then it does not
        callback(`DataSource Error: Category ${id} does not exist in the data source`);
      }
      break;
    case 2:
      if(cache && cache[parts[0]] && cache[parts[0]][parts[1]]) {
      // If execution reaches this point, then the item exists
        callback(null, cache[parts[0]][parts[1]]);
      } else {
  // But if it reaches here, then it does not
        callback(`DataSource Error: Item ${id} does not exist in the data store`);
      }
      break;
    default:
      callback("DataSource Error: Improperly formatted id")
  }
}
/** @callback read~callback 
 * Callback invoked by the dataSource.create() method.
 * @param {string|object} error - any error that occured, or a falsy value if none
 * @param {object} item - the requested item
 */