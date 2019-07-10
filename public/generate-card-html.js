
/** @function generateCardHTML 
 * Generates the appropriate HTML for the supplied card data
 * @param {object} cardData - An object describing a card
 * @returns {string} the generated HTML
 */

function generateCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    switch(cardData.type) {
         case 'article':
            generateArticleCardHTML(cardData);
            break;
        case "audio":
            generateAudioCardHTML(cardData);
            break;
        case "video":
            generateVideoCardHTML(cardData);
            break;
        case "gallery":
            generateGalleryCardHTML(cardData);
            break;
        default:
            break;
    }
}
/** @function generateAudioCardHTML
 * A helper function to generate audio card HTML
 * @param {object} cardData - the audio card data
 * @returns {string} the generated html
 */

function generateAudioCardHTML(cardData) {
    
    var html = `<body>
            <div class="card-style">
                <h2 class="audio-title">${cardData.title}</h2>
            <div id="audio-pos" style="text-align:center">
            <audio id="audio" controls="controls" src ="${cardData.source}"></audio>
                </div>
            <p style="margin-left: 10px">
            ${cardData.description}
            </p>
            </div> 
            
        </div> 
    </body>
</html>
`
    return html;
}
/** @function generateArticleCardHTML
 * A helper function to generate article card HTML
 * @param {object} cardData - the article card data
 * @returns {string} the generated html
 */

function generateArticleCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var html = `
    <!DOCTYPE html>
<html>
   
    <body>
            <div id="card-view" class="card-style">
            <h2 class="article-title">${cardData.title}<button onclick="expand()" id="close">
                    Close
                </button><div class="button-pos">
            <button type="button" onclick="expand()" id="read-more">
            Read More
            </button></div></h2>
 
                <p>${cardData.body}</p>
            </div>
    </body>
</html>
    `
    return html;
}
/** @function generateGalleryCardHTML
 * A helper function to generate gallery card HTML
 * @param {object} cardData - the gallery card data
 * @returns {string} the generated html
 */

function generateGalleryCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    
    var html = `
   <!DOCTYPE html>
<html>
  
    <body>
               <div id="gallery"  class="card-style">     
                  <h2 class="gallery-title" style="text-align: center">${cardData.title}<div class="button-pos1"><button onclick="seeGallery()" id="see-gallery">
                    See Gallery
                      </button> </div> </h2>
                   
                   <button onclick="seeGallery()" id="close-gal">
                    Close
                </button>
                <div class="container" >
                   <img class="img0" src ="https://picsum.photos/200">
                    <p  class="para">${cardData.description}</p>
                   <img   class="img1" src ="${cardData.images[0]}">
                   <img   class="img2" src ="${cardData.images[1]}">
                   <img   class="img3" src ="${cardData.images[2]}">
                   <img   class="img4" src ="${cardData.images[3]}">
                   <img   class="img5" src ="${cardData.images[4]}">
                   <img  class="img6" src ="${cardData.images[5]}">
                   <img   class="img7" src ="${cardData.images[6]}">
               </div>
                   </div>
            </div>
            
       
    </body>
</html> `
    return html;
}
/** @function generateVideoCardHTML
 * A helper function to generate video card HTML
 * @param {object} cardData - the video card data
 * @returns {string} the generated html
 */

function generateVideoCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var html = `
    <!DOCTYPE html>
<html>
    
    <body>
        <div id="content">
            <div class="video-layout">
            <div class="card-style">   
            <div class="video-title">
                   <h2>
                       ${cardData.title}
                   </h2>
            </div>
            <video id="video" width="250" height="250" controls src="${cardData.source}"></video>
            <p>${cardData.description}
            </p>
            </div>
        </div>
        </div> 
        
    </body>
</html> `
    return html;
}