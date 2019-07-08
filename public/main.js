function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'cards.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if(xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        var content = document.getElementById('content');
        for(let i = 0; i < actual_JSON.length; i++) {
            switch(actual_JSON[i].type) {
                case 'article':
                    content.innerHTML += generateArticleCardHTML(actual_JSON[i]);
                    break;
                case "audio":
                    content.innerHTML += generateAudioCardHTML(actual_JSON[i]);
                    break;
                case "video":
                    content.innerHTML += generateVideoCardHTML(actual_JSON[i]);
                    break;
                case "gallery":
                    content.innerHTML += generateGalleryCardHTML(actual_JSON[i]);
                    break;
                default:
                    break;
            }
        }
    });
}
init();