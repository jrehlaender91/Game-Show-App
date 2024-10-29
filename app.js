const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const startButton = document.querySelector(".btn__start");
const resetButton = document.querySelector(".btn__reset");
const list = document.querySelector("#phrase ul");
const hearts = document.querySelector("#scoreboard ol");
const keyrows = document.querySelector(".keyrow");
const heading = document.querySelector("h2");
let phraseArray = "";
let overlay = document.querySelector("#overlay");

let missed = 0;
let letterFound = null; 

const phrases = [
    "Arctic Monkeys", 
    "Radiohead",
    "Pulp",
    "Pink Floyd",
    "The Beatles",
    "Blur",
    "David Bowie",
    "Joy Division",
    "Sex Pistols",
    "Queen"
];




// Function that returns a random phrase from an array.
function getRandomPhraseAsArray(arr){
    let randomNumber = Math.floor(Math.random() * 6);
    return arr[randomNumber];
} 


// Function that adds phrase to the display.
function addPhraseToDisplay(arr) {
    for(let i = 0; i < arr.length; i++) {
        const node = document.createElement("li");
        node.textContent = arr[i];
        
        if(arr[i] === " ") {
            node.className = "space";
            list.appendChild(node);
        } else {
            node.className = "letter";
            list.appendChild(node);
        } 
    }
}

// Function checks if letter is in the array and shows it.
const checkLetter = (button) => {
    let item = list.children;
    let letter = "";
    letterFound = null;

    for(let i = 0; i < item.length; i++) {
        letter = item[i].textContent;
        
        if(button.toUpperCase() === letter.toUpperCase()) {
            item[i].className = item[i].className + " show";
            item[i].style.transition = "all 2s";
            letterFound = button;
        } 
    } 
    return letterFound;
};

// Event listener for the keyboard that calls the checkLetter function.
qwerty.addEventListener("click", e => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        let button = e.target.textContent;
        e.target.disabled = true;  
        e.target.className = 'chosen';
    
        checkLetter(button); 
        
        
        if(letterFound === null) {
            let score = document.querySelector("#scoreboard ol");
            let hearts = score.children
            hearts[missed].getElementsByTagName("IMG")[0].src = "images/lostHeart.png";
            missed += 1;
        }
    }
    checkWin();
});


const checkWin = () => {
    let item = list.children;
    let showCount = 0;
    let letterCount = 0;

    for(let i = 0; i < item.length; i++) {       
        if(item[i].className.includes('letter')) {
            letterCount += 1;
        } 

        if (item[i].className.includes('show')) {
            showCount += 1;
        }
    }

    if(letterCount === showCount) {
        overlay.style.display = "flex";
        overlay.className = "win"
        heading.textContent = "You won!"
        startButton.style.display = "none";
        resetButton.style.display = "inline";
    } else if (missed === 5) {
        overlay.style.display = "flex";
        overlay.className = "lose"
        heading.textContent = "Try again!"
        startButton.style.display = "none";
        resetButton.style.display = "inline";
    }
};

// Event listener for the start button.
//      Hides the overlay div.
startButton.addEventListener("click", (e) => {
    overlay.style.display = "none";
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

resetButton.addEventListener("click", (e) => {
    let qwertyRows = qwerty.children;   
    let allItems = list.children;
    missed = 0; 

    for(let i = 0; i < qwertyRows.length; i++) {
        let qwertyButtons = qwertyRows[i].children; 
        for(let i = 0; i < qwertyButtons.length; i++) {
            qwertyButtons[i].className = "";
            qwertyButtons[i].disabled = false;
        }
    }

    for(let i = 0; i < 5; i++) {
        let score = document.querySelector("#scoreboard ol");
        let hearts = score.children;
        hearts[i].getElementsByTagName("IMG")[0].src = "images/liveHeart.png";
    }

    list.innerHTML = '';
    phraseArray = getRandomPhraseAsArray(phrases);
    console.log(phraseArray);
    addPhraseToDisplay(phraseArray);
    overlay.style.display = "none";

});
