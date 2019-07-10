function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/cards.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if(xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init(title, body) {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
       var lastid = actual_JSON[actual_JSON.length-1].id;
       actual_JSON.push(createArticleCard(lastid+1, title, body));
       response = JSON.stringify(actual_JSON);
    });
}


function createArticleCard(id, title, body){
    var obj= "'id': " + id +",\n'type': 'article',\n'title': " + title + ",\n'body': " +body;
    return obj;
}