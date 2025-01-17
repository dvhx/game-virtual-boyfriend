// Detect long tap on elements
"use strict";
// globals: document, window, setTimeout, clearTimeout

var SC = window.SC || {};

SC.longTap = function (aElementOrId, aCallback) {
    // Assign long tap event callback for element
    var e = typeof aElementOrId === 'string' ? document.getElementById(aElementOrId) : aElementOrId,
        t,
        down;

    function start() {
        clearTimeout(t);
        t = setTimeout(function () {
            if (down) {
                aCallback({type: 'longtap', target: e});
            }
        }, 1000);
        down = true;
    }

    function end() {
        down = false;
        clearTimeout(t);
    }

    e.addEventListener('mousedown', start);
    e.addEventListener('mouseup', end);
    e.addEventListener('touchstart', start);
    e.addEventListener('touchend', end);
};
