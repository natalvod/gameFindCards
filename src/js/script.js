import '../style/style.scss';
// import Img from "../static/img/6-clubs.svg";

const board = document.querySelector("#app");
let cardContainer;
let prevCard;
let waiting = false;
const removeActiveAttrElements = (listElements) => {
    console.dir(Object.keys(listElements));
    Object.keys(listElements).forEach(index => listElements[index].removeAttribute("active"))
}
const selectLevel = (elem) => {
    app.state.level = Number(elem.innerHTML);
    app.state.pair = app.levels[app.state.level]
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

const initTimer = () => {
    let min = 0;
    let sec = 0;
    let timerNode = document.createElement("div")
    timerNode.classList.add("timer")
    // timerNode.id = "timer"
    // let timerContainer = document.getElementById("timer")
    // const time = 
    setInterval(timer, 1000)
    function timer() {
          sec = Number(sec) + 1;
          if (sec === 60) {
            sec = 0;
            min = Number(min) + 1;
            
            if (min === 60) {
              min = 0;
            }
          }
          if(Number(min) < 10) {
            min = `0${+min}`
          }
          if(Number(sec) < 10) {
            sec= `0${+sec}`
          }
          timerNode.innerHTML = `
          
          <div class="timer__item">
            <div class="timer__title">min</div>
            <div>${String(min)}</div>
          </div>
          <span>.</span>
          <div class="timer__item">
            <div class="timer__title">sec</div>
            <div>${String(sec)}</div>
          </div>`
      }
return timerNode
}
const restartGame = () => {
    let buttonNode = document.createElement("button")
    buttonNode.innerHTML = "Начать заново"
    buttonNode.type = "button"
    buttonNode.classList.add("button", "button--clear")
    buttonNode.onclick = () => {
        // то же самое, что play(), но с задержкой
        // clearBoard()
        play()
        // setTimeout(initGameBoard, 1000)
    }
    return buttonNode
}
const initCard = (cardData) => {
    let cardNode = document.createElement("div")
    cardNode.classList.add("card")
    cardNode.dataset.pair = cardData.id
    cardNode.innerHTML = `<img src="${require('../static/img/'+ cardData.img + '.svg')}" width=50 hight=100 class="card__img">`
    return cardNode
}

const sortCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const initCardList = () => {
    cardContainer = document.createElement("div")
    const cardListArray = []
    cardContainer.classList.add("card-list")
    for(let pair = 0; pair < app.state.pair; pair++) {
        cardListArray.push(app.cards[pair])
        cardListArray.push(app.cards[pair])
    }
    console.log(app.state.pair);
    console.dir(cardListArray);
    //вызываем функцию сортировки карточек
    sortCards(cardListArray).forEach(cardData => {
        cardContainer.appendChild(initCard(cardData))
    })
    return cardContainer
}
const initGameBoard = () => {
    let boardWrapNode = document.createElement("div")
    boardWrapNode.classList.add("board-wrap")
    boardWrapNode.appendChild(initTimer())
    boardWrapNode.appendChild(restartGame())
    boardWrapNode.appendChild(initCardList())
    board.appendChild(boardWrapNode)
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
}

const compareCards = (card, cardSecond) => {
    if(card === cardSecond) {
        return
    }
    if(card.dataset.pair === cardSecond.dataset.pair) {
      card.classList.add("remove")
      cardSecond.classList.add("remove")
      card.removeAttribute("data-pair")
      app.state.found++
      
    } 
}

const openCard = (card) => {
    card.classList.add("open")
    if(prevCard) {
        waiting = true
        //compare
        compareCards(card, prevCard)
        setTimeout(()=> {
            prevCard.classList.remove("open")
            card.classList.remove("open")
            prevCard = undefined
            waiting = false
            if(app.state.found === app.levels[app.state.level]) {
                alert("Поздравляем! Вы победили!")
              }
        }, 1000)
    } else {
        prevCard = card
    }
}

const cardContainerListener = () => {
    cardContainer.addEventListener('click', (event) => {
      console.log(event.target);
      if(event.target.hasAttribute("data-pair") && waiting === false) {
        openCard(event.target)
      }
    })
}
const play= () => {
    clearBoard();
    const initPlayPromise = new Promise((resolve, reject)=> {
        try {
            console.log("before initGameBoard");
            initGameBoard();
            resolve()
        } catch(error) {
            reject(error)
        }
        
    } )
    initPlayPromise.then(() => {
        console.log("initGameBoard");
        cardContainer.classList.add("open")
        waiting = true
        setTimeout(()=> {
          cardContainer.classList.remove('open')
          waiting = false
        },5000)
        cardContainerListener()
    })
    console.log("level",app.state.level);
}
const result=() => {
    console.log("gameResult");
}

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
        }
    ],
    state: {
        level: undefined,
        timer: 0,
        pair: -1, //id my choosen cart
        found: 0,
    }
}
app.steps.start();
