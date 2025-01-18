// Speech synthesis and recognition
// linter: ngspicejs-lint
// global: window, console, document
"use strict";

var SC = window.SC || {};

SC.speech = (function () {
    var self = {}, last_recognition;
    self.available = undefined;  // true|false
    self.ready = false;          // true|false
    self.voices = [];            // available voices sorted by best first (by local us english male voices first)
    self.voice_name = SC.storage.readString('SC.speech.voice', undefined); // default or user-selected voice name
    self.pitch = SC.storage.readNumber('SC.speech.pitch', 1.3);            // default 1.3 to make it sound younger
    self.recording = false; // true while mic is recording
    self.talking = false;   // true while it is speaking

    function processVoices () {
        // sort voices by priority: english, male, us, uk
        var voices = window.speechSynthesis && window.speechSynthesis.getVoices();
        var weight = {
            english: 8,
            male: 4,
            us: 3,
            'en-us': 3,
            america: 3,
            britain: 1,
            'en-uk': 1,
            uk: 1,
            lancaster: 1,
            scotland: -0.3,
            welsh: -1,
            ancient: -3,
            anikarobot: -1,
            female1: -1,
            female2: -1,
            female3: -1,
            female4: -1,
            female5: -1,
            male1: 1,
            male2: 1,
            male3: 1,
            male4: 1,
            male5: 1,
            male6: 1,
            male7: 1,
            male8: 1,
            male_whisper: -1,
            female_whisper: -1,
            grandpa: -5,
            grandma: -5,
        };
        var voice_name_found = false;
        self.voices = voices.map((v,i) => {
            var score = 0;
            var m = (v.name || '').split(/\b/);
            if (m) {
                m.forEach((s) => {
                    score += weight[s.toLowerCase()] || 0;
                });
            }
            if (v.name === self.voice_name) {
                voice_name_found = true;
            }
            return {
                index: i,
                voice: v,
                name: v.name,
                score
            };
        }).sort((a,b) => b.score - a.score).map((o) => o.voice);
        self.ready = true;
        self.available = self.voices.length > 0;
        if (!voice_name_found) {
            self.voice_name = self.available ? self.voices[0].name : undefined;
        }
        console.log('Speech synthesis is', (self.available ? 'available' : 'NOT available'), 'with', self.voices.length, 'voices, default is', self.voice_name);
    }
    window.speechSynthesis.addEventListener('voiceschanged', processVoices);
    processVoices();

    self.fillSelectWithVoices = function (aSelect, aLimitCount) {
        // Fill select with available voices
        aSelect.textContent = '';
        [{name: 'none'}].concat(self.voices).forEach((v, i) => {
            if (!aLimitCount || (i < aLimitCount)) {
                var opt = document.createElement('option');
                opt.textContent = v.name;
                if (v.name === self.voice_name) {
                    opt.selected = true;
                }
                aSelect.appendChild(opt);
            }
        });
    };

    self.say = function (aMessage, aCallback) {
        // Say message with current voice
        if (!self.available || !self.ready || !self.voice_name || self.voice_name === 'none') {
            aCallback();
            return;
        }
        var msg = new window.SpeechSynthesisUtterance();
        msg.voice = self.voices.find((v) => v.name === self.voice_name);
        msg.text = aMessage;
        msg.pitch = self.pitch || 1;
        msg.onend = function () {
            self.talking = false;
            aCallback(aMessage);
        };
        self.talking = true;
        window.speechSynthesis.speak(msg);
        return msg;
    };

    self.recognition = function (aCallback) {
        // Start voice recognition and pass sentence to callback
        self.recognitionStop();
        var C = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!C) {
            aCallback('');
            return;
        }
        last_recognition = new C();
        last_recognition.onnomatch = function (event) {
            console.log('onnomatch');
            last_recognition = null;
            self.recording = false;
            aCallback();
        };
        last_recognition.onend = function (event) {
            console.log('onend');
            last_recognition = null;
            self.recording = false;
            aCallback();
        };
        last_recognition.onresult = function (event) {
            console.log('onresult');
            console.log(event.results);
            last_recognition = null;
            self.recording = false;
            if (event.results && event.results[0] && event.results[0][0]) {
                aCallback(event.results[0][0].transcript);
            } else {
                aCallback();
            }
        };
        self.recording = true;
        last_recognition.start();
        return last_recognition;
    };

    self.recognitionStop = function () {
        // Stop voice recognition
        if (last_recognition) {
            last_recognition.abort();
            last_recognition = null;
            self.recording = false;
        }
    };

    return self;
}());


