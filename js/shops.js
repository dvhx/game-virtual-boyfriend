// List of all shops
"use strict";
// globals: document, window

var SC = window.SC || {};

SC.shops = {
    // standard shops

    // tshirt
    tshirt_short_sleeves: {
        shop_name: 'Short T-shirts',
        slot: 'tshirt',
        type: 'short_sleeves',
        price: 5,
        slot_type_name: 'T-shirt with short sleeves',
        slot_type_preset_name: '%S T-shirt with short sleeves',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    tshirt_long_sleeves: {
        shop_name: 'Long T-shirts',
        slot: 'tshirt',
        type: 'long_sleeves',
        price: 7,
        slot_type_name: 'T-shirt with long sleeves',
        slot_type_preset_name: '%S T-shirt with long sleeves',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    tshirt_short_sleeves_holes: {
        shop_name: 'Second hand T-shirts',
        slot: 'tshirt',
        type: 'short_sleeves_holes',
        price: 1,
        slot_type_name: 'T-shirt with short sleeves and holes',
        slot_type_preset_name: '%S T-shirt with short sleeves and holes',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    tshirt_crop_top: {
        shop_name: 'Crop tops',
        slot: 'tshirt',
        type: 'crop_top',
        price: 4,
        slot_type_name: 'Crop top T-shirt',
        slot_type_preset_name: '%S crop top T-shirt',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    tshirt_sleeveless: {
        shop_name: 'Sleeveless T-shirts',
        slot: 'tshirt',
        type: 'sleeveless',
        price: 8,
        slot_type_name: 'Sleeveless T-shirt',
        slot_type_preset_name: '%S sleeveless T-shirt',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    tshirt_jacket_set: {
        shop_name: 'T-shirt/Jacket set',
        slot: 'tshirt',
        type: 'jacket_set',
        price: 9,
        slot_type_name: 'T-shirt/Jacket set',
        slot_type_preset_name: '%S T-shirt/Jacket set',
        presets: SC.colorsClothes,
        label: 'preset'
    },

    // jacket
    jacket_normal: {
        shop_name: 'Jackets with short sleeves',
        slot: 'jacket',
        type: 'normal',
        price: 9,
        slot_type_name: 'Jacket with short sleeves',
        slot_type_preset_name: '%S jacket with short sleeves',
        presets: SC.colorsClothes,
        label: 'preset'
    },

    // pants
    pants_shorts: {
        shop_name: 'Shorts',
        slot: 'pants',
        type: 'shorts',
        price: 12,
        slot_type_name: 'Shorts',
        slot_type_preset_name: '%S shorts',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    pants_jeans_normal: {
        shop_name: 'Jeans',
        slot: 'pants',
        type: 'jeans_normal',
        price: 15,
        slot_type_name: 'Jeans',
        slot_type_preset_name: '%S jeans',
        presets: SC.colorsClothes,
        label: 'preset'
    },

    // shoes
    shoes_sandals: {
        shop_name: 'Sandals',
        slot: 'shoes',
        type: 'sandals',
        price: 10,
        slot_type_name: 'Sandals',
        slot_type_preset_name: '%S sandals',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    shoes_sneakers: {
        shop_name: 'Sneakers',
        slot: 'shoes',
        type: 'sneakers',
        price: 17,
        slot_type_name: 'Sneakers',
        slot_type_preset_name: '%S sneakers',
        presets: SC.colorsClothes,
        label: 'preset'
    },

    // bag
    bag_bandolier: {
        shop_name: 'Bandoliers',
        slot: 'bag',
        type: 'bandolier',
        price: 3,
        slot_type_name: 'Bandolier',
        slot_type_preset_name: '%S bandolier',
        presets: SC.colorsClothes,
        label: 'preset'
    },
    bag_messenger: {
        shop_name: 'Messenger bags',
        slot: 'bag',
        type: 'messenger',
        price: 11,
        slot_type_name: 'Messenger bag',
        slot_type_preset_name: '%S messenger bag',
        presets: SC.colorsClothes,
        label: 'preset'
    },

    // other
    other_tie: {
        shop_name: 'Ties',
        slot: 'other',
        type: 'tie',
        price: 3,
        slot_type_name: 'Tie',
        slot_type_preset_name: '%S tie',
        presets: SC.colorsClothes,
        label: 'preset'
    },

    // hair color
    hair_short: {
        required: true,
        shop_name: 'Hair color',
        slot: 'hair',
        type: 'short',
        price: 3,
        slot_type_name: 'Hair',
        slot_type_preset_name: '%S hair',
        presets: SC.colorsHair,
        label: 'preset',
        click: function (aItem) {
            console.log('hair click', aItem);
            SC.changeHairColor(aItem.item.preset, 3);
        }
    },
    // iris color
    iris_neutral: {
        required: true,
        shop_name: 'Iris color',
        slot: 'iris',
        type: 'neutral',
        price: 3,
        slot_type_name: 'Iris',
        slot_type_preset_name: '%S iris',
        presets: SC.colorsIris,
        background_color: 'white',
        label: 'preset',
        click: function (aItem) {
            console.log('iris click', aItem);
            SC.changeIrisColor(aItem.item.preset, 3);
            //alert('Clicked ' + JSON.stringify(aItem, undefined, 4));
        }
    },

    // haircut
    haircut: {
        shop_name: 'Haircut',
        background_color: 'white',
        pieces: [
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 5);
                },
                slot: 'hair',
                type: 'short',
                label: 'Short',
                price: 5,
                slot_type_name: 'Short hair',
                slot_type_preset_name: 'Short hair',
                presets: {'Original': SC.presetOriginal}
            },
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 4);
                },
                slot: 'hair',
                type: 'asymmetrical_long',
                label: 'Asymmetrical',
                price: 5,
                slot_type_name: 'Asymmetrical hair',
                slot_type_preset_name: 'Asymmetrical hair',
                presets: {'Original': SC.presetOriginal}
            },
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 4);
                },
                slot: 'hair',
                type: 'curly',
                label: 'Curly',
                price: 4,
                slot_type_name: 'Curly hair',
                slot_type_preset_name: 'Curly hair',
                presets: {'Original': SC.presetOriginal}
            },
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 3);
                },
                slot: 'hair',
                type: 'buzz_cut',
                label: 'Buzz cut',
                price: 3,
                slot_type_name: 'Buzz cut',
                slot_type_preset_name: 'Buzz cut',
                presets: {'Original': SC.presetOriginal}
            },
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 2);
                },
                slot: 'hair',
                type: 'flat_top',
                label: 'Flat top',
                price: 2,
                slot_type_name: 'Flat top',
                slot_type_preset_name: 'Flat top',
                presets: {'Original': SC.presetOriginal}
            },
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 1);
                },
                slot: 'hair',
                type: 'messy_perm',
                label: 'Messy perm',
                price: 2,
                slot_type_name: 'Messy perm',
                slot_type_preset_name: 'Messy perm',
                presets: {'Original': SC.presetOriginal}
            },
            {
                click: function (aItem) {
                    SC.changeHairType(aItem.item.type, 3);
                },
                slot: 'hair',
                type: 'neat_perm',
                label: 'Neat perm',
                price: 2,
                slot_type_name: 'Neat perm',
                slot_type_preset_name: 'Neat perm',
                presets: {'Original': SC.presetOriginal}
            }
        ],
        click: function (aItem) {
            //console.log('iris click', aItem);
            //SC.changeIrisColor(aItem.item.preset);
            alert('Clicked ' + JSON.stringify(aItem, undefined, 4));
        }
    },

    // rare
    rare: {
        shop_name: 'Rare clothes',
        label: 'preset',
        pieces: [
            // pilot uniform
            {
                slot: 'uniform',
                type: 'pilot',
                price: 50,
                label: 'Pilot uniform',
                slot_type_name: 'Pilot uniform',
                slot_type_preset_name: 'Pilot uniform',
                presets: {'Original': SC.presetOriginal}
            },
            // flashlight
            {
                slot: 'tool',
                type: 'flashlight',
                price: 50,
                label: 'Flashlight',
                slot_type_name: 'Flashlight',
                slot_type_preset_name: 'Flashlight',
                presets: {'Original': SC.presetOriginal}
            },
            // glasses
            {
                slot: 'glasses',
                type: 'nerdy',
                background_color: 'white',
                price: 50,
                label: 'Reading glasses',
                slot_type_name: 'Reading glasses',
                slot_type_preset_name: 'Reading glasses',
                presets: {'Original': SC.presetOriginal}
            },
            // volleyball uniform
            {
                slot: 'uniform',
                type: 'volleyball',
                price: 50,
                label: 'Volleyball dress',
                slot_type_name: 'Volleyball dress',
                slot_type_preset_name: 'Volleyball dress',
                presets: {'Original': SC.presetOriginal}
            }
        ]
    },

    // ghost shirts
    tshirt_ghost: {
        shop_name: 'Rare clothes',
        pieces: [
            // pilot uniform
            {
                slot: 'uniform',
                type: 'pilot',
                price: 50,
                label: 'Pilot uniform',
                slot_type_name: 'Pilot uniform',
                slot_type_preset_name: 'Pilot uniform',
                presets: {'Original': SC.presetOriginal}
            },
            // 2x ghost
            {
                slot: 'tshirt',
                type: 'ghost',
                price: 100,
                slot_type_name: 'Ghost T-shirt',
                slot_type_preset_name: '%S ghost T-shirt',
                presets: {'Blue': SC.presetOriginal}
            },
            {
                slot: 'tshirt',
                type: 'ghost_black',
                price: 100,
                slot_type_name: 'Ghost T-shirt',
                slot_type_preset_name: '%S ghost T-shirt',
                presets: {'Black': SC.presetOriginal}
            },
            // 3x I love tree
            {
                slot: 'tshirt',
                type: 'tree_red',
                price: 100,
                slot_type_name: 'I like trees T-shirt',
                slot_type_preset_name: '%S I like trees T-shirt',
                presets: {'Red': SC.presetOriginal}
            },
            {
                slot: 'tshirt',
                type: 'tree_green',
                price: 100,
                slot_type_name: 'I like trees T-shirt',
                slot_type_preset_name: '%S I like trees T-shirt',
                presets: {'Green': SC.presetOriginal}
            },
            {
                slot: 'tshirt',
                type: 'tree_blue',
                price: 100,
                slot_type_name: 'I like trees T-shirt',
                slot_type_preset_name: '%S I like trees T-shirt',
                presets: {'Blue': SC.presetOriginal}
            },
            // Few pockets by changing presets
            {
                slot: 'tshirt',
                type: 'short_sleeves_pocket',
                price: 100,
                slot_type_name: 'I like trees T-shirt',
                slot_type_preset_name: '%S I like trees T-shirt',
                presets: SC.colorsSubset('Red', 'Green', 'Blue')
            },
            // Various minor hues of pink
            {
                slot: 'tshirt',
                type: 'short_sleeves_pocket',
                price: 100,
                slot_type_name: 'T-shirt',
                slot_type_preset_name: '%S T-shirt',
                presets: {
                    'Pink 1': {preset: "Pink", hue: 0.16, saturation: 1, brightness: 1, contrast: 1},
                    'Pink 2': {preset: "Pink", hue: 0.20, saturation: 1, brightness: 1, contrast: 1},
                    'Pink 3': {preset: "Pink", hue: 0.24, saturation: 1, brightness: 1, contrast: 1},
                    'Pink 4': {preset: "Pink", hue: 0.28, saturation: 1, brightness: 1, contrast: 1},
                    'Pink 5': {preset: "Pink", hue: 0.32, saturation: 1, brightness: 1, contrast: 1}
                }
            }
        ],
        label: 'preset'
    }
};

SC.showShop = function (aId) {
    // Show one shop
    if (!SC.shops.hasOwnProperty(aId)) {
        throw "No such shop id " + aId;
    }
    var s = SC.shops[aId],
        cl = SC.closet(aId, s.shop_name),
        p;
    if (s.pieces) {
        // Enumerated pieces
        for (p = 0; p < s.pieces.length; p++) {
            cl.generate(s.pieces[p].slot, s.pieces[p].type, s.pieces[p].price, s.pieces[p].slot_type_name, s.pieces[p].slot_type_preset_name, s.pieces[p].presets, s.pieces[p].click, s.pieces[p].background_color, s.pieces[p].required, s.pieces[p].label);
        }
    } else {
        // Single type shops
        cl.generate(s.slot, s.type, s.price, s.slot_type_name, s.slot_type_preset_name, s.presets, s.click, s.background_color);
    }
    SC.shop(cl, true, s.label, undefined, s.required);
};

(function () {
    var k, st, s, p;
    for (k in SC.shops) {
        if (SC.shops.hasOwnProperty(k)) {
            s = SC.shops[k];
            // check for order of key itself
            if (k !== 'rare') {
                if (SC.clothes.order.indexOf(k) < 0) {
                    console.error('No clothes order for ' + k);
                }
            }
            // check for order of pieces in this shop
            if (s.pieces) {
                for (p = 0; p < s.pieces.length; p++) {
                    st = s.pieces[p].slot + '_' + s.pieces[p].type;
                    if (SC.clothes.order.indexOf(st) < 0) {
                        console.error('No clothes order for ' + st);
                    }
                }
            } else {
                // check for order of single piece shop
                st = s.slot + '_' + s.type;
                if (SC.clothes.order.indexOf(st) < 0) {
                    console.error('No clothes order for ' + st);
                }
            }
        }
    }
}());
