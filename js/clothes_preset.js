// Hand-picked preset clothes
"use strict";
// globals: document, window

var SC = window.SC || {};

SC.colors = {
    "Original": {preset: "Original", hue: 0, saturation: 1, brightness: 1, contrast: 1, sample: '#ffffff'},

    "White": {preset: "White", hue: 0, saturation: 0, brightness: 1.54, contrast: 1, sample: '#ffffff'},
    "Gray": {preset: "Gray", hue: 0, saturation: 0, brightness: 1, contrast: 1, sample: '#BCBCBC'},
    "Dark gray": {preset: "Dark gray", hue: 0, saturation: 0, brightness: 0.5, contrast: 1, sample: '#5E5E5E'},
    "Black": {preset: "Black", hue: 0, saturation: 0, brightness: 0.35, contrast: 1, sample: '#2F2F2F'},

    "Purple": {preset: "Purple", hue: 0.14, saturation: 1, brightness: 1, contrast: 1, sample: '#CDB1F4'},
    "Dark purple": {preset: "Dark purple", hue: 0.14, saturation: 1, brightness: 0.56, contrast: 1, sample: '#736388'},
    "Dark pink": {preset: "Dark pink", hue: 0.24, saturation: 1, brightness: 0.56, contrast: 1, sample: '#835F7D'},
    "Pink": {preset: "Pink", hue: 0.24, saturation: 1, brightness: 1, contrast: 1, sample: '#EBAADF'},

    "Red": {preset: "Red", hue: 0.40, saturation: 2, brightness: 1, contrast: 1, sample: '#FF9F91'},
    "Orange": {preset: "Orange", hue: 0.44, saturation: 1.48, brightness: 1.04, contrast: 0.8, sample: '#E6A88C'},
    "Dark peach": {preset: "Dark peach", hue: 0.40, saturation: 1, brightness: 0.56, contrast: 1, sample: '#88615D'},
    "Peach": {preset: "Peach", hue: 0.40, saturation: 1, brightness: 1, contrast: 1, sample: '#F2ADA6'},

    "Yellow": {preset: "Yellow", hue: 0.58, saturation: 3, brightness: 1.26, contrast: 1, sample: '#E1BF2D'},
    "Ochre": {preset: "Ochre", hue: 0.52, saturation: 1, brightness: 1, contrast: 1, sample: '#D5B987'},
    "Olive": {preset: "Olive", hue: 0.52, saturation: 1, brightness: 0.56, contrast: 1, sample: '#77684B'},
    "Dark green": {preset: "Dark green", hue: 0.62, saturation: 1, brightness: 0.56, contrast: 1, sample: '#636E49'},

    "Green": {preset: "Green", hue: 0.62, saturation: 1, brightness: 1, contrast: 1, sample: '#B1C582'},
    "Lime": {preset: "Lime", hue: 0.66, saturation: 2.00, brightness: 1, contrast: 1, sample: '#89D552'},
    "Dark cyan": {preset: "Dark cyan", hue: 0.78, saturation: 1, brightness: 0.56, contrast: 1, sample: '#4A735D'},
    "Cyan": {preset: "Cyan", hue: 0.78, saturation: 1, brightness: 1, contrast: 1, sample: '#85CEA6'},

    "Aqua": {preset: "Aqua", hue: 0.84, saturation: 2.42, brightness: 1, contrast: 1, sample: '#2EE6BA'},
    "Sky blue": {preset: "Sky blue", hue: 0.01, saturation: 1, brightness: 1, contrast: 1, sample: '#9CC0ED'},
    "Blue": {preset: "Blue", hue: 0, saturation: 1, brightness: 0.56, contrast: 1, sample: '#576C85'},

    "Hair white": {preset: "Hair white", label: "White", hue: 0.56, saturation: 0, brightness: 1.2, contrast: 1.34, sample: '#777777'},
    "Hair gray": {preset: "Hair gray", label: "Gray", hue: 0.56, saturation: 0, brightness: 0.91, contrast: 1.34, sample: '#777777'},
    "Hair blonde": {preset: "Hair blonde", label: "Blonde", hue: 0.54, saturation: 0.99, brightness: 1.11, contrast: 1, sample: '#F2CD83'},
    "Hair dark blonde": {preset: "Hair Dark blonde", label: "Dark blonde", hue: 0.54, saturation: 1.2, brightness: 0.81, contrast: 1.34, sample: '#F2CD83'},
    "Hair light brown": {preset: "Hair light brown", label: "Light brown", hue: 0.56, saturation: 0.75, brightness: 0.64, contrast: 3.67, sample: '#770000'},
    "Hair brown": {preset: "Hair brown", label: "Brown", hue: 0.56, saturation: 0.88, brightness: 0.55, contrast: 3.67, sample: '#770000'},
    "Hair black": {preset: "Hair black", label: "Black", hue: 0, saturation: 0, brightness: 0.54, contrast: 4.2, sample: '#2F2F2F'},
    "Hair red": {preset: "Hair red", label: "Red", hue: 0.49, saturation: 1.77, brightness: 0.76, contrast: 1.43, sample: '#E6A88C'},
    "Hair purple": {preset: "Hair purple", label: "Purple", hue: 0.12, saturation: 1.77, brightness: 0.76, contrast: 1.43, sample: '#E6A88C'},
    "Hair blue": {preset: "Hair blue", label: "Blue", hue: 0.06, saturation: 1.77, brightness: 0.76, contrast: 1.43, sample: '#E6A88C'},
    "Hair green": {preset: "Hair green", label: "Green", hue: 0.72, saturation: 1.77, brightness: 0.76, contrast: 1.43, sample: '#E6A88C'},
    "Hair pink": {preset: "Hair pink", label: "Pink", hue: 0.28, saturation: 1.77, brightness: 1.11, contrast: 1.43, sample: '#E6A88C'},

    "Iris blue": {preset: "Iris blue", label: "Blue", hue: 0, saturation: 0.44, brightness: 0.76, contrast: 3.67, sample: '#0000ff'},
    "Iris green": {preset: "Iris green", label: "Green", hue: 0.65, saturation: 0.55, brightness: 0.79, contrast: 3.72, sample: '#00ff00'},
    "Iris amber": {preset: "Iris amber", label: "Amber", hue: 0.56, saturation: 0.72, brightness: 0.69, contrast: 3.67, sample: '#990000'},
    "Iris brown": {preset: "Iris brown", label: "Brown", hue: 0.56, saturation: 0.88, brightness: 0.55, contrast: 3.67, sample: '#770000'},
    "Iris black": {preset: "Iris black", label: "Black", hue: 0.56, saturation: 0.0, brightness: 0.55, contrast: 3.67, sample: '#770000'},
    "Iris gray": {preset: "Iris gray", label: "Gray", hue: 0.56, saturation: 0, brightness: 0.76, contrast: 3.67, sample: '#777777'},
    "Iris red": {preset: "Iris red", label: "Red", hue: 0.43, saturation: 0.6, brightness: 0.61, contrast: 5, sample: '#ff0000'}
};

SC.colorsIris = {
    "Iris blue": SC.colors["Iris blue"],
    "Iris green": SC.colors["Iris green"],
    "Iris amber": SC.colors["Iris amber"],
    "Iris brown": SC.colors["Iris brown"],
    "Iris black": SC.colors["Iris black"],
    "Iris gray": SC.colors["Iris gray"],
    "Iris red": SC.colors["Iris red"]
};

SC.colorsHair = {
    "Hair white": SC.colors["Hair white"],
    "Hair gray": SC.colors["Hair gray"],
    "Dark gray": {preset: "Dark gray", hue: 0, saturation: 0, brightness: 0.5, contrast: 1, sample: '#5E5E5E'},
    "Hair black": SC.colors["Hair black"],

    "Hair blonde": SC.colors["Hair blonde"],
    "Hair dark blonde": SC.colors["Hair dark blonde"],
    "Hair light brown": SC.colors["Hair light brown"],
    "Hair brown": SC.colors["Hair brown"],
    "Hair red": SC.colors["Hair red"],
    "Hair purple": SC.colors["Hair purple"],
    "Hair blue": SC.colors["Hair blue"],
    "Hair green": SC.colors["Hair green"],
    "Hair pink": SC.colors["Hair pink"],

    "Purple": {preset: "Purple", hue: 0.14, saturation: 1, brightness: 1, contrast: 1, sample: '#CDB1F4'},
    "Dark purple": {preset: "Dark purple", hue: 0.14, saturation: 1, brightness: 0.56, contrast: 1, sample: '#736388'},
    "Dark pink": {preset: "Dark pink", hue: 0.24, saturation: 1, brightness: 0.56, contrast: 1, sample: '#835F7D'},
    "Pink": {preset: "Pink", hue: 0.24, saturation: 1, brightness: 1, contrast: 1, sample: '#EBAADF'},

    "Red": {preset: "Red", hue: 0.40, saturation: 2, brightness: 1, contrast: 1, sample: '#FF9F91'},
    "Orange": {preset: "Orange", hue: 0.44, saturation: 1.48, brightness: 1.04, contrast: 0.8, sample: '#E6A88C'},
    "Dark peach": {preset: "Dark peach", hue: 0.40, saturation: 1, brightness: 0.56, contrast: 1, sample: '#88615D'},
    "Peach": {preset: "Peach", hue: 0.40, saturation: 1, brightness: 1, contrast: 1, sample: '#F2ADA6'},

    "Yellow": {preset: "Yellow", hue: 0.58, saturation: 3, brightness: 1.26, contrast: 1, sample: '#E1BF2D'},
    "Ochre": {preset: "Ochre", hue: 0.52, saturation: 1, brightness: 1, contrast: 1, sample: '#D5B987'},
    "Olive": {preset: "Olive", hue: 0.52, saturation: 1, brightness: 0.56, contrast: 1, sample: '#77684B'},
    "Dark green": {preset: "Dark green", hue: 0.62, saturation: 1, brightness: 0.56, contrast: 1, sample: '#636E49'},

    "Green": {preset: "Green", hue: 0.62, saturation: 1, brightness: 1, contrast: 1, sample: '#B1C582'},
    "Lime": {preset: "Lime", hue: 0.66, saturation: 2.00, brightness: 1, contrast: 1, sample: '#89D552'},
    "Dark cyan": {preset: "Dark cyan", hue: 0.78, saturation: 1, brightness: 0.56, contrast: 1, sample: '#4A735D'},
    "Cyan": {preset: "Cyan", hue: 0.78, saturation: 1, brightness: 1, contrast: 1, sample: '#85CEA6'},

    "Aqua": {preset: "Aqua", hue: 0.84, saturation: 2.42, brightness: 1, contrast: 1, sample: '#2EE6BA'},
    "Sky blue": {preset: "Sky blue", hue: 0.01, saturation: 1, brightness: 1, contrast: 1, sample: '#9CC0ED'},
    "Blue": {preset: "Blue", hue: 0, saturation: 1, brightness: 0.56, contrast: 1, sample: '#576C85'}

};

SC.presetOriginal = SC.colors.Original;

SC.colorPreset = function (aImage, aColor) {
    // Create image+hsbc
    if (!SC.colors.hasOwnProperty(aColor)) {
        console.error('No such color preset "' + aColor + '"');
    }
    return {
        preset: aColor,
        image: aImage,
        label: SC.colors[aColor].label || aColor,
        hue: SC.colors[aColor].hue,
        saturation: SC.colors[aColor].saturation,
        brightness: SC.colors[aColor].brightness,
        contrast: SC.colors[aColor].contrast
    };
};

SC.colorsSubset = function () {
    // Return subset of SC.colors, e.g. SC.colorsSubset('Red', 'Green', 'Blue')
    var i, o = {};
    for (i = 0; i < arguments.length; i++) {
        o[arguments[i]] = SC.colors[arguments[i]];
    }
    return o;
};

SC.colorsClothes = SC.colorsSubset("White", "Gray", "Dark gray", "Black", "Purple", "Dark purple", "Dark pink", "Pink", "Red", "Orange", "Dark peach", "Peach", "Yellow", "Ochre", "Olive", "Dark green", "Green", "Lime", "Dark cyan", "Cyan", "Aqua", "Sky blue", "Blue");

