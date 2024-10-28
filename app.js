const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const startButton = document.querySelector(".btn__reset");
const list = document.querySelector("#phrase ul");
const hearts = document.querySelector("#scoreboard ol");


let missed = 0;

const phrases = [
    "You must be the change you wish to see in the world", 
    "It is during our darkest moments that we must focus to see the light",
    "The way to get started is to quit talking and begin doing",
    "Do one thing every day that scares you",
    "The only thing we have to fear is fear itself" 
];

// Event listener for the start button.
//      Hides the overlay div.
startButton.addEventListener("click", (e) => {
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
});

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

const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);
addPhraseToDisplay(phraseArray);

const checkLetter = button => {
    let item = list.children;
       
    for(let i = 0; i < item.length; i++) {
        let letter = item[i].textContent;
        if(button === letter) {
            console.log("match");
            let letterFound = button;
            item[i].className = item[i].className + " show";
            return letterFound;    
        } else {
            return null;      /* CHECK HERE: This function returns always null*/
        }
     } 
};

qwerty.addEventListener("click", e => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        let button = e.target.textContent;
        e.target.disabled = true;  
        e.target.className = 'chosen';
        console.log(checkLetter(button));  
    }
});


































/*

qwerty.addEventListener("click", (e) => {
        let letter = e.target.textContent;
        e.target.className = "chosen";
        e.target.disabled = "true";
        
        if (checkLetter(letter) === null) {
            let heartLi = hearts.children;
            let heartImg = document.querySelector("#scoreboard ol li img");
            console.log(heartImg);
            console.log(missed);
            heartImg.src = "images/lostHeart.png";
            missed += 1;
            
            

        }
        
});
    


let checkLetter = (letter) => {
    let item = list.children;
    let letterFound = letter;
    let letterMatched = "";

    for(let i = 0; i < item.length; i++) {
        if (item[i].textContent === letterFound) {
            item[i].className = item[i].className + " show";
            letterMatched = letterFound;
            return letterMatched;  
        } 
    } return null;
}; */