// Combining clothes, hue rotation
"use strict";
// globals: document, window

var SC = window.SC || {};

SC.pieceName = {
    "jacket_normal": "Jacket",
    "tshirt_short_sleeves": "T-shirt",
    "tshirt_long_sleeves": "Long T-shirt",
    "tshirt_crop_top": "Crop top",
    "tshirt_sleeveless": "Sleeveless shirt",
    "pants_shorts": "shorts",
    "pants_jeans": "jeans",
    "shoes_sneakers": "sneakers",
    "shoes_sandals": "sandals"
};

SC.pieceToName = function (aPiece) {
    if (SC.pieceName.hasOwnProperty(aPiece)) {
        return SC.pieceName[aPiece];
    }
    return aPiece;
};

SC.clothes = (function () {
    // Combining clothes, hue rotation
    var self = {}, editorResizeCallback;
    self.order = [
        'body_default',
        // poses
        'angry_more',
        'angry',
        'blushing',
        'evil',
        'happy',
        'naked',
        'neutral',
        'scared',
        'talking',
        // faces
        'face_angry',
        'face_angry_more',
        'face_blushing',
        'face_happy',
        'face_neutral',
        'face_scared',
        // iris
        'iris_angry',
        'iris_angry_more',
        'iris_blushing',
        'iris_happy',
        'iris_neutral',
        'iris_scared',
        // eyebrows
        'eyebrows_angry',
        'eyebrows_angry_more',
        'eyebrows_blushing',
        'eyebrows_happy',
        'eyebrows_neutral',
        'eyebrows_scared',
        // one-piece clothes (they stop rendering the rest including the hair)
        'uniform_pilot',
        // hair
        'haircut', // not used in normal shop but needs order
        'hair_Hair', // some weird bug
        'hair_short',
        'hair_curly',
        'hair_buzz_cut',
        'hair_flat_top',
        'hair_asymmetrical_long',
        'hair_messy_perm',
        'hair_neat_perm',
        // uniforms with hair
        'uniform_volleyball',
        'uniform_volleyball_no_ball',
        // glasses
        'glasses_nerdy',
        'glasses_nerdy_asymmetrical_long',
        // clothes
        'shoes_sneakers',
        'pants_jeans_normal',
        'pants_shorts',
        'pants_1',
        'pants_2',
        'pants_3',
        'tshirt_long_sleeves',
        'tshirt_short_sleeves',
        'tshirt_short_sleeves_holes',
        'tshirt_sleeveless',
        'tshirt_crop_top',
        'tshirt_ghost',
        'tshirt_ghost_black',
        'tshirt_tree_red',
        'tshirt_tree_green',
        'tshirt_tree_blue',
        'tshirt_short_sleeves_pocket',
        'tshirt_jacket_set',
        'tshirt_1',
        'tshirt_2',
        'tshirt_3',
        'bag_messenger',
        'bag_bandolier',
        'bag_1',
        'bag_2',
        'bag_3',
        'other_tie',
        'other_1',
        'other_2',
        'other_3',
        'shirt_short_sleeves',
        'shirt_1',
        'shirt_2',
        'shirt_3',
        'jacket_normal',
        'jacket_shiny',
        'jacket_1',
        'jacket_2',
        'jacket_3',
        'shoes_sandals',
        'shoes_1',
        'shoes_2',
        'shoes_3',
        // tools
        'tool_flashlight'
    ];

    function aspect(aCanvasWidth, aCanvasHeight, aImageWidth, aImageHeight) {
        // calculate max canvas position and size (while preserving image aspect ratio)
        var q;
        if (aCanvasWidth / aCanvasHeight >= aImageWidth / aImageHeight) {
            q = aImageWidth * (aCanvasHeight / aImageHeight);
            return {x: (aCanvasWidth - q) / 2, y: 0, w: q, h: aCanvasHeight};
        }
        q = aCanvasWidth * aImageHeight / aImageWidth;
        return {x: 0, y: (aCanvasHeight - q) / 2, w: aCanvasWidth, h: q};
    }

    self.cssFilter = function (aHsbc) {
        // return CSS filter
        var a = [];
        if (typeof aHsbc.hue === 'number') {
            a.push('hue-rotate(' + (aHsbc.hue * 360).toFixed(0) + 'deg)');
        }
        if (typeof aHsbc.saturation === 'number' && aHsbc.saturation !== 1) {
            a.push('saturate(' + aHsbc.saturation.toFixed(3) + ')');
        }
        if (typeof aHsbc.brightness === 'number' && aHsbc.brightness !== 1) {
            a.push('brightness(' + aHsbc.brightness.toFixed(3) + ')');
        }
        if (typeof aHsbc.contrast === 'number' && aHsbc.contrast !== 1) {
            a.push('contrast(' + aHsbc.contrast.toFixed(3) + ')');
        }
        return a.join(' ');
    };

    self.specialCombination = function (aPieces, aPiece) {
        // Return different image for special combination of clothes (e.g. tshirt under jacket is rendered with parts cut out)
        var i = 0, has = [];
        for (i = 0; i < aPieces.length; i++) {
            has[aPieces[i].image] = true;
        }
        if (has.jacket_normal && aPiece === 'tshirt_long_sleeves') {
            return 'tshirt_long_sleeves_under_jacket';
        }
        if (has.jacket_normal && aPiece === 'tshirt_short_sleeves') {
            return 'tshirt_short_sleeves_under_jacket';
        }
        if (has.hair_asymmetrical_long && aPiece === 'glasses_nerdy') {
            return 'glasses_nerdy_asymmetrical_long';
        }
        //console.log('aPieces', aPieces, 'aPiece', aPiece, 'has', has);
        /*
        if (has.jacket_normal && aPiece === 'tshirt_short_sleeves') {
            return 'tshirt_short_sleeves_under_jacket';
        }
        */
        return aPiece;
    };

    self.combine = function (aElement, aPath, aBase, aClothes) {
        // Combine multiple clothes in one image
        var i, pieces = JSON.parse(JSON.stringify(aClothes)), one, problem = false;
        //console.log('SC.clothes.combine', aBase, 'clothes', aClothes, 'images', images);
        // base image
        pieces.unshift({image: aBase, hue: 0, saturation: 1, brightness: 1, contrast: 1});
        // sort pieces correctly
        //console.warn('pieces', pieces);
        pieces.sort(function (a, b) {
            var ia = self.order.indexOf(a.image),
                ib = self.order.indexOf(b.image);
            if (ia < 0) {
                problem = true;
                console.error('No order for ' + a.image + ' ' + JSON.stringify(pieces));
            }
            if (ib < 0) {
                problem = true;
                console.error('No order for ' + b.image + ' ' + JSON.stringify(pieces));
            }
            return (ia - ib);
            //console.log(a.image, '???', b.image);
        });
        // there was a problem with double click on hair of same color
        if (problem) {
            SC.boy.resetClothes();
            SC.boy.save();
            document.location.reload();
            return;
        }
        //console.warn('b', pieces);
        // clothes
        aElement.textContent = '';
        for (i = 0; i < pieces.length; i++) {
            //console.log('piece', pieces[i]);
            one = document.createElement('div');
            one.className = 'piece';
            one.style.backgroundImage = 'url(' + aPath + '/' + (i > 0 ? 'clothes/' : '') + self.specialCombination(pieces, pieces[i].image) + '.png)';
            one.style.filter = self.cssFilter(pieces[i]);
            aElement.appendChild(one);
            // break after uniform
            if (pieces[i].slot === 'uniform') {
                break;
            }
        }

    };

    window.addEventListener('resize', function () {
        // handle window resize
        var c = document.getElementById('clothes_editor_canvas');
        if (c) {
            c.width = c.clientWidth;
            c.height = c.clientHeight;
            if (editorResizeCallback) {
                editorResizeCallback();
            }
        } else {
            console.warn('No clothes_editor_canvas');
        }
    });

    self.editor = function (aImage, aHsbc, aCallback) {
        // Show editor where user can adjust HSV of a piece of clothes
        var main = document.getElementById('clothes_editor'),
            clothes_editor_canvas = document.getElementById('clothes_editor_canvas'),
            context = clothes_editor_canvas.getContext('2d'),
            ce_save = document.getElementById('ce_save'),
            ce_cancel = document.getElementById('ce_cancel'),
            ce_h = document.getElementById('ce_h'),
            ce_s = document.getElementById('ce_s'),
            ce_b = document.getElementById('ce_b'),
            ce_c = document.getElementById('ce_c'),
            cv_h = document.getElementById('cv_h'),
            cv_s = document.getElementById('cv_s'),
            cv_b = document.getElementById('cv_b'),
            cv_c = document.getElementById('cv_c'),
            a,
            css,
            img,
            crop;

        main.style.display = 'flex';

        ce_h.value = aHsbc.hue;
        ce_s.value = aHsbc.saturation;
        ce_b.value = aHsbc.brightness;
        ce_c.value = aHsbc.contrast;

        clothes_editor_canvas.width = clothes_editor_canvas.clientWidth;
        clothes_editor_canvas.height = clothes_editor_canvas.clientHeight;

        function onChangeHSBC() {
            // update hsbc value
            aHsbc.hue = parseFloat(ce_h.value);
            aHsbc.saturation = parseFloat(ce_s.value);
            aHsbc.brightness = parseFloat(ce_b.value);
            aHsbc.contrast = parseFloat(ce_c.value);
            if (img) {
                cv_h.textContent = aHsbc.hue.toFixed(3);
                cv_s.textContent = aHsbc.saturation.toFixed(3);
                cv_b.textContent = aHsbc.brightness.toFixed(3);
                cv_c.textContent = aHsbc.contrast.toFixed(3);
                css = self.cssFilter(aHsbc);
                clothes_editor_canvas.style.filter = css;
            }
            if (aCallback) {
                aCallback(aHsbc);
            }
        }
        editorResizeCallback = onChangeHSBC;
        ce_h.oninput = onChangeHSBC;
        ce_s.oninput = onChangeHSBC;
        ce_b.oninput = onChangeHSBC;
        ce_c.oninput = onChangeHSBC;

        // preload image
        SC.images([aImage], function (aImages) {
            img = aImages[aImage];
            // detect crop area of image
            crop = SC.crop(img);
            // resize to preserve aspect ratio
            a = aspect(clothes_editor_canvas.clientWidth, clothes_editor_canvas.clientHeight, crop.w, crop.h);
            // draw it
            context.drawImage(img, crop.x, crop.y, crop.w, crop.h, a.x, a.y, a.w, a.h);
            onChangeHSBC();
        });

        ce_save.onclick = function () {
            console.log('save', aHsbc);
            main.style.display = 'none';
        };
        ce_cancel.onclick = function () {
            main.style.display = 'none';
        };
    };

    self.same = function (aPiece1, aPiece2) {
        // Return true if it is the same clothes
        return (aPiece1.image === aPiece2.image)
            && (aPiece1.hue === aPiece2.hue)
            && (aPiece1.saturation === aPiece2.saturation)
            && (aPiece1.brightness === aPiece2.brightness)
            && (aPiece1.contrast === aPiece2.contrast);
    };

    return self;
}());
