const board = document.querySelector("#app");

const removeActiveAttrElements = (listElements) => {
    console.dir(Object.keys(listElements));
    Object.keys(listElements).forEach(index => listElements[index].removeAttribute("active"))
}
const selectLevel = (elem) => {
    app.state.level = Number(elem.innerHTML);
    //console.log(elem.innerHTML);
    removeActiveAttrElements(elem.parentNode.children)
    // console.log(typeof Number(elem.innerHTML));
    elem.setAttribute("active", "")
}
const listenClickOnLevels = () => {
    const levelElements = document.querySelectorAll(".content__link");
    levelElements.forEach(elem => {
        elem.addEventListener("click", (event) => {
            selectLevel(event.target);
            console.dir(event.target);
        })
    })
}

const listenClickOnButton = () => {
    const startButton = document.querySelector(".button--start");
    startButton.addEventListener("click", () => {
        if(app.state.level) {
            app.steps.play();
        }      
    })
}

const initListeners = () => {
    listenClickOnLevels();
    listenClickOnButton();
}
const init = () => {
    console.log("init.app");
    initListeners()
}

const clearBoard = () => { 
    console.log(board);  
    board.innerHTML = "";   
}
const initGameBoard = () => {
    board.innerHTML = 
    `<div>
       <h1>playing...
       </h1>
    </div>`
}
const play= () => {
    clearBoard();
    initGameBoard()
    console.log("playGame");
}
const result=() => {
    console.log("gameResult");
}

const app = {
    levels: {
        1: 6,
        2: 12,
        3: 18
    },
    steps: {
        start: init,
        play: play,
        result: result,
    },
    cards: [
        {
            id: 1,
            img: ""
        },
       {
            id: 2,
            img: ""
        }
    ],
    state: {
        level: undefined,
        timer: 0,
        pair: -1, //id my choosen cart
    }
}

app.steps.start();
