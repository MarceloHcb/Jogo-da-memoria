const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"
const emoji = document.getElementById("emoji");
const emoji2 = document.getElementById("emoji2");

startGame()
function startGame() {    
    // game.createCardsFromTechs()  
    initializeCards(game.createCardsFromTechs())
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        createCardContent(card, cardElement)
        cardElement.dataset.icon = card.icon
        gameBoard.appendChild(cardElement)
        cardElement.addEventListener("click", flipCard)
    })
}
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)
    if (face === FRONT) {

        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "Js"
        cardElementFace.style.color = "lightyellow"
        
    }
    element.appendChild(cardElementFace);
}

function flipCard() {
    
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){
       if(game.checkMatch()){
           game.clearCards();
          if(game.checkGameOver()){
            let gameOverLayer = document.getElementById("gameOver")
            gameOverLayer.style.display = "flex"
          }
       }else{
           setTimeout(()=>{
           let firrstCardView = document.getElementById(game.firstCard.id);
           let secondCardView = document.getElementById(game.secondCard.id)
           firrstCardView.classList.remove("flip");
           secondCardView.classList.remove("flip");
           game.unflipCards();
       }, 1000);
    }
    }
}
}

function restart(){
    game.clearCards();
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none"
}

function emojicon() {
    const h1 = document.getElementById("h1")
    if (emoji2.style.display=="block") {

        emoji.style.display = "block";
        emoji2.style.display = "none";
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme","dark");
        h1.style.color = "white";     

    }
    else {
        
        emoji.style.display = "none";
        emoji2.style.display = "block"
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme","light");
        h1.style.color = "#05c3ff";   

    }
}
window.onload = checkTheme();
function checkTheme(){
    let localStorageTheme = localStorage.getItem("theme");
    if(localStorageTheme != null && localStorageTheme === "dark"){

        document.body.className = localStorageTheme;
        emoji.style.display = "block";
        emoji2.style.display = "none";

    }
    else{

        document.body.className = localStorageTheme;
        emoji2.style.display = "block";
        emoji.style.display = "none";

    }
}