/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 15:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 281:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.lr = exports.N8 = exports.zd = exports.BM = void 0;
__webpack_require__(15);
const board = document.querySelector("#app");
let cardContainer;
let prevCard;
let waiting = false;
let timerInterval;
const removeActiveAttrElements = (listElements) => {
    if (!listElements) {
        return;
    }
    console.dir(Object.keys(listElements));
    Object.keys(listElements).forEach((index) => listElements[Number(index)].removeAttribute("active"));
};
const selectLevel = (elem) => {
    var _a;
    if (elem) {
        app.state.level = Number(elem.innerHTML);
        app.state.pair = app.levels[app.state.level || 0];
        //console.log(elem.innerHTML);
        removeActiveAttrElements((_a = elem.parentNode) === null || _a === void 0 ? void 0 : _a.children);
        // console.log(typeof Number(elem.innerHTML));
        elem.setAttribute("active", "");
    }
};
const listenClickOnLevels = () => {
    const levelElements = document.querySelectorAll(".content__link");
    levelElements.forEach(elem => {
        elem.addEventListener("click", (event) => {
            selectLevel(event.target);
            console.dir(event.target);
        });
    });
};
const listenClickOnButton = () => {
    const startButton = document.querySelector(".button--start");
    startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener("click", () => {
        if (app.state.level) {
            app.steps.play();
        }
    });
};
const initListeners = () => {
    listenClickOnLevels();
    listenClickOnButton();
};
const init = () => {
    console.log("init.app");
    initListeners();
};
const clearBoard = () => {
    console.log(board);
    board.innerHTML = "";
};
const initTimer = () => {
    let min = 0;
    let sec = 0;
    let stringMin = "";
    let stringSec = "";
    const timerNode = document.createElement("div");
    timerNode.classList.add("timer");
    // timerNode.id = "timer"
    // let timerContainer = document.getElementById("timer")
    // const time = 
    timerInterval = setInterval(timer, 1000);
    function timer() {
        sec = Number(sec) + 1;
        if (sec === 60) {
            sec = 0;
            min = Number(min) + 1;
            if (min === 60) {
                min = 0;
            }
        }
        if (Number(min) < 10) {
            stringMin = `0${+min}`;
        }
        else {
            stringMin = String(min);
        }
        if (Number(sec) < 10) {
            stringSec = `0${+sec}`;
        }
        else {
            stringSec = String(sec);
        }
        app.state.timer = `${stringMin}.${stringSec}`;
        timerNode.innerHTML = `
          
          <div class="timer__item">
            <div class="timer__title">min</div>
            <div>${stringMin}</div>
          </div>
          <span>.</span>
          <div class="timer__item">
            <div class="timer__title">sec</div>
            <div>${stringSec}</div>
          </div>`;
    }
    return timerNode;
};
const restartGame = (editionClass = "") => {
    const buttonNode = document.createElement("button");
    buttonNode.innerHTML = "Начать заново";
    buttonNode.type = "button";
    buttonNode.classList.add("button", "button--clear");
    if (editionClass) {
        buttonNode.classList.add(editionClass);
    }
    buttonNode.onclick = () => {
        // то же самое, что play(), но с задержкой
        // clearBoard()
        play();
        // setTimeout(initGameBoard, 1000)
    };
    return buttonNode;
};
exports.BM = restartGame;
const initCard = (cardData) => {
    const cardNode = document.createElement("div");
    cardNode.classList.add("card");
    cardNode.dataset.pair = String(cardData.id);
    if (cardData.img) {
        cardNode.innerHTML = `<img src="${__webpack_require__(465)("./" + cardData.img + ".svg")}" width=50 hight=100 class="card__img">`;
    }
    return cardNode;
};
exports.zd = initCard;
const sortCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
const initCardList = (test) => {
    if (test) {
        app.state.pair = test.pair;
    }
    cardContainer = document.createElement("div");
    const cardListArray = [];
    cardContainer.classList.add("card-list");
    for (let pair = 0; pair < app.state.pair; pair++) {
        cardListArray.push(app.cards[pair]);
        cardListArray.push(app.cards[pair]);
    }
    // console.log(app.state.pair);
    // console.dir(cardListArray);
    //вызываем функцию сортировки карточек
    sortCards(cardListArray).forEach((cardData) => {
        if (test) {
            cardData.img = "";
        }
        cardContainer.appendChild((0, exports.zd)(cardData));
    });
    console.log(cardContainer);
    return cardContainer;
};
exports.N8 = initCardList;
const initGameBoard = () => {
    const boardWrapNode = document.createElement("div");
    boardWrapNode.classList.add("board-wrap");
    boardWrapNode.appendChild(initTimer());
    boardWrapNode.appendChild((0, exports.BM)());
    boardWrapNode.appendChild((0, exports.N8)());
    board.appendChild(boardWrapNode);
    // board.innerHTML = 
    // `<div id="timer"> 
    //    ${initTimer()}
    //  </div>
    //  <div> 
    //    ${restartGame()}
    //  </div>
    //  <div> 
    //    ${initCardList()}
    //  </div>
    // <div>
    //    <h1>playing...
    //    </h1>
    // </div>`
};
const compareCards = (card, cardSecond, test = false) => {
    if (card === cardSecond) {
        console.log("The same card");
        return false;
    }
    console.log("card", card.dataset);
    console.log("cardSecond", cardSecond.dataset);
    if (card.dataset.pair === cardSecond.dataset.pair) {
        card.classList.add("remove");
        cardSecond.classList.add("remove");
        card.removeAttribute("data-pair");
        app.state.found++;
        return true;
    }
    else {
        if (!test) {
            resultFail();
        }
        return false;
    }
};
exports.lr = compareCards;
const resultFail = () => {
    const data = {
        class: "popup--dead",
        title: "Вы проиграли!",
        text: "Затраченное время:",
        state: "fail"
    };
    result(data);
};
const resultSuccess = () => {
    const data = {
        class: "popup--celeb",
        title: "Вы выиграли!",
        text: "Затраченное время:",
        state: "success"
    };
    result(data);
};
const openCard = (card) => {
    card.classList.add("open");
    if (prevCard) {
        waiting = true;
        //compare
        const isSimilar = (0, exports.lr)(card, prevCard);
        if (isSimilar) {
            // setTimeout(()=> {
            prevCard === null || prevCard === void 0 ? void 0 : prevCard.classList.remove("open");
            card.classList.remove("open");
            prevCard = null;
            waiting = false;
            if (app.state.found === app.levels[app.state.level || 0]) {
                resultSuccess();
                // app.steps.result.call("success")
            }
            // }, 0)
        }
        else {
            waiting = false;
        }
    }
    else {
        prevCard = card;
    }
};
const cardContainerListener = () => {
    cardContainer.addEventListener('click', (event) => {
        console.log("card container listener", event.target);
        console.log("waiting", waiting);
        const target = event.target;
        if (target.hasAttribute("data-pair") && waiting === false) {
            openCard(target);
        }
    });
};
const clearState = () => {
    app.state.found = 0;
    app.state.timer = "";
    prevCard = null;
    // state: {
    //     level: undefined,
    //     timer: "",
    //     pair: -1, //id my choosen cart
    //     found: 0,
    // }
};
const play = () => {
    clearBoard();
    clearState();
    const initPlayPromise = new Promise((resolve, reject) => {
        try {
            console.log("before initGameBoard");
            initGameBoard();
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    });
    initPlayPromise.then(() => {
        console.log("initGameBoard");
        cardContainer.classList.add("open");
        waiting = true;
        setTimeout(() => {
            cardContainer.classList.remove('open');
            waiting = false;
            cardContainerListener();
        }, 5000);
    });
    console.log("level", app.state.level);
};
const result = (state) => {
    console.log("gameResult");
    const popupNode = document.createElement("div");
    popupNode.classList.add("popup", state.class);
    const windowPopupNode = document.createElement("div");
    windowPopupNode.classList.add("popup__window");
    const titleNode = document.createElement("h3");
    titleNode.innerHTML = state.title;
    titleNode.classList.add("popup__title", "popup__title--celeb");
    const textNode = document.createElement("p");
    textNode.innerHTML = state.text;
    textNode.classList.add("popup__text");
    const timerNode = document.createElement("p");
    timerNode.classList.add("popup__timer");
    timerNode.innerHTML = app.state.timer;
    windowPopupNode.append(titleNode, textNode, timerNode, (0, exports.BM)("popup__button"));
    popupNode.appendChild(windowPopupNode);
    board.appendChild(popupNode);
    clearInterval(timerInterval);
};
const app = {
    levels: {
        1: 3,
        2: 6,
        3: 9
    },
    steps: {
        start: init,
        play: play,
        result: result,
    },
    cards: [
        {
            id: 1,
            img: '6-clubs'
        },
        {
            id: 2,
            img: '6-diamonds'
        },
        {
            id: 3,
            img: '7-clubs'
        },
        {
            id: 4,
            img: '7-diamonds'
        },
        {
            id: 5,
            img: '8-clubs'
        },
        {
            id: 6,
            img: '8-diamonds'
        },
        {
            id: 7,
            img: '9-clubs'
        },
        {
            id: 8,
            img: '9-diamonds'
        },
        {
            id: 9,
            img: '10-clubs'
        },
        {
            id: 10,
            img: '10-diamonds'
        },
        {
            id: 11,
            img: 'a-clubs'
        },
        {
            id: 12,
            img: 'j-clubs'
        },
        {
            id: 13,
            img: 'k-clubs'
        },
        {
            id: 14,
            img: 'q-clubs'
        }
    ],
    state: {
        level: undefined,
        timer: "",
        pair: -1,
        found: 0,
    }
};
app.steps.start();


/***/ }),

/***/ 465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./10-clubs.svg": 815,
	"./10-diamonds.svg": 609,
	"./10-hearts.svg": 21,
	"./10-spades.svg": 269,
	"./6-clubs.svg": 124,
	"./6-diamonds.svg": 708,
	"./6-hearts.svg": 913,
	"./6-spades.svg": 450,
	"./7-clubs.svg": 782,
	"./7-diamonds.svg": 763,
	"./7-hearts.svg": 85,
	"./7-spades.svg": 928,
	"./8-clubs.svg": 875,
	"./8-diamonds.svg": 979,
	"./8-hearts.svg": 426,
	"./8-spades.svg": 35,
	"./9-clubs.svg": 668,
	"./9-diamonds.svg": 612,
	"./9-hearts.svg": 688,
	"./9-spades.svg": 552,
	"./a-clubs.svg": 348,
	"./a-diamonds.svg": 307,
	"./a-hearts.svg": 854,
	"./a-spades.svg": 192,
	"./card-side.svg": 852,
	"./j-clubs.svg": 962,
	"./j-diamonds.svg": 877,
	"./j-hearts.svg": 222,
	"./j-spades.svg": 336,
	"./k-clubs.svg": 576,
	"./k-diamonds.svg": 477,
	"./k-hearts.svg": 789,
	"./k-spades.svg": 845,
	"./q-clubs.svg": 71,
	"./q-diamonds.svg": 467,
	"./q-hearts.svg": 908,
	"./q-spades.svg": 985
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 465;

/***/ }),

/***/ 815:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/10-clubs.db9a9003a463edc3664d.svg";

/***/ }),

/***/ 609:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/10-diamonds.f372db68759a5bc53fcd.svg";

/***/ }),

/***/ 21:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/10-hearts.cea9e14219bf6ccf6960.svg";

/***/ }),

/***/ 269:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/10-spades.6b9be1b22ac91dfc1e55.svg";

/***/ }),

/***/ 124:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/6-clubs.91bd5f547179c7de2669.svg";

/***/ }),

/***/ 708:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/6-diamonds.2b91800b45f20f1cf7af.svg";

/***/ }),

/***/ 913:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/6-hearts.6debe4527f085f20b0c1.svg";

/***/ }),

/***/ 450:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/6-spades.a6ef18854801d7ebcf7d.svg";

/***/ }),

/***/ 782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/7-clubs.2943d4adbf4a1c50afcd.svg";

/***/ }),

/***/ 763:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/7-diamonds.a7b08e6e8990b066fbfb.svg";

/***/ }),

/***/ 85:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/7-hearts.67c4537d6589292aab74.svg";

/***/ }),

/***/ 928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/7-spades.78f177de5fd0e1a68f3c.svg";

/***/ }),

/***/ 875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/8-clubs.8da90d965a709f3777ac.svg";

/***/ }),

/***/ 979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/8-diamonds.578d931847d3b63a8a65.svg";

/***/ }),

/***/ 426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/8-hearts.17816067e43b5de879f3.svg";

/***/ }),

/***/ 35:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/8-spades.0b8b23296f49b174ae98.svg";

/***/ }),

/***/ 668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/9-clubs.90d1f309ef9fe5b005cf.svg";

/***/ }),

/***/ 612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/9-diamonds.ae720ef5164c78654220.svg";

/***/ }),

/***/ 688:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/9-hearts.77c8f5a1e7cea206024b.svg";

/***/ }),

/***/ 552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/9-spades.7071936cb30bb43497c3.svg";

/***/ }),

/***/ 348:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/a-clubs.fa4f1aac98bc281e7492.svg";

/***/ }),

/***/ 307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/a-diamonds.f0597c64dd9e60cd4e82.svg";

/***/ }),

/***/ 854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/a-hearts.e6771c4394f2df0029fe.svg";

/***/ }),

/***/ 192:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/a-spades.bea969036af1dc36eb16.svg";

/***/ }),

/***/ 852:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/card-side.2d0ff97035eb0c84168d.svg";

/***/ }),

/***/ 962:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/j-clubs.6df3d8cfd17a1f6d4f15.svg";

/***/ }),

/***/ 877:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/j-diamonds.a4a6898820fd5c6e1627.svg";

/***/ }),

/***/ 222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/j-hearts.6606595a7d4682c17694.svg";

/***/ }),

/***/ 336:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/j-spades.190f09c301dfd3f44c1a.svg";

/***/ }),

/***/ 576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/k-clubs.08171035d29dd8007577.svg";

/***/ }),

/***/ 477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/k-diamonds.67fdc80cfb8fecca0693.svg";

/***/ }),

/***/ 789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/k-hearts.fcbf80d80d40b68aad04.svg";

/***/ }),

/***/ 845:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/k-spades.b9b501599f8ffcf32ebb.svg";

/***/ }),

/***/ 71:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/q-clubs.d6e2b5c5f8cb1502a698.svg";

/***/ }),

/***/ 467:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/q-diamonds.53fd5ad7884608f6c0c6.svg";

/***/ }),

/***/ 908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/q-hearts.fe7d0f97fb7e85f760f5.svg";

/***/ }),

/***/ 985:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "static/icons/q-spades.f506ce58650d26521378.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(281);
/******/ 	
/******/ })()
;