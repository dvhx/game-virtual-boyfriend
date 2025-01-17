// Shop where user can buy clothes, renders array of clothes
"use strict";
// globals: document, window, requestAnimationFrame, setTimeout

var SC = window.SC || {};

SC.shopClose = function () {
    // Close shop
    document.getElementById("shopclose").click();
};

SC.shop = function (aCloset, aShowPrices, aWhichLabel, aSecondaryCloset) {
    // Shop where user can buy clothes
    console.log('SC.shop', aCloset && aCloset.name, aShowPrices, aWhichLabel, aSecondaryCloset && aSecondaryCloset.name);
    var self = {},
        shop = document.getElementById("shop"),
        ul = document.getElementById("shopitems"),
        c,
        status = [],
        li_index = 0,
        blocking = false;

    document.getElementById("shoptitle").textContent = aCloset.shop_name;
    ul.textContent = '';

    function updateStatus() {
        // Update diamonds label
        document.getElementById("shopdiamonds").textContent = Math.floor(SC.boy.diamonds) + '💎';
        // Update status label on all items
        var i, wears, owns, t1 = Date.now(), t2, hair_item = SC.boy.wears.findSlotItem('hair');
        for (i = 0; i < status.length; i++) {
            wears = SC.boy.wears.contains(status[i].item);
            // hair is different
            if (aCloset.name === 'haircut' && (status[i].item.slot === 'hair')) {
                wears = hair_item && (hair_item.type === status[i].item.type);
            }
            owns = wears || SC.boy.closet.contains(status[i].item);
            //console.log(status[i].item, wears, owns);
            //console.warn('r', status[i].item);
            // update label
            if (wears) {
                if (status[i].item.slot === 'iris' || status[i].item.slot === 'hair') {
                    status[i].label.className = 'wears';
                    status[i].label.textContent = '✔On';
                } else {
                    status[i].label.className = 'takeoff';
                    status[i].label.textContent = '❌️Take off';
                }
            } else if (owns) {
                status[i].label.className = 'owned';
                if (aSecondaryCloset) {
                    status[i].label.textContent = '✔Put on';
                } else {
                    status[i].label.textContent = '✔️Owned';
                }
            } else {
                status[i].label.className = 'price';
                status[i].label.textContent = status[i].item.price + '💎';
            }
        }
        t2 = Date.now();
        console.log('status updated in', t2 - t1);
    }
    window.us = updateStatus;

    function showNewItemShortly() {
        // Show new item shortly
        blocking = true;
        shop.style.opacity = 0;
        SC.changeClothes(SC.boy.wears);
        if (SC.shopCloseAfterPurchase) {
            updateStatus();
            SC.shopClose();
            return;
        }
        setTimeout(function () {
            updateStatus();
            shop.style.opacity = 1;
            setTimeout(function () {
                blocking = false;
            }, 200);
        }, 2000);
    }

    function onClick(event) {
        // click on clothes will buy them
        if (blocking) {
            console.log('blocking click during transition');
            return;
        }
        // find item clicked
        var e = event.target, item, n = 0, closet_index, wears_index;
        while (!e.dataItem) {
            e = e.parentElement;
            n++;
            if (n > 100) {
                return;
            }
        }
        item = e.dataItem;
        if (!item) {
            throw "Undefined item";
        }
        SC.shopLastClickedItem = item;
        console.log('clicked', item);
        // find if wearing or owning
        closet_index = SC.boy.closet.find(item);
        wears_index = SC.boy.wears.find(item);
        console.log('closet_index', closet_index, 'wears_index', wears_index);
        // custom click
        if (item.click) {
            item.click({
                item: item,
                closet_index: closet_index,
                wears_index: wears_index
            });
            showNewItemShortly();
            return;
        }
        // if wears unwear it
        console.log(event.type);
        if (event.type === 'click') {
            if (wears_index >= 0) {
                console.log('taking off', wears_index);
                SC.boy.wears.moveTo(wears_index, SC.boy.closet);
                showNewItemShortly();
                return;
            }
        }
        // if owns but not wearing right now then put it on
        if ((wears_index < 0) && (closet_index >= 0)) {
            console.log('putting on', closet_index);
            if (event.type === 'click') {
                SC.boy.wears.unwearSlotTo(item.slot, SC.boy.closet);
            }
            SC.boy.closet.moveTo(closet_index, SC.boy.wears);
            showNewItemShortly();
            return;
        }
        // can afford it?
        if (!SC.boy.spend(item.price, item.slot_type_preset_name || 'it')) {
            return;
        }
        console.log(JSON.stringify(item));
        console.log('buying', item.price, item.slot, item.type, item.preset);
        /*
        // buy it
        SC.boy.diamonds -= item.price;
        */
        // unwear same slot
        if (event.type === 'click') {
            SC.boy.wears.unwearSlotTo(item.slot, SC.boy.closet);
        }
        // wear it
        SC.boy.wears.add(item);
        // show it
        showNewItemShortly();
    }

    function addItem(aItem) {
        // show single clothes item
        if (typeof aItem.price === 'string') {
            throw "String prices are not supported!";
        }
        var li = document.createElement("li"),
            picture_bg = document.createElement('div'),
            picture = document.createElement('div'),
            price = document.createElement('div'),
            label = document.createElement('label'),
            is_boy_closet = aCloset.name === 'boy_closet2';

        li_index++;
        li.id = 'shop_item_' + li_index;

        // skip certain items in boy closet like iris
        if (is_boy_closet) {
            if (['iris', 'eyebrows', 'hair', 'face'].indexOf(aItem.slot) >= 0) {
                console.log('skip', aItem);
                return;
            }
        }

        // picture
        //console.warn(aItem);
        if (aItem.background_color) {
            picture_bg.className = 'picture_bg';
            picture_bg.style.backgroundColor = aItem.background_color;
        }
        if (aItem.image !== 'none') {
            picture.style.backgroundImage = 'url(image/boy/clothes/crop/' + aItem.image + '.png)';
        } else {
            picture.style.backgroundImage = 'url(image/boy/clothes/crop/none.png)';
        }
        picture.className = 'picture';
        picture.style.filter = SC.clothes.cssFilter(aItem);
        label.textContent = aItem.label; // || aItem[aWhichLabel];

        // status
        price.className = 'price';
        price.textContent = '???';
        status.push({item: aItem, label: price});

        li.appendChild(picture_bg);
        picture_bg.appendChild(picture);
        li.appendChild(label);
        if (aShowPrices) {
            label.appendChild(price);
        }
        ul.appendChild(li);

        li.dataItem = aItem;
        li.onclick = onClick;
        SC.longTap(li, onClick);

        return ul;
    }

    // render closet
    for (c = 0; c < aCloset.items.length; c++) {
        addItem(aCloset.items[c]);
    }
    // render secondary closet, e.g. what he wears so it is not in the closet
    if (aSecondaryCloset) {
        for (c = 0; c < aSecondaryCloset.items.length; c++) {
            addItem(aSecondaryCloset.items[c]);
        }
    }
    updateStatus();

    // show shop
    shop.style.display = 'flex';
    requestAnimationFrame(function () {
        shop.style.opacity = 1;
    });

    // close shop
    document.getElementById("shopclose").onclick = function () {
        li_index = 0;
        SC.changeClothes(SC.boy.wears);
        requestAnimationFrame(function () {
            shop.style.opacity = 0;
        });
        setTimeout(function () {
            shop.style.display = 'none';
        }, 500);
    };

    return self;
};

