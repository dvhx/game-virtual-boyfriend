// Persistent array of clothes, pieces can be added or removed, shops are technically closets too, boy has closet and boy itself is closet too
"use strict";
// globals: document, window, GHOST

var SC = window.SC || {};

SC.closet = function (aName, aShopName) {
    var self = {};
    self.name = aName;
    self.shop_name = aShopName;
    self.items = SC.storage.readArray('VB_CLOSET2_' + aName, []);
    self.uninitialized = !SC.storage.keyExists('VB_CLOSET2_' + aName);
    self.changed = false;

    self.save = function () {
        SC.storage.writeArray('VB_CLOSET2_' + aName, self.items);
    };

    self.generate = function (aSlot, aType, aPrice, aSlotTypeName, aSlotTypePresetName, aPresets, aClick, aBackgroundColor, aRequired, aCustomLabel) {
        // Generate all color combinations from original using presets
        var p, n;
        for (p in aPresets) {
            if (aPresets.hasOwnProperty(p)) {
                n = aSlotTypePresetName.replace('%s', p.toLowerCase()).replace('%S', p.substr(0, 1).toUpperCase() + p.substr(1).toLowerCase());
                self.items.push({
                    slot: aSlot,                                // tshirt                                   tshirt
                    type: aType,                                // short_sleeves                            ghost
                    price: aPrice,                              // 5                                        12
                    image: aSlot + '_' + aType,                 // tshirt_short_sleeves                     tshirt_ghost
                    background_color: aBackgroundColor,         // white
                    preset: p,                                  // Dark green                               Black
                    //type_name: aTypeName,                       // Short sleeves                            Black
                    slot_type_name: aSlotTypeName,              // T-Shirt with short sleeves               T-Shirt with ghost
                    slot_type_preset_name: n,                   // Dark green T-Shirt with short sleeves    Black T-shirt with ghost
                    hue: aPresets[p].hue,                       // 0.2                                      0
                    saturation: aPresets[p].saturation,         // 0.12                                     1
                    brightness: aPresets[p].brightness,         // 0.97                                     1
                    contrast: aPresets[p].contrast,             // 0.8                                      1
                    sample: aPresets[p].sample,                 // #77ff33                                  #222222
                    click: aClick,                              // custom click handler
                    label: aCustomLabel || aPresets[p].label || p,              // shown in shop, e.g. "White" instead of "Iris white"
                    required: aRequired                         // true=cannot unwear, e.g. iris
                });
            }
        }
        self.changed = true;
    };

    self.remove = function (aIndex) {
        // Remove single item, return it
        if ((aIndex === undefined) || (aIndex < 0) || (aIndex > self.items.length)) {
            throw "Closet index out of range " + aIndex;
        }
        var item = self.items[aIndex];
        self.items.splice(aIndex, 1);
        self.save();
        self.changed = true;
        return item;
    };

    self.add = function (aItem) {
        // Add item
        var i = self.items.push(aItem);
        self.save();
        self.changed = true;
        return i;
    };

    self.find = function (aItem) {
        // Find item index (or -1) with same image, hue, saturation, brightness and contrast
        var i;
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i].image === aItem.image
                    && self.items[i].hue === aItem.hue
                    && self.items[i].saturation === aItem.saturation
                    && self.items[i].brightness === aItem.brightness
                    && self.items[i].contrast === aItem.contrast) {
                return i;
            }
        }
        return -1;
    };

    self.findSlot = function (aSlot) {
        // Find item index in given slot or -1
        var i;
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i].slot === aSlot) {
                return i;
            }
        }
        return -1;
    };

    self.findSlotItem = function (aSlot) {
        // Find item in given slot or null
        var i = self.findSlot(aSlot);
        if (i < 0) {
            return null;
        }
        return self.items[i];
    };

    self.findHuman = function (aItemDescription) {
        // Find item index (or -1) with similar image, hue, saturation, brightness and contrast
        var i, tmp, a;
        tmp = GHOST.createCharacter('tmp', 'tmp');
        console.log(aItemDescription);
        for (i = 0; i < self.items.length; i++) {
            GHOST.addQuestionAnswer(tmp, self.items[i].slot_type_preset_name, i.toString());
        }
        a = GHOST.askChain([tmp], aItemDescription);
        return parseInt(a.answer, 10) || -1;
    };

    self.contains = function (aItem) {
        // Return true if this closet contains item
        return self.find(aItem) >= 0;
    };

    self.moveTo = function (aIndex, aDestinationCloset) {
        // (Almost) atomic transfer of clothes from this closet to another closet
        if ((aIndex === undefined) || (aIndex < 0) || (aIndex > self.items.length)) {
            throw "Closet index out of range " + aIndex;
        }
        var item = self.items[aIndex];
        self.items.splice(aIndex, 1);
        aDestinationCloset.items.push(item);
        self.save();
        aDestinationCloset.save();
        self.changed = true;
        aDestinationCloset.changed = true;
        return item;
    };

    self.unwearSlotTo = function (aSlot, aDestinationCloset) {
        // Unwear all items with give slot to another closet (from wears to closet)
        var i, item;
        for (i = self.items.length - 1; i >= 0; i--) {
            if (self.items[i].slot === aSlot) {
                item = self.items[i];
                self.items.splice(i, 1);
                aDestinationCloset.items.push(item);
                console.log('moved', item);
            }
        }
        self.save();
        aDestinationCloset.save();
        self.changed = true;
        aDestinationCloset.changed = true;
    };

    self.render = function (aElement, aPath, aBase) {
        // render all slots in this closet in correct slot order
        SC.clothes.combine(aElement, aPath, aBase, self.items);
    };

    return self;
};
