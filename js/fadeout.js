// Transition screen for non-implemented features (e.g. eating in restaurant)
// linter: lint-js2
/*global document, window, requestAnimationFrame */

var SC = window.SC || {};

SC.fadeout = function (aTitle, aMessage, aCallback) {
    // Transition screen for non-implemented features
    "use strict";
    var div;
    var html = `
    <div id="fadeout" class="hide">
        <button class="close fixed">X</button>
        <h1></h1>
        <p></p>
        <label>Continue...</label>
    </div>`;

    div = document.createElement("div");
    div.innerHTML = html;
    div.getElementsByTagName("h1")[0].textContent = aTitle;
    div.getElementsByTagName("p")[0].textContent = aMessage;
    document.body.appendChild(div);

    function hide () {
        // hide this dialog
        div.firstElementChild.className = "fadeout hide";
        setTimeout(function () {
            if (div.parentElement) {
                div.parentElement.removeChild(div);
            }
            if (aCallback) {
                aCallback();
            }
        }, 500);
    };

    div.firstElementChild.style.display = "flex";
    div.firstElementChild.onclick = hide;
    setTimeout(function () {
        div.firstElementChild.className = "fadeout show";
    }, 1000);
};

