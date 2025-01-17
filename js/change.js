// Functions for changing scene/face/hair/iris/clothes
"use strict";
// globals: document, window, GHOST, setTimeout

var SC = window.SC || {};

SC.changeScene = function (aScene, aFirst) {
    // Change scene (play sounds, greeting, multichar...)
    console.log('SC.changeScene', aScene);
    if (!SC.scenes.hasOwnProperty(aScene)) {
        aScene = 'blank';
    }
    var i, c, s;

    // hide bubble
    SC.bubbleHide();

    // remember previous scene
    SC.sceneOld = SC.sceneNow;
    SC.sceneNow = aScene;

    // transition to new scene
    SC.sceneAdd(aScene);

    // disable mic during change
    SC.micBeforeSceneSwitch = SC.mic;
    SC.mic = false;

    // fade out old scene sound
    if (SC.sound.sound.hasOwnProperty(SC.sceneOld)) {
        console.log('fade out ' + SC.sceneOld);
        SC.sound.fadeOut(SC.sceneOld, 1);
    }

    // create multichar
    SC.multichar = [];
    c = SC.scenes[aScene].multichar.split(',');
    for (i = 0; i < c.length; i++) {
        if (!GHOST.character[c[i]]) {
            console.error('SC.changeScene no character ' + c[i] + ' in ' + aScene);
            continue;
        }
        SC.multichar.push(GHOST.character[c[i]]);
    }
    if (SC.user) {
        SC.multichar.push(SC.user);
    }

    // welcome bubble
    setTimeout(function () {
        if (!aFirst && SC.scenes[aScene].welcome) {
            s = SC.scenes[aScene].welcome[Math.floor(Math.random() * SC.scenes[aScene].welcome.length)];
            console.log('welcome', s, 'micBeforeSceneSwitch', SC.micBeforeSceneSwitch, 'mic', SC.mic);
            if (SC.micWas) { // SC.micBeforeSceneSwitch || SC.mic ||
                SC.sentenceToTurnOnMic = s;
            }
            SC.bubble(s);
        }
        // show background
        // play sound
        if (SC.sound.sound.hasOwnProperty(aScene)) {
            SC.sound.volume(0.1);
            SC.sound.play(aScene);
        }
    }, 1000);

    // show scene button
    if (SC.scenes[aScene].buttonLabel) {
        document.getElementById('scenebutton').style.display = 'block';
        document.getElementById('scenebutton').style.opacity = 1;
        document.getElementById('scenebutton').textContent = SC.scenes[aScene].buttonLabel;
        document.getElementById('scenebutton').onclick = function () {
            SC.command(SC.scenes[aScene].buttonCommand);
        };
    } else {
        document.getElementById('scenebutton').style.display = 'none';
    }

    // remember scene
    if (SC.sceneOld !== SC.sceneNow) {
        SC.storage.writeString('SC.scene', aScene);
    }
};

SC.changeClothes = function () {
    // Render boy after changing clothes
    console.log('SC.changeClothes');
    SC.boy.changeFace(SC.boy.face);
    SC.boy.save();
    SC.sceneAdd(SC.sceneNow);
};

SC.changeFace = function (aFace) {
    // Change facial expression
    console.log('SC.changeFace', aFace, SC.boy.face);
    if (SC.boy.face === aFace) {
        return;
    }
    SC.boy.changeFace(aFace);
    SC.boy.save();
    SC.sceneAdd(SC.sceneNow);
};

SC.changeHairColor = function (aHairColor, aPrice) {
    // Change hair color
    console.log('SC.changeHairColor', aHairColor);
    if (aPrice > 0) {
        var cur = SC.boy.wears.findSlotItem('hair');
        // same type as now? don't charge
        if (cur && cur.preset === aHairColor) {
            console.warn('cur', cur, 'cur.preset', cur.preset, 'aHairColor', aHairColor);
            //SC.boy.changeHairType(aHairColor);
            SC.boy.save();
            SC.sceneAdd(SC.sceneNow);
            return;
        }
        // enough diamonds?
        if (cur) {
            if (!SC.boy.spend(aPrice, cur.label.toLowerCase() + ' hair dye')) {
                return;
            }
        }
    }
    console.warn('changeHairColor', aHairColor);
    SC.boy.changeHairColor(aHairColor);
    SC.boy.save();
    SC.sceneAdd(SC.sceneNow);
};

SC.changeHairType = function (aHairType, aPrice) {
    // Change hair type
    console.log('SC.changeHairType', aHairType, aPrice);
    if (aPrice > 0) {
        var cur = SC.boy.wears.findSlotItem('hair');
        // same type as now? don't charge
        if (cur && cur.type === aHairType) {
            SC.boy.changeHairType(aHairType);
            SC.boy.save();
            SC.sceneAdd(SC.sceneNow);
            return;
        }
        // enough diamonds?
        if (!SC.boy.spend(aPrice, aHairType.replace(/[_]+/g, ' ').toLowerCase() + ' haircut')) {
            return;
        }
    }
    SC.boy.changeHairType(aHairType);
    SC.boy.save();
    SC.sceneAdd(SC.sceneNow);
};

SC.changeIrisColor = function (aIrisColor, aPrice) {
    // Change iris color
    console.log('SC.changeIrisColor', aIrisColor, aPrice);
    if (aPrice > 0) {
        // enough diamonds?
        if (!SC.boy.spend(aPrice, SC.colors[aIrisColor].label.toLowerCase() + ' contact lenses')) {
            return;
        }
    }
    SC.boy.changeFace('neutral');
    SC.boy.changeIrisColor(aIrisColor);
    SC.boy.save();
    SC.sceneAdd(SC.sceneNow);
};

