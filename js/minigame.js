// Minigames via iframes
// linter: ngspicejs-lint
// global: window, document, console
"use strict";

var SC = window.SC || {};

SC.minigame = (function () {
    var self = {}, container, iframe;

    window.addEventListener('DOMContentLoaded', function () {
        // Get elements
        container = document.getElementById('minigame');
        iframe = document.getElementById('minigame_iframe');
    });

    window.addEventListener('message', function (event) {
        // Receive message from minigame will close iframe
        console.log('received message', event);
        var msg = event.data, diamonds = 10;
        if (!msg || !msg.action) {
            return;
        }
        // close the minigame
        if (msg.action === 'quit') {
            container.style.display = 'none';
            iframe.src = '';
        }
        // get some diamonds?
        if (msg.data && msg.data.score > 0) {
            diamonds += msg.data.score;
        }
        if (msg.data && msg.data.win) {
            SC.boy.earn(diamonds);
            SC.lip('+' + diamonds.toString() + SC.currency, 15);
        }
    });


    self.wordPuzzle = function () {
        // Play word puzzle minigame
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = 'url(image/location/library.png)';
        container.style.backgroundSize = '100% 100%';
        iframe.src = 'https://dvhx.github.io/game-word-puzzle/?quit=Back%20to%20library';
        container.style.display = 'block';
        iframe.focus();
    };

    self.hideAndSeek = function () {
        // Play hide and seek minigame
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = '';
        iframe.src = 'https://dvhx.github.io/game-hide-and-seek/?quit=Go%20back';
        container.style.display = 'block';
        iframe.focus();
    };

    self.airport = function () {
        // Play balloon mountains minigame in airport mode
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = '';
        iframe.src = 'https://dvhx.github.io/game-balloon-mountains/?mode=airport';
        container.style.display = 'block';
        iframe.focus();
    };

    self.volleyball = function () {
        // Play beach volleyball minigame
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = '';
        iframe.src = 'https://dvhx.github.io/game-beach-volleyball/?quit=Quit';
        container.style.display = 'block';
        iframe.focus();
    };

    return self;
}());
