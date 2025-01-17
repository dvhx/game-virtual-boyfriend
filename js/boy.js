// Persistent data (clothes worn, closet, diamonds)
"use strict";
// globals: document, window

var SC = window.SC || {};

SC.boy = (function () {
    // Persistent data (clothes worn, closet, diamonds)
    var self = {};

    self.diamonds = SC.storage.readNumber('SC.boy.diamonds', 200);

    self.closet = SC.closet('boy_closet2', 'My closet');
    self.wears = SC.closet('boy_wears2', 'Now wearing');
    self.face = 'happy';

    self.resetClothes = function () {
        // Reset clothes to defaults
        console.log('Wearing initial clothes...');
        self.wears.items = [];
        self.wears.generate('face', 'happy', 0, 'Face', 'Happy', SC.colorsSubset('Original'));
        self.wears.generate('eyebrows', 'happy', 0, 'Eyebrows', 'Happy', SC.colorsSubset('Hair blonde'));
        self.wears.generate('iris', 'happy', 0, 'Iris', 'Happy', SC.colorsSubset('Iris green'));
        self.wears.generate('hair', 'short', 0, 'Hair', 'Short', SC.colorsSubset('Hair blonde'));
        self.wears.generate('pants', 'shorts', 0, 'Shorts', 'Dark gray shorts', SC.colorsSubset('Dark gray'));
        self.wears.generate('jacket', 'normal', 0, 'Jacket normal', 'White jacket with short sleeves', SC.colorsSubset('White'));
        self.wears.generate('tshirt', 'short_sleeves', 0, 'Sleeveless T-shirt', 'Sky blue sleeveless T-shirt', SC.colorsSubset('Sky blue'));
        self.wears.generate('shoes', 'sandals', 0, 'Sandals', 'Olive sandals', SC.colorsSubset('Olive'));
    };

    if (self.wears.uninitialized) {
        self.resetClothes();
    }

    self.changeFace = function (aFace) {
        // Change facial expression for face/eyebrows/iris
        if (['neutral', 'happy', 'angry', 'angry_more', 'scared', 'blushing'].indexOf(aFace) < 0) {
            throw "Unknown face " + aFace;
        }
        var i, c;
        for (i = 0; i < self.wears.items.length; i++) {
            c = SC.boy.wears.items[i];
            if (c.slot === 'face' || c.slot === 'eyebrows' || c.slot === 'iris') {
                c.type = aFace;
                c.image = c.slot + '_' + aFace;
            }
        }
        self.face = aFace;
    };

    self.changeHairColor = function (aHairColor) {
        // Change hair and eyebrows color
        if (!SC.colors.hasOwnProperty(aHairColor)) {
            throw "Unknown hair color " + aHairColor;
        }
        var i, c, p = SC.colors[aHairColor];
        for (i = 0; i < self.wears.items.length; i++) {
            c = SC.boy.wears.items[i];
            if (c.slot === 'hair' || c.slot === 'eyebrows') {
                c.preset = aHairColor;
                c.hue = p.hue;
                c.brightness = p.brightness;
                c.contrast = p.contrast;
                c.saturation = p.saturation;
            }
        }
    };

    self.changeHairType = function (aHairType) {
        // Change hair type
        var i, c;
        for (i = 0; i < self.wears.items.length; i++) {
            c = SC.boy.wears.items[i];
            if (c.slot === 'hair') {
                c.type = aHairType;
                c.image = 'hair_' + aHairType;
            }
        }
    };

    self.changeIrisColor = function (aIrisColor) {
        // Change iris color
        if (!SC.colors.hasOwnProperty(aIrisColor)) {
            throw "Unknown iris color " + aIrisColor;
        }
        var i, c, p = SC.colors[aIrisColor];
        for (i = 0; i < self.wears.items.length; i++) {
            c = SC.boy.wears.items[i];
            if (c.slot === 'iris') {
                c.preset = aIrisColor;
                c.hue = p.hue;
                c.brightness = p.brightness;
                c.contrast = p.contrast;
                c.saturation = p.saturation;
            }
        }
    };

    self.save = function () {
        SC.storage.writeNumber('SC.boy.diamonds', self.diamonds);
        self.closet.save();
        self.wears.save();
    };

    self.spend = function (aPrice, aProduct) {
        // Spend amount, return true if successfull
        console.log('spend', aPrice, self.diamonds);
        var missing, iap;
        if (aPrice > self.diamonds) {
            // show lip
            if (aProduct) {
                missing = aPrice - self.diamonds;
                SC.lip("You need " + aPrice + SC.currency + " to buy " + aProduct + " but you only have " + self.diamonds + SC.currency + '. Talk more to gain more ' + SC.currency, console.log);
            }
            return false;
        }
        self.diamonds -= aPrice;
        self.save();
        return true;
    };

    self.earn = function (aMoney) {
        // Earn amount
        console.log('earn', aMoney, self.diamonds);
        if (typeof aMoney !== 'number') {
            console.warn('SC.boy.earn money not number ' + aMoney);
            return;
        }
        if (aMoney <= 0) {
            return false;
        }
        self.diamonds += aMoney;
        self.save();
        // update shop label
        var e = document.getElementById("shopdiamonds");
        if (e) {
            e.textContent = Math.floor(self.diamonds) + SC.currency;
        }
    };

    self.unwearSlot = function (aSlot) {
        // Unwears one slot, e.g. shirt
        return SC.boy.wears.unwearSlotTo(aSlot, self.closet);
    };

    self.wearHuman = function (aItemDescription) {
        // Wear named item, e.g. "Pink shirt with short sleeves"
        var i = self.closet.findHuman(aItemDescription);
        if (i >= 0) {
            self.closet.moveTo(i, self.wears);
        }
    };

    self.unwearHuman = function (aItemDescription) {
        // Unwear named item, e.g. "Pink shirt with short sleeves"
        var i = self.wears.findHuman(aItemDescription);
        if (i >= 0) {
            self.wears.moveTo(i, self.closet);
        }
    };

    self.checkSlotType = function (aSlot, aType) {
        // Return false if boy has no type in slot, used for checks in minigames (e.g. 'uniform', 'pilot')
        var item = SC.boy.wears.findSlotItem(aSlot),
            ok = item && (item.type === aType);
        return ok;
    };

    return self;
}());

