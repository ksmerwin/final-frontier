/** final-frontier.js
 * JavaScript for the final frontier CMS app 
 * 
 * Place your custom JavaScript in this document 
 */

"use strict";


function expand(){
        var exp = document.getElementById("card-view");
        var cont = document.getElementById("content");
        var read = document.getElementById("read-more");
        var close = document.getElementById("close");
        cont.classList.toggle("expanded-div");
        exp.classList.toggle("expanded-div");
        exp.classList.toggle("card-style");
        read.classList.toggle("expanded-div");
        close.classList.toggle("expanded-div");
}

function seeGallery(){
    var fullGalleryContent = document.getElementById("content");
    var fullGalleryGallery = document.getElementById("gallery");
    var seeGal = document.getElementById("see-gallery");
    var close2 = document.getElementById("close-gal");
    fullGalleryContent.classList.toggle("full-gallery");
    fullGalleryGallery.classList.toggle("full-gallery");
    fullGalleryGallery.classList.toggle("card-style");
    close2.classList.toggle("full-gallery");
    seeGal.classList.toggle("full-gallery");
    
    
}