// Options to change name, age, location, ...
"use strict";
// globals: document, window, GHOST

var SC = window.SC || {};

// User"s character
SC.user = SC.storage.readObject("SC.user", GHOST.createCharacter(GHOST.character.vb_core.params["$nick;"], "user"));
SC.user.id = "user";
SC.user.params = SC.user.params || {};
SC.user.params["$nick;"] = SC.user.params["$nick;"] || GHOST.character.vb_core.params["$nick;"];
SC.user.params["$borndate;"] = SC.user.params["$borndate;"] || GHOST.character.vb_core.params["$borndate;"];
SC.user.params["$age;"] = SC.user.params["$age;"] || GHOST.character.vb_core.params["$age;"];
SC.user.params["$sex;"] = SC.user.params["$sex;"] || GHOST.character.vb_core.params["$sex;"];
SC.user.params["$location;"] = SC.user.params["$location;"] || GHOST.character.vb_core.params["$location;"];
SC.user.params["$city;"] = SC.user.params["$city;"] || GHOST.character.vb_core.params["$city;"];
SC.user.params["$height;"] = SC.user.params["$height;"] || GHOST.character.vb_core.params["$height;"];
SC.user.params["$weight;"] = SC.user.params["$weight;"] || GHOST.character.vb_core.params["$weight;"];

SC.user = SC.user;

SC.options = function (aCallback) {
    // Show options dialog and handle inputs
    var e = SC.elementsWithId();

    // fill current data
    e.options_name.value = SC.user.params['$nick;'];
    e.options_borndate.value = SC.user.params['$borndate;'] || GHOST.character.vb_core.params['$borndate;'];
    e.options_age.value = SC.user.params['$age;'] || GHOST.character.vb_core.params['$age;'];
    e.options_sex.value = SC.user.params['$sex;'] || GHOST.character.vb_core.params['$sex;'];
    e.options_location.value = SC.user.params['$location;'] || GHOST.character.vb_core.params['$location;'];
    e.options_city.value = SC.user.params['$city;'] || GHOST.character.vb_core.params['$city;'];
    e.options_height.value = SC.user.params['$height;'] || GHOST.character.vb_core.params['$height;'];
    e.options_weight.value = SC.user.params['$weight;'] || GHOST.character.vb_core.params['$weight;'];
    e.options_user_name.value = SC.user.params['$username;'] || GHOST.character.vb_core.params['$username;'] || '';
    SC.speech.fillSelectWithVoices(e.options_voice, 30);
    e.options_pitch.value = SC.speech.pitch;
    e.options_voice_test.onclick = function () {
        e.options_voice_test.style.opacity = 0.5;
        SC.speech.voice_name = e.options_voice.value;
        SC.speech.pitch = parseFloat(e.options_pitch.value);
        SC.speech.say('Quick brown fox jumped over the lazy dog.', function () {
            e.options_voice_test.style.opacity = 1;
        });
    };

    e.options_save.onclick = function () {
        // Save and close dialog
        SC.user.params['$nick;'] = e.options_name.value;
        SC.user.params['$borndate;'] = e.options_borndate.value;
        SC.user.params['$age;'] = e.options_age.value;
        SC.user.params['$sex;'] = e.options_sex.value;
        SC.user.params['$location;'] = e.options_location.value;
        SC.user.params['$city;'] = e.options_city.value;
        SC.user.params['$height;'] = e.options_height.value;
        SC.user.params['$weight;'] = e.options_weight.value;
        SC.user.params['$username;'] = e.options_user_name.value;
        SC.storage.writeObject('SC.user', SC.user);
        SC.speech.voice_name = e.options_voice.value;
        SC.speech.pitch = parseFloat(e.options_pitch.value);
        SC.storage.writeString('SC.speech.voice', SC.speech.voice_name);
        SC.storage.writeNumber('SC.speech.pitch', SC.speech.pitch);
        e.options.close();
        if (aCallback) {
            aCallback();
        }
    };

    var original_voice_name = SC.speech.voice_name, original_voice_pitch = SC.speech.pitch;

    e.options_cancel.onclick = function () {
        // Close options without saving
        SC.speech.voice_name = original_voice_name;
        SC.speech.pitch = original_voice_pitch;
        e.options.close();
    };

    e.options.showModal();
};
