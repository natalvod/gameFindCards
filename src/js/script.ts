import { log } from 'console';
import '../style/style.scss';
// import Img from "../static/img/6-clubs.svg";
type ResultState = "success" | "fail"
type ResultData = {
    class: string,
    title: string,
    text: string,
    state: ResultState
}

// export const sum = (a: number, b: number) => {
//     return a + b
// }

type cardType = {
    id: number,
    img: string 
}

type appType = {
    levels: Record<number, number>,
    steps: {
        start: () => void,
        play: () => void,
        result: (state: ResultData)  => void
    },
    cards: cardType[],
    state: {
        level?: 0|1|2,
        timer: string,
        pair: number,
        found: number,
    }
}

const board = document.querySelector("#app") as Element;
let cardContainer: HTMLDivElement;
let prevCard: HTMLElement | null;
let waiting = false;
let timerInterval: NodeJS.Timer;
const removeActiveAttrElements = (listElements: HTMLCollection | undefined) => {
    if(!listElements) {
        return
    }
    console.dir(Object.keys(listElements));
    Object.keys(listElements).forEach((index: string) => listElements[Number(index)].removeAttribute("active"))
}
const selectLevel = (elem : HTMLElement | null) => {
    if(elem) {
        app.state.level = Number(elem.innerHTML) as 0 | 1 | 2 | undefined;
        app.state.pair = app.levels[app.state.level || 0]
    //console.log(elem.innerHTML);
    removeActiveAttrElements(elem.parentNode?.children)
    // console.log(typeof Number(elem.innerHTML));
    elem.setAttribute("active", "")
    }   
}
const listenClickOnLevels = () => {
    const levelElements = document.querySelectorAll(".content__link");
    levelElements.forEach(elem => {
        elem.addEventListener("click", (event) => {
            selectLevel(event.target as HTMLElement | null);
            console.dir(event.target);
        })
    })
}

const listenClickOnButton = () => {
    const startButton = document.querySelector(".button--start");
    startButton?.addEventListener("click", () => {
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
    let stringMin = ""
    let stringSec = ""
    const timerNode = document.createElement("div")
    timerNode.classList.add("timer")
    // timerNode.id = "timer"
    // let timerContainer = document.getElementById("timer")
    // const time = 
    timerInterval = setInterval(timer, 1000)
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
            stringMin = `0${+min}`
          } else {
            stringMin = String(min)
          }
          if(Number(sec) < 10) {
            stringSec= `0${+sec}`
          } else {
            stringSec = String(sec)
          }
          
          app.state.timer = `${stringMin}.${stringSec}`
          timerNode.innerHTML = `
          
          <div class="timer__item">
            <div class="timer__title">min</div>
            <div>${stringMin}</div>
          </div>
          <span>.</span>
          <div class="timer__item">
            <div class="timer__title">sec</div>
            <div>${stringSec}</div>
          </div>`
      }
return timerNode
}
export const restartGame = (editionClass = "") => {
    const buttonNode = document.createElement("button")
    buttonNode.innerHTML = "Начать заново"
    buttonNode.type = "button"
    buttonNode.classList.add("button", "button--clear")
    if(editionClass) {
        buttonNode.classList.add(editionClass)
    }
    buttonNode.onclick = () => {
        // то же самое, что play(), но с задержкой
        // clearBoard()
        play()
        // setTimeout(initGameBoard, 1000)
    }
    return buttonNode
}
export const initCard = (cardData: cardType) => {
    const cardNode = document.createElement("div")
    cardNode.classList.add("card")
    cardNode.dataset.pair = String(cardData.id)
    if(cardData.img) {
        cardNode.innerHTML = `<img src="${require('../static/img/'+ cardData.img + '.svg')}" width=50 hight=100 class="card__img">`
    }
    return cardNode
}

const sortCards = (array: cardType[]) => {
    return array.sort(() => Math.random() - 0.5);
}

export const initCardList = (test?: {pair: number}) => {
     if(test) {
        app.state.pair = test.pair
    }
    cardContainer = document.createElement("div")
    const cardListArray: cardType[] = []
    cardContainer.classList.add("card-list")
    for(let pair = 0; pair < app.state.pair; pair++) {
        cardListArray.push(app.cards[pair])
        cardListArray.push(app.cards[pair])
    }
    // console.log(app.state.pair);
    // console.dir(cardListArray);
    //вызываем функцию сортировки карточек
    sortCards(cardListArray).forEach((cardData: cardType) => {
        if(test) {
            cardData.img = ""
        }
        cardContainer.appendChild(initCard(cardData))
    })
    console.log(cardContainer);
    return cardContainer
}
const initGameBoard = () => {
    const boardWrapNode = document.createElement("div")
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

export const compareCards = (card: HTMLElement, cardSecond: HTMLElement, test = false) => {
    if(card === cardSecond) {
        console.log("The same card");
        return false
    }
    console.log("card", card.dataset)
    console.log("cardSecond", cardSecond.dataset)
    if(card.dataset.pair === cardSecond.dataset.pair) {
      card.classList.add("remove")
      cardSecond.classList.add("remove")
      card.removeAttribute("data-pair")
      app.state.found++
      return true
      
    } else {
        if(!test) {
            resultFail()
        }
        return false
    }
}

const resultFail = () => {
    const data: ResultData = {
        class: "popup--dead",
        title: "Вы проиграли!",
        text: "Затраченное время:",
        state: "fail"
    }
    result(data)
}

const resultSuccess = () => {
    const data: ResultData = {
        class: "popup--celeb",
        title: "Вы выиграли!",
        text: "Затраченное время:",
        state: "success"
    }
    result(data)
}

const openCard = (card: HTMLElement) => {
    card.classList.add("open")
    if(prevCard) {
        waiting = true
        //compare
        const isSimilar = compareCards(card, prevCard)
        if(isSimilar) {
            // setTimeout(()=> {
                prevCard?.classList.remove("open")
                card.classList.remove("open")
                prevCard = null
                waiting = false
                if(app.state.found === app.levels[app.state.level || 0]) {
                    resultSuccess()
                    // app.steps.result.call("success")
                  }
            // }, 0)
        } else {
            waiting = false
        }      
    } else {
        prevCard = card
    }
}

const cardContainerListener = () => {
    cardContainer.addEventListener('click', (event) => {
      console.log("card container listener", event.target);
      console.log("waiting", waiting)
      const target = event.target as HTMLElement
      if(target.hasAttribute("data-pair") && waiting === false) {
        openCard(target)
      }
    })
}

const clearState = () => {
    app.state.found = 0
    app.state.timer = ""
    prevCard = null
    // state: {
    //     level: undefined,
    //     timer: "",
    //     pair: -1, //id my choosen cart
    //     found: 0,
    // }
}

const play= () => {
    clearBoard();
    clearState()
    const initPlayPromise = new Promise((resolve, reject)=> {
        try {
            console.log("before initGameBoard");
            initGameBoard();
            resolve(true)
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
          cardContainerListener()
        },5000)   
    })
    console.log("level",app.state.level);
}
const result = (state: ResultData) => {
    console.log("gameResult");
    const popupNode = document.createElement("div")
    popupNode.classList.add("popup", state.class)
    const windowPopupNode = document.createElement("div")
    windowPopupNode.classList.add("popup__window")
    const titleNode = document.createElement("h3")
    titleNode.innerHTML = state.title
    titleNode.classList.add("popup__title", "popup__title--celeb")
    const textNode = document.createElement("p")
    textNode.innerHTML = state.text
    textNode.classList.add("popup__text")
    const timerNode = document.createElement("p")
    timerNode.classList.add("popup__timer")
    timerNode.innerHTML = app.state.timer
    windowPopupNode.append(titleNode,textNode,timerNode,restartGame("popup__button"))
    popupNode.appendChild(windowPopupNode)
    board.appendChild(popupNode)
    clearInterval(timerInterval)
}

const app: appType = {
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
        pair: -1, //id my choosen cart
        found: 0,
    }
}
app.steps.start();
