// Dynamically loading multiple images (e.g. for canvas rendering) + caching
"use strict";
// globals: Image

var SC = window.SC || {};

SC.imageCache = {};

SC.image = function (aUrl, aCallback) {
    // Load single image, call callaback when image is ready to use
    var img;
    // use cached image
    if (SC.imageCache.hasOwnProperty(aUrl)) {
        img = SC.imageCache[aUrl];
        // image may been requested before but is not yet loaded
        if (aCallback) {
            if (!img.dataLoadedDH) {
                img.addEventListener('load', function () {
                    img.dataLoadedDH = true;
                    aCallback(img);
                });
            } else {
                aCallback(img);
            }
        }
        return img;
    }
    // load new image
    img = new Image();
    img.dataUrlOriginal = aUrl;
    img.addEventListener('load', function () {
        img.dataLoadedDH = true;
        if (aCallback) {
            aCallback(img);
        }
    });
    img.src = aUrl;
    SC.imageCache[aUrl] = img;
    return img;
};

SC.images = function (aUrls, aCallback) {
    // Load multiple images, call callback once all are ready to use
    var i, img = {}, remaining = aUrls.length;
    function cb(aImage) {
        img[aImage.dataUrlOriginal] = aImage;
        remaining--;
        if (remaining <= 0) {
            aCallback(img);
        }
    }
    for (i = 0; i < aUrls.length; i++) {
        SC.image(aUrls[i], cb);
    }
};

