// Crop transparent edges from image
"use strict";
// globals: document, window

var SC = window.SC || {};

SC.crop = function (aImage) {
    // crop transparent part of the image
    // draw original to canvas to obtain RGB data
    var canvas = document.createElement('canvas'),
        context,
        iw = aImage.width,
        ih = aImage.height,
        p,
        i,
        x,
        y,
        alpha,
        minx = iw,
        maxx = 0,
        miny = ih,
        maxy = 0;
    canvas.width = aImage.width;
    canvas.height = aImage.height;
    context = canvas.getContext('2d');
    context.drawImage(aImage, 0, 0);
    p = context.getImageData(0, 0, iw, ih);
    for (y = 0; y < p.height; y++) {
        for (x = 0; x < p.width; x++) {
            // get alpha
            i = y * iw * 4 + x * 4;
            alpha = p.data[i + 3];
            // find x extremes
            if (alpha > 0) {
                if (x < minx) {
                    minx = x;
                }
                if (x > maxx) {
                    maxx = x;
                }
                if (y < miny) {
                    miny = y;
                }
                if (y > maxy) {
                    maxy = y;
                }
            }
        }
    }
    return {x: minx, y: miny, w: maxx - minx, h: maxy - miny};
};

