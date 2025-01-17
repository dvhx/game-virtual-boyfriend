// Rendering scene back/front and placing character in scene
"use strict";
// global: document, window, setTimeout, console
// linter: ngspicejs-lint

var SC = window.SC || {};

SC.sceneRender = function (aBackElement, aCharacterElement, aFrontElement, aFast) {
    // Render scene back/front and character
    console.log('SC.sceneBackFront ' + window.innerWidth + ' ' + window.innerHeight);
    var viewport_width = window.innerWidth,
        viewport_height = window.innerHeight,
        bg_width,
        bg_height,
        bg_x,
        bg_y,
        pos,
        x1,
        y1,
        x2,
        y2,
        e = aBackElement;

    if (viewport_width < viewport_height) {
        // vertical
        bg_width = viewport_height;
        bg_height = viewport_height;
        bg_x = -(viewport_height - viewport_width) / 2;
        bg_y = 0;
    } else {
        // horizontal
        bg_width = viewport_width;
        bg_height = viewport_width;
        bg_x = 0;
        bg_y = -(viewport_width - viewport_height) / 2;
    }
    console.log(bg_width, bg_height, bg_x, bg_y);

    // back
    if (!aFast) {
        e.style.backgroundImage = 'url(image/location/' + SC.scenes[SC.sceneNow].back + ')';
    }
    // size
    e.style.backgroundSize = bg_width.toFixed(1) + 'px ' + bg_height.toFixed(1) + 'px';
    // position
    e.style.backgroundPosition = bg_x.toFixed(1) + 'px ' + bg_y.toFixed(1) + 'px';

    // boy position and size
    e = aCharacterElement;
    pos = SC.scenes[SC.sceneNow].position;

    x1 = (bg_x + (pos.x1 / 1280) * bg_width);
    y1 = (bg_y + (pos.y1 / 1280) * bg_height);
    x2 = (bg_x + (pos.x2 / 1280) * bg_width);
    y2 = (bg_y + (pos.y2 / 1280) * bg_height);

    // on blank scene make sure the boy fits entirely
    var qh = document.getElementById('question').clientHeight;
    console.log('y2', y2, window.innerHeight - qh);
    if (SC.sceneNow === 'blank' && (y2 > window.innerHeight - qh)) {
        var ar = (x2 - x1) / (y2 - y1);
        console.log('pos', pos, 'ar', ar);
        y1 = 0;
        y2 = window.innerHeight - qh;
        var pomw = y2 * ar;
        x1 = (window.innerWidth - pomw) / 2;
        x2 = (window.innerWidth + pomw) / 2;
        console.log('xyxy', x1, y1, x2, y2, 'pomw', pomw);
    }

    e.style.left = x1 + 'px';
    e.style.top = y1 + 'px';
    e.style.width = (x2 - x1) + 'px';
    e.style.height = (y2 - y1) + 'px';
    console.log('boy', e.style.left, e.style.top, e.style.width, e.style.height);
    if (!aFast) {
        SC.boy.wears.render(e, 'image/boy', 'body_default');
    }

    // front
    e = aFrontElement;
    if (SC.scenes[SC.sceneNow].front) {
        if (!aFast) {
            e.style.backgroundImage = 'url(image/location/' + SC.scenes[SC.sceneNow].front + ')';
        }
        // size
        e.style.backgroundSize = bg_width.toFixed(1) + 'px ' + bg_height.toFixed(1) + 'px';
        // position
        e.style.backgroundPosition = bg_x.toFixed(1) + 'px ' + bg_y.toFixed(1) + 'px';
    } else {
        e.style.backgroundImage = '';
    }
};

SC.scenesAdded = 0;

SC.sceneAdd = function (aScene) {
    // Add new scene atop and hide previous scene
    SC.scenesAdded++;
    //document.title = SC.scenesAdded;
    SC.previousScene = SC.currentScene;
    var old = SC.currentScene, div, bg, char, fg;
    // div with bg/char/fg
    div = document.createElement('div');
    div.className = 'full transition noborder';
    div.style.opacity = 0;
    div.dataSceneIndex = SC.scenesAdded;
    // bg
    bg = document.createElement('div');
    bg.className = 'full transition noborder cover';
    div.appendChild(bg);
    // char
    char = document.createElement('div');
    char.className = 'full';
    div.appendChild(char);
    // fg
    fg = document.createElement('div');
    fg.className = 'full transition noborder cover';
    div.appendChild(fg);
    // render
    SC.sceneNow = aScene;
    SC.sceneRender(bg, char, fg);
    // add to scenes
    document.getElementById('scenes').appendChild(div);
    // show new
    setTimeout(function () {
        div.style.opacity = 1;
    }, 300);
    // hide old scene
    setTimeout(function () {
        if (old) {
            old.div.style.opacity = 0;
            // remove old scene
            setTimeout(function () {
                console.log('removing old scene', old.div.dataSceneIndex);
                old.div.parentElement.removeChild(old.div);
                old = null;
            }, 300 + 500 + 300 + 500); // 300 show new + 500 new transition + 300 safety margin + 500 hiding old transition
        }
    }, 300 + 500 + 300); // 300 show new + 500 new transition + 300 safety margin
    // remember this as current scene
    SC.currentScene = {
        div: div,
        bg: bg,
        char: char,
        fg: fg
    };
};
