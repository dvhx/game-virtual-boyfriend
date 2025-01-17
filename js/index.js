// Main window
// linter: ngspicejs-lint
// global: document, window, console, GHOST
"use strict";

var SC = window.SC || {};

SC.currency = '💎';
SC.pitch = SC.storage.readNumber('SC.pitch', 1.3);
SC.multichar = [];

SC.purge = function () {
    // Erase storage and reload app
    SC.storage.eraseAll();
    document.location.reload();
};

SC.hideInputs = function () {
    // Hide inputs before making screenshots
    document.getElementById('menu').style.opacity = 0;
    document.getElementById('scenebutton').style.opacity = 0;
    document.getElementById('mic').style.opacity = 0;
    document.getElementById('question').style.opacity = 0;
};

SC.bubbleHide = function (aText) {
    // hide speech bubble
    var e = document.getElementById('bubble');
    if (document.getElementById('bubbletext').textContent === aText || !aText) {
        e.style.opacity = 0;
    }
};

SC.bubble = function (aText, aSilent) {
    // show speech bubble
    console.log('SC.bubble', aText, aSilent);
    var e, delay = 0;
    e = document.getElementById('bubble');
    if (e.style.opacity > 0) {
        e.style.opacity = 0;
        delay = 500;
    }
    window.setTimeout(function () {
        var f = document.getElementById('bubbletext');
        f.textContent = aText;
        e.style.opacity = 1;
    }, delay);
    if (!aSilent) {
        SC.speech.say(aText, function (aData) {
            console.log('speech ended', aText, aData, 'mic', SC.mic);
            // another round
            if (SC.mic) {
                SC.onClickMic();
            }
        });
    }
    GHOST.why.lastAnswer.boyfriend = aText;
    return e;
};

SC.commands = function (aText) {
    // Multiple commands
    if (Array.isArray(aText)) {
        aText = aText.join(' ');
    }
    var i, cmd = aText.trim().split('#');
    cmd.shift();
    for (i = 0; i < cmd.length; i++) {
        cmd[i] = '#' + cmd[i].trim();
    }
    console.warn(cmd);

    function one() {
        var c = cmd.shift(), par;
        console.log('c', c);
        if (!c) {
            return;
        }
        par = c.split(' ');
        if (par[0] === '#delay') {
            window.setTimeout(one, 1000 * parseFloat(par[1]));
            return;
        }
        SC.command(c);
        if (cmd.length > 0) {
            one();
        }
    }
    one();
};

SC.playerType = function (aText) {
    // Simulate typing by player
    var words = aText.split(' '), q = document.getElementById('question'), w;
    q.value = '';
    //q.focus();
    function one() {
        w = words.shift();
        q.value += ' ' + w;
        q.selectionStart = q.value.length - w.length;
        q.selectionEnd = q.selectionStart + w.length;
        if (words.length > 0) {
            window.setTimeout(one, w.length * 100);
        } else {
            window.setTimeout(function () {
                q.selectionStart = q.value.length;
                q.selectionEnd = q.selectionStart;
            }, w.length * 100);
        }
    }
    one();
};

SC.blinkElement = function (aId) {
    var opacity = [0.3, 1, 0.3, 1];
    function one() {
        document.getElementById(aId).style.opacity = opacity.shift();
        if (opacity.length > 0) {
            window.setTimeout(one, 200);
        }
    }
    one();
};

SC.command = function (aText) {
    // Run special commands, returns true if it was executed
    // These commands can also be in ghost's answer!
    console.log('command', aText);
    var scene, i, c, aa, item, par = aText.split(' ');

    // blushing
    if (aText === '*blushing*' || aText === '#blushing') {
        SC.bubbleHide();
        SC.changeFace('blushing');
        return true;
    }

    // show main menu
    if (aText === '#mainmenu') {
        SC.onClickMenu();
        return true;
    }
    // hide main menu
    if (aText === '#mainmenu hide') {
        SC.iconMenuHide();
        return true;
    }

    // scenefast
    if (aText.match(/^#scenefast /)) {
        scene = aText.replace('#scenefast ', '');
        if (SC.sceneNow === scene) {
            return true;
        }
        SC.bubbleHide();
        SC.changeScene(scene);
        return true;
    }

    // scene
    if (aText.match(/^#scene/)) {
        scene = aText.substr(7);

        // do not go to the same scene we are in now
        if (SC.sceneNow === scene) {
            // choose first candidate not from vb_mode
            c = null;
            if (GHOST.recentCandidates) {
                for (i = 0; i < GHOST.recentCandidates.length; i++) {
                    if (GHOST.recentCandidates[i].id !== "vb_mode") {
                        c = GHOST.recentCandidates[i];
                        break;
                    }
                }
            }
            if (c) {
                aa = GHOST.character[c.id].data[c.question];
                aa = aa[Math.floor(aa.length * Math.random())];
                SC.bubble(aa);
            } else {
                SC.bubble('We are already here');
            }
            return true;
        }

        // if angry don't allow to go anywhere only blank
        if (scene !== 'blank' && SC.sentiment.negative > SC.sentiment.positive) {
            SC.bubble("I don't want to go to the " + scene);
            return true;
        }

        // ask if user want to go there
        SC.bubble(SC.scenes[scene].wannaGoTo);
        SC.onYes = function () {
            // disable mic during change
            SC.micWas = SC.mic;
            SC.mic = false;
            SC.bubble(SC.scenes[scene].letsGoTo);
            window.setTimeout(function () {
                SC.changeScene(scene);
                SC.bubbleHide();
            }, 2000);
            SC.onYes = null;
            SC.onNo = null;
            return true;
        };
        SC.onNo = function () {
            SC.bubble('Maybe later');
            SC.onYes = null;
            SC.onNo = null;
            return true;
        };
        return true;
    }

    // candidates
    if (aText === '#candidates') {
        delete GHOST.log.characters;
        console.log(JSON.stringify(GHOST.log, undefined, 4));
        return true;
    }

    // bubble
    if (par[0] === '#bubble') {
        SC.bubble(aText.substr(8).trim());
        return true;
    }

    // bubblehide
    if (par[0] === '#bubblehide') {
        SC.bubbleHide();
        return true;
    }

    // purge
    if (aText === '#purge') {
        SC.storage.eraseAll();
        document.location.reload();
        return true;
    }

    // minigames
    if (aText === '#game airport') {
        item = SC.boy.wears.findSlotItem('uniform');
        if (!item || (item.type !== 'pilot')) {
            SC.bubble("I have to wear pilot's uniform, you can buy it in rare clothes shop.", false);
            return true;
        }
        SC.minigame.airport();
        return true;
    }

    if (aText === '#game hideandseek') {
        if (!SC.boy.checkSlotType('tool', 'flashlight')) {
            SC.bubble("I have to have flashlight in my hand, you can buy it in rare clothes shop.", false);
            return true;
        }
        SC.minigame.hideAndSeek();
        return true;
    }

    if (aText === '#game wordpuzzle') {
        if (!SC.boy.checkSlotType('glasses', 'nerdy')) {
            SC.bubble("I need nerdy reading glasses, you can buy them in rare clothes shop.", false);
            return true;
        }
        SC.minigame.wordPuzzle();
        return true;
    }
    if (aText === '#game volleyball') {
        if (!SC.boy.checkSlotType('uniform', 'volleyball')) {
            SC.bubble("I need to wear volleyball dress and ball, you can buy them in rare clothes shop.", false);
            return true;
        }
        SC.minigame.volleyball();
        return true;
    }
    // restaurant menu
    if (aText === '#restaurant menu') {
        // if i shows directly from voice command it freezes
        window.setTimeout(SC.restaurantMenu, 300);
        return true;
    }

    if (aText === '#beep') {
        SC.sound.play('beep');
        return true;
    }

    if (aText === '#click') {
        SC.sound.play('click');
        return true;
    }

    if (par[0] === '#pitch') {
        SC.storage.writeNumber('SC.pitch', parseFloat(par[1]));
        return true;
    }

    // shops
    if (par[0] === '#shop') {
        // use current haircut in hair color shop
        if (par[1] === 'hair_short') {
            item = SC.boy.wears.findSlotItem('hair');
            SC.shops.hair_short.type = item ? item.type : 'short';
        }
        // use current color in haircut shop
        if (par[1] === 'haircut') {
            for (i = 0; i < SC.shops.haircut.pieces.length; i++) {
                item = SC.boy.wears.findSlotItem('hair');
                SC.shops.haircut.pieces[i].presets = {Original: SC.colors[item ? item.preset : 'Original']};
            }
        }
        SC.showShop(par[1]);
        return true;
    }
    // close shop after purchase
    if (par[0] === '#scap') {
        SC.shopCloseAfterPurchase = true;
        return true;
    }

    // for video making
    if (par[0] === '#video') {
        SC.commands(aText.substr(7));
        //SC.bubble('Welcome on the beach');
        return true;
    }

    // for video making
    if (par[0] === '#playertype') {
        SC.playerType(aText.substr(12));
        return true;
    }

    if (aText === '#kb') {
        document.getElementById('scenebutton').focus();
        return true;
    }

    if (aText === '#blink scenebutton') {
        SC.blinkElement('scenebutton');
        return true;
    }

    if (par[0] === '#blink') {
        SC.blinkElement(par[1]);
        return true;
    }
    if (aText === '#closet') {
        SC.shop(SC.boy.closet, true, 'preset', SC.boy.wears); //, 'slot_type_name');
        return true;
    }
    if (par[0] === '#face') {
        SC.changeFace(par[1]);
        return true;
    }
    if (aText === '#smile') {
        SC.changeFace('happy');
        /*
        setTimeout(function () {
            SC.changeFace('neutral');
        }, 1000);
        */
        return true;
    }
    if (aText === '#credits') {
        SC.splash('Credits', ['OK'], 'skyblue', 'Programming by: dvh. New character design by: Joy. Old character design: Aeihu, Blue & AVALANCHE Game Studio (https://opengameart.org/content/q-style-cartoon-boy).');
        return true;
    }
    if (aText === '#options') {
        SC.options();
        return true;
    }
    if (aText === '#restore') {
        SC.iapRestore.restorePrompt();
        return true;
    }
    if (aText === '#testing') {
        SC.boy.earn(1000);
        SC.lip('+1000 diamonds');
        return true;
    }
};

SC.ask = function (aQuestion) {
    // ask ghost a question and show answer, handle commands
    var q2, a, sentiment, image, no_emoji_answer, name;

    // command in question
    if (SC.command(aQuestion)) {
        return;
    }

    // handle why
    q2 = GHOST.why.modify('boyfriend', aQuestion, true);

    // detect and remember name
    name = SC.name.parse(q2);
    if (name) {
        SC.user.params['$username;'] = name;
        SC.storage.writeObject('SC.user', SC.user);
        console.log('username', name);
    }

    // ask
    q2 = GHOST.appendQuestionMark(q2);
    a = GHOST.askChain(SC.multichar, q2, [0.001, 0.01, 0.02, 0.05, 0.1, 0.5, 0.9, 1]);

    // command in answer (e.g. scenes)
    if (SC.command(a && a.answer)) {
        return;
    }

    // fix unknown username
    try {
        a.answer = SC.name.fixUnknownName(a.answer);
    } catch (e) {
        console.error(e);
    }

    // sentiment analysis
    sentiment = SC.sentiment.analyze(q2 + ' . ' + a.answer);
    // handle emoji
    SC.sentiment.emoji(q2);
    no_emoji_answer = SC.sentiment.emoji(a.answer);
    console.log('removed emoji', no_emoji_answer, 'from', a.answer);

    // change facial expression
    image = SC.sentiment.image(sentiment);
    console.log('sentiment', sentiment, 'image', image);

    SC.changeFace(image);

    // handle yes/no question
    if (SC.onYes && sentiment.yes) {
        if (SC.onYes(q2, a.answer)) {
            return;
        }
    }
    if (SC.onNo && sentiment.no) {
        if (SC.onNo(q2, a.answer)) {
            return;
        }
    }

    // show and hide speech bubble
    window.setTimeout(function () {
        SC.bubble(no_emoji_answer);
    }, 300);
    window.setTimeout(function () {
        SC.bubbleHide(no_emoji_answer);
    }, 5000);

    // Every question earn one diamond
    SC.boy.earn(1);

    // debug
    document.getElementById('debug').textContent = SC.sentiment.debug();
};

SC.onKeyPressQuestion = function (event) {
    // enter asks question
    var q = event.target.value.toString().trim();
    if (event.key === 'Enter' && q !== '') {
        event.target.value = '';
        SC.ask(q);
    }
};

SC.mic = false; // true if user wants continuous mic-speak cycle

SC.onClickMic = function () {
    // click on mic icon

    // 1. neither recording or talking - turn recording on
    if (!SC.speech.recording && !SC.speech.talking) {
        SC.mic = true;
        document.getElementById('mic').className = 'on';
        SC.speech.recognition(function (aText) {
            console.log('recognition ended');
            document.getElementById('mic').className = 'off';
            if (aText) {
                SC.ask(aText);
            }
        });
        return;
    }

    // 2. already recording - stop recording
    if (SC.speech.recording) {
        SC.mic = false;
        SC.speech.recognitionStop();
        document.getElementById('mic').className = 'off';
        return;
    }

    // 3. still speaking - do not start show mic, just show it as off, do nothing
    if (SC.speech.talking) {
        SC.mic = false;
        document.getElementById('mic').className = 'off';
        return;
    }

};

SC.onClickScenes = function (event) {
    // click on boy also activates mic
    var t = event.target,
        x = event.clientX,
        y = event.clientY,
        mx = t.clientWidth,
        my = t.clientHeight;
    console.log(x, y, mx, my);
    // only near center
    if (x / mx >= 0.1 && x / mx <= 0.9 && y / my >= 0.1 && y / my <= 0.9) {
        if (SC.mic) {
            SC.onClickMic();
        }
    }
};

SC.iconMenuHide = function () {
    // hide main menu
    window.requestAnimationFrame(function () {
        document.getElementById('iconmenu').style.opacity = 0;
    });
    window.setTimeout(function () {
        document.getElementById('iconmenu').style.display = 'none';
    }, 500);
};

SC.onClickRunDataCommand = function (event) {
    // run command set in icon menu li element
    SC.iconMenuHide();
    var e = event.target;
    while (e) {
        if (e.getAttribute('dataCommand')) {
            SC.command(e.getAttribute('dataCommand'));
            break;
        }
        e = e.parentElement;
    }
};

SC.onClickMenu = function () {
    // show main menu
    var im = document.getElementById('iconmenu');
    im.style.display = 'block';
    // show menu
    window.requestAnimationFrame(function () {
        im.style.opacity = 1;
    });
    // diamonds
    im.getElementsByClassName('diamonds')[0].textContent = Math.floor(SC.boy.diamonds) + '💎';
};

SC.onResize = function () {
    // Force scene render with new aspect ratio
    console.log('SC.onResize', window.innerWidth, window.innerHeight);
    SC.sceneRender(SC.currentScene.bg, SC.currentScene.char, SC.currentScene.fg, true);
};

// initialize window
window.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', SC.onResize);

    // click listeners
    document.getElementById('mic').addEventListener('click', SC.onClickMic, true);
    document.getElementById('menu').addEventListener('click', SC.onClickMenu, true);
    document.getElementById('scenes').addEventListener('click', SC.onClickScenes, true);
    document.getElementById('question').addEventListener('keypress', SC.onKeyPressQuestion, true);
    document.getElementById('iconmenuclose').addEventListener('click', SC.iconMenuHide, true);
    document.getElementById('iconmenu').addEventListener('click', function (event) {
        console.log(event.target);
        if (event.target && (event.target.id === 'iconmenu' || event.target.tagName === 'UL')) {
            SC.iconMenuHide();
        }
    }, true);
    // looping disabled because it keeps playing even when I exit app
    SC.sound.add('restaurant', 1, false);
    SC.sound.add('beach', 1, false);
    SC.sound.add('forest', 1, false);
    SC.sound.add('beep', 1, false);
    SC.sound.add('click', 1, false);

    // set click listeners for menu LI items
    (function () {
        var im = document.getElementById('iconmenu'), li, i;
        //im.onclick = SC.iconMenuHide;
        li = im.getElementsByTagName('li');
        for (i = 0; i < li.length; i++) {
            li[i].onclick = SC.onClickRunDataCommand;
        }
    }());

    SC.changeScene(SC.storage.readString('SC.scene', 'blank'), true);
    //SC.changeFace('happy');

    // esc closes various dialogs
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            // main menu
            if (document.getElementById('iconmenu').style.display === 'block') {
                document.getElementById('iconmenuclose').click();
            }
            // shop
            if (document.getElementById('shop').style.display === 'flex') {
                SC.shopClose();
            }
        }
    });

    console.log('normal start');
});

