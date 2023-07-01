const {restartGame, initCard, initCardList, compareCards} = require("../src/js/script");

// it("sumNum", () => {
//     expect(sum(5,4)).toBe(9)
// })

let restartButton;
let cardNode;
let cardListNode;
let cardFirst;
let cardSecond;
describe('Test button restart game', () => {
    beforeEach(() => {
         restartButton = restartGame()
    })

    it("Button contains class button", () => {      
        expect(restartButton.classList).toContain("button")
    });
    it("Button contains class button--clear", () => {
        expect(restartButton.classList).toContain("button--clear")
    });
    it("Button contains class which we sent", () => {
        const restartButtonNew = restartGame("test")
        expect(restartButtonNew.classList).toContain("test")
    });
    it("Button not contains unfamiliar classes", () => {
        expect(restartButton.classList.length).toBe(2)
    });
    it("Button has type button", () => {
        expect(restartButton.type).toBe("button")
    });
    it("Button contains text Начать заново", () => {
        expect(restartButton.innerHTML).toBe("Начать заново")
    });
})

describe('Test cardNode', () => {
    beforeEach(() => {
      const cardData = {
            id: 1,
            img: ""
        }
         cardNode = initCard(cardData)
    })
    it("CardNode contains class card", () => {
        expect(cardNode.classList).toContain("card")
    })
    it("CardNode contains data-pair", () => {
        expect(cardNode.getAttribute("data-pair")).toBe("1")
    })
})

describe('Test cardList', () => {
    beforeEach(() => {
        cardListNode  = initCardList({
            pair: 6
        })
    })
    it("CartList contains class card-list", () => {
        expect(cardListNode.classList).toContain("card-list")
    });
    it("CartList children length", () => {
        expect(cardListNode.children.length).toBe(12)
    });
})
describe('Test compare cards', () => {
    beforeEach(() => {
        cardFirst  = document.createElement("div")
        cardFirst.dataset.pair = 1
        cardSecond  = document.createElement("div")
        cardSecond.dataset.pair = 1
    })
    it("Compare similar cards", () => {
        const isSimilar = compareCards(cardFirst, cardSecond, true)
        expect(isSimilar).toBeTruthy()
    });
})
describe('Test compare different cards', () => {
    beforeEach(() => {
        cardFirst  = document.createElement("div")
        cardFirst.dataset.pair = 1
        cardSecond  = document.createElement("div")
        cardSecond.dataset.pair = 2
    })
    it("Compare different cards", () => {
        const isSimilar = compareCards(cardFirst, cardSecond, true)
        expect(isSimilar).toBeFalsy()
    });
})