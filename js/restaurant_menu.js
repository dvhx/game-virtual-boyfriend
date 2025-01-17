// Restaurant menu
// linter: lint-js2
/*global document, window */

var SC = window.SC || {};

SC.restaurantMenuHide = function () {
    // hide restaurant menu
    "use strict";
    var e = document.getElementById("restaurant_menu");
    if (e.parentElement) {
        e.parentElement.removeChild(e);
    }
};

SC.restaurantMenu = function () {
    // Restaurant menu
    "use strict";
    var html = `
    <div id="restaurant_menu">
        <div class="border">
            <img class="corner" style="float: left;" src="image/location/restaurant_menu_edge.png" >
            <img class="corner" style="float: right; transform: rotate(90deg);" src="image/location/restaurant_menu_edge.png" >

            <button class="close">X</button>
            <h1>Little Paris</h1>
            <h2>Today's menu</h2>

            <h3>Salads</h3>
            <ul>
                <li>
                    <div class="price">💎7.95</div>
                    <div class="name">Caesar salad</div>
                    <div class="ingredients">Lettuce, garlic, baguette, parmesan, eggs</div>
                </li>
                <li>
                    <div class="price">💎5.95</div>
                    <div class="name">Lentil salad</div>
                    <div class="ingredients">Brown lentils, bay leaf, thyme, carrots, celery, pepper, onion, parsley</div>
                </li>
                <li>
                    <div class="price">💎6.95</div>
                    <div class="name">Tuna salad</div>
                    <div class="ingredients">Tuna, mayonnaise, celery, onion, mustard, parsley</div>
                </li>
            </ul>

            <h3>Soups</h3>

            <ul>
                <li>
                    <div class="price">💎1.95</div>
                    <div class="name">Bouillabaisse</div>
                    <div class="ingredients">Mixed herbs, fish, vegetables</div>
                </li>
                <li>
                    <div class="price">💎2.95</div>
                    <div class="name">Garbure</div>
                    <div class="ingredients">Ham, cabbage, vegetables, cheese, bread</div>
                </li>
                <li>
                    <div class="price">💎3.95</div>
                    <div class="name">Ratatouille</div>
                    <div class="ingredients">Vegetables, olive oil, aubergine, courgette, bell pepper, tomato, onion, garlic</div>
                </li>
            </ul>

            <h3>Main courses</h3>

            <ul>
                <li>
                    <div class="price">💎12.95</div>
                    <div class="name">Coq au Vin</div>
                    <div class="ingredients">Chicken, red wine, mushrooms, thyme, bacon, garlic, shallots, butter, vinegar, parsley, pepper</div>
                </li>
                <li>
                    <div class="price">💎11.95</div>
                    <div class="name">Moules Marinières</div>
                    <div class="ingredients">Mussels, vermouth, shallots, parsley, bay, thyme, pepper, butter</div>
                </li>
                <li>
                    <div class="price">💎10.95</div>
                    <div class="name">Sole Meunière</div>
                    <div class="ingredients">Sole fillet, flour, pepper, butter, lemon juice, parsley</div>
                </li>
            </ul>

            <h3>Deserts</h3>
            <ul>
                <li>
                    <div class="price">💎3.95</div>
                    <div class="name">Buckwheat Crêpes</div>
                    <div class="ingredients">Buckwheat flour, eggs, olive oil, milk</div>
                </li>
                <li>
                    <div class="price">💎2.95</div>
                    <div class="name">Far Breton</div>
                    <div class="ingredients">Eggs, prunes, flour, vanilla, rum, sugar, butter, milk cream</div>
                </li>
                <li>
                    <div class="price">💎1.95</div>
                    <div class="name">Gateau Basque</div>
                    <div class="ingredients">Flour, baking powder, butter, sugar, egg, vanilla, cherry jam</div>
                </li>
            </ul>

            <h3>Soft drinks</h3>
            <ul>
                <li>
                    <div class="price">💎0.95</div>
                    <div class="name">Cola</div>
                </li>
                <li>
                    <div class="price">💎0.85</div>
                    <div class="name">Tonic water</div>
                </li>
                <li>
                    <div class="price">💎0.75</div>
                    <div class="name">Orange juice</div>
                </li>
            </ul>

            <h3>Wine</h3>
            <ul>
                <li>
                    <div class="price">💎7.95</div>
                    <div class="name">Chardonnay</div>
                    <div class="ingredients">Ingredient1, Ingredient2, Ingredient3</div>
                </li>
                <li>
                    <div class="price">💎5.95</div>
                    <div class="name">Cabernet Sauvignon</div>
                    <div class="ingredients">Ingredient1, Ingredient2, Ingredient3</div>
                </li>
                <li>
                    <div class="price">💎6.95</div>
                    <div class="name">Pinot noir</div>
                    <div class="ingredients">Ingredient1, Ingredient2, Ingredient3</div>
                </li>
            </ul>

            <div>
            <img class="corner" style="float: left; transform: rotate(270deg);" src="image/location/restaurant_menu_edge.png" >
            <img class="corner" style="float: right; transform: rotate(180deg);"src="image/location/restaurant_menu_edge.png" >
            </div>

            <div style="clear: both;"></div>

        </div>

    </div>`;    // '

    var div = document.createElement("div");
    var i;
    var li;
    document.body.appendChild(div);
    div.innerHTML = html;
    div.onclick = SC.restaurantMenuHide;

    function buy(event) {
        // buy food
        var p = event.target;
        var price;
        var name;
        var sum;
        while (p.nodeName !== "LI") {
            p = p.parentElement;
            if (!p) {
                return;
            }
        }
        price = parseFloat(p.getElementsByClassName("price")[0].textContent.replace("💎", ""));
        sum = 2 * Math.ceil(price);
        name = p.getElementsByClassName("name")[0].textContent;
        console.log("buy", name, price);
        if (SC.boy.spend(sum)) {
            SC.lip("You bought 2x " + name + " for 💎" + sum.toFixed(2) + ", it will be here in a minute.", console.log, 30);
            setTimeout(function () {
                if (SC.sceneNow === "restaurant") {
                    SC.fadeout("Food arrived", "You both ate ordered food and it was delicious");
                }
            }, 60000);
        } else {
            SC.lip("You need 💎" + sum.toFixed(2) + " to buy 2x " + name, console.log, 10);
        }
    }

    li = div.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        li[i].onclick = buy;
    }
};
