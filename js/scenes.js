// Scenes definitions
"use strict";
// globals: document, window

var SC = window.SC || {};

SC.scenes = {
    blank: {
        back: 'blank_back.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        //welcome: ["We're back"],
        wannaGoTo: 'Do you want to go back?',
        letsGoTo: 'Let\'s go back!',
        position: {x1: 309, y1: 111, x2: 970, y2: 1123}
    },
    beach: {
        back: 'beach_back.jpg',
        multichar: "basic,vb_core,vb_dating,vb_beach,vb_mode",
        welcome: ["We're on the beach", "Finally on the beach", "This is my favorite beach", "The weather is perfect today", "Look at the beautiful blue sky", "Let's play some volleyball!"],
        wannaGoTo: 'Do you want to go to the beach?',
        letsGoTo: 'Let\'s go to the beach!',
        position: {x1: 321, y1: 231, x2: 958, y2: 1209},
        off: true,
        buttonLabel: 'Volleyball',
        buttonCommand: '#game volleyball'
    },
    bedroom: {
        back: 'bedroom_back.jpg',
        multichar: "basic,vb_core,vb_dating,vb_bedroom,vb_sweettalk,vb_mode",
        welcome: ["Welcome in my bedroom", "I cleaned up room just for you", "This is my favorite place anyway", "Home sweet home"],
        wannaGoTo: 'Do you want to go to my bedroom?',
        letsGoTo: 'Let\'s go back to my bedroom!',
        position: {x1: 286, y1: 117, x2: 992, y2: 1199}
    },
    restaurant: {
        back: 'restaurant_back.jpg',
        front: 'restaurant_front.png',
        multichar: "basic,vb_core,vb_dating,vb_restaurant,vb_mode",
        welcome: ["Let's talk about food", "So what's your favorite food?", "What food do you like?", "What type of food do you like the most?"],
        wannaGoTo: 'Do you want to go to the restaurant?',
        letsGoTo: 'Let\'s go to the restaurant?',
        position: {x1: 401, y1: 232, x2: 1069, y2: 1258},
        buttonLabel: 'Order food',
        buttonCommand: '#restaurant menu'
    },
    airport: {
        back: 'airport_back.jpg',
        front: 'airport_front.png',
        multichar: "basic,vb_core,vb_dating,vb_airport,vb_mode",
        welcome: ["Let's pop some balloons"],
        wannaGoTo: 'Do you want to go to airport?',
        letsGoTo: 'Let\'s go to the airport?',
        //position: {x1: 280, y1: 382, x2: 668, y2: 978},
        //position: {x1: 271, y1: 335, x2: 670, y2: 948},
        position: {x1: 346, y1: 427 + 20, x2: 610, y2: 832 + 20},
        off: true,
        buttonLabel: 'Pop balloons',
        buttonCommand: '#game airport'
    },
    forest: {
        back: 'forest_back.jpg',
        front: 'forest_front.png',
        multichar: "basic,vb_core,vb_dating,vb_forest,vb_mode",
        welcome: ["Let's play hide and seek", "Welcome to the mysterious forest", "Are you afraid of the dark?"],
        wannaGoTo: 'Do you want to go to forest?',
        letsGoTo: 'Let\'s go to the forest?',
        position: {x1: 387, y1: 280, x2: 814, y2: 936},
        off: true,
        buttonLabel: 'Hide and seek',
        buttonCommand: '#game hideandseek'
    },
    library: {
        back: 'library_back.png',
        front: 'library_front.png',
        multichar: "basic,vb_core,vb_dating,vb_library,vb_mode",
        welcome: ["I'm such a bookworm", "I love books", "Let's play some word puzzle!"],
        wannaGoTo: 'Do you want to go to the library?',
        letsGoTo: 'Let\'s go to the library?',
        position: {x1: 369 - 40, y1: 290 - 70, x2: 892 - 40, y2: 1092 - 70},
        off: true,
        buttonLabel: 'Word puzzle',
        buttonCommand: '#game wordpuzzle'
    }
    /*
    shop_tshirt: {
        back: 'shop_tshirt.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        welcome: ["In this shop we can buy nice T-shirts"],
        wannaGoTo: 'Do you want to go buy some T-shirts?',
        letsGoTo: 'Let\'s go back to buy some T-shirts!',
        buttonLabel: "View T-shirt",
        buttonCommand: "#console"
    },
    shop_shirt: {
        back: 'shop_shirt.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        welcome: ["In this shop we can buy nice shirts"],
        wannaGoTo: 'Do you want to go buy some shirts?',
        letsGoTo: 'Let\'s go back to buy some shirts!',
        buttonLabel: "View shirt",
        buttonCommand: "#console"
    },
    shop_pants: {
        back: 'shop_pants.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        welcome: ["In this shop we can buy nice pants"],
        wannaGoTo: 'Do you want to go buy some pants?',
        letsGoTo: 'Let\'s go back to buy some pants!',
        buttonLabel: "View pants",
        buttonCommand: "#console"
    },
    shop_shorts: {
        back: 'shop_shorts.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        welcome: ["In this shop we can buy nice shorts"],
        wannaGoTo: 'Do you want to go buy some shorts?',
        letsGoTo: 'Let\'s go back to buy some shorts!',
        buttonLabel: "View shorts",
        buttonCommand: "#console"
    },
    shop_shoes: {
        back: 'shop_shoes.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        welcome: ["In this shop we can buy nice shoes"],
        wannaGoTo: 'Do you want to go buy some shoes?',
        letsGoTo: 'Let\'s go back to buy some shoes!',
        buttonLabel: "View shoes",
        buttonCommand: "#console"
    },
    shop_sandals: {
        back: 'shop_sandals.jpg',
        multichar: "basic,vb_core,vb_dating,vb_mode",
        welcome: ["In this shop we can buy nice sandals"],
        wannaGoTo: 'Do you want to go buy some sandals?',
        letsGoTo: 'Let\'s go back to buy some sandals!',
        buttonLabel: "View sandals",
        buttonCommand: "#console"
    },
    */
};

