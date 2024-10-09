/*-------------------------------- Constants --------------------------------*/

// the array object ( contains 50 different choices )

const wordList = [
    {
        word: "apple",
        hint: "A fruit that is commonly red or green."
    },
    {
        word: "book",
        hint: "Contains pages with text for reading."
    },
    {
        word: "sun",
        hint: "A star that provides light and heat."
    },
    {
        word: "cat",
        hint: "A furry animal that meows."
    },
    {
        word: "tree",
        hint: "Tall plant with branches and leaves."
    },
    {
        word: "ball",
        hint: "Round object used in various games."
    },
    {
        word: "house",
        hint: "A structure where people live."
    },
    {
        word: "car",
        hint: "Vehicle used for transportation."
    },
    {
        word: "flower",
        hint: "Colorful plant with petals."
    },
    {
        word: "dog",
        hint: "Popular pet known for loyalty."
    },
    {
        word: "cake",
        hint: "Sweet dessert often served at parties."
    },
    {
        word: "bird",
        hint: "Feathered animal that can fly."
    },
    {
        word: "key",
        hint: "Used to unlock doors or start cars."
    },
    {
        word: "chair",
        hint: "Furniture for sitting on."
    },
    {
        word: "moon",
        hint: "Natural satellite of Earth."
    },
    {
        word: "pen",
        hint: "Writing instrument."
    },
    {
        word: "watch",
        hint: "Worn on the wrist to tell time."
    },
    {
        word: "banana",
        hint: "Yellow fruit with a peel."
    },
    {
        word: "shoe",
        hint: "Footwear worn on the feet."
    },
    {
        word: "hat",
        hint: "Worn on the head for protection or style."
    },
    {
        word: "table",
        hint: "Furniture used for eating or working."
    },
    {
        word: "lamp",
        hint: "Provides light in a room."
    },
    {
        word: "phone",
        hint: "Device for making calls."
    },
    {
        word: "guitar",
        hint: "Musical instrument with strings."
    },
    {
        word: "milk",
        hint: "White liquid from cows."
    },
    {
        word: "chair",
        hint: "Furniture for sitting on."
    },
    {
        word: "computer",
        hint: "Electronic device for processing data."
    },
    {
        word: "phone",
        hint: "Device for making calls."
    },
    {
        word: "pencil",
        hint: "Writing tool made of wood and graphite."
    },
    {
        word: "socks",
        hint: "Clothing worn on feet."
    },
    {
        word: "cake",
        hint: "Sweet dessert often served at parties."
    },
    {
        word: "cloud",
        hint: "White fluffy mass in the sky."
    },
    {
        word: "door",
        hint: "Used to enter or exit a room."
    },
    {
        word: "water",
        hint: "Essential liquid for life."
    },
    {
        word: "music",
        hint: "Sounds that create harmony."
    },
    {
        word: "desk",
        hint: "Furniture for working on."
    },
    {
        word: "window",
        hint: "Lets in light and air."
    },
    {
        word: "shirt",
        hint: "Clothing worn on the upper body."
    },
    {
        word: "school",
        hint: "Place of learning."
    },
    {
        word: "picture",
        hint: "Image created with a camera."
    },
    {
        word: "cookie",
        hint: "Sweet baked treat."
    },
    {
        word: "bag",
        hint: "Container for carrying items."
    },
    {
        word: "sunrise",
        hint: "The time when the sun rises."
    },
    {
        word: "garden",
        hint: "Outdoor space for plants."
    },
    {
        word: "train",
        hint: "Vehicle that runs on tracks."
    },
    {
        word: "clock",
        hint: "Device that tells time."
    },
    {
        word: "mirror",
        hint: "Reflective surface for seeing oneself."
    },
    {
        word: "orange",
        hint: "Citrus fruit with a peel."
    },
    {
        word: "bus",
        hint: "Large vehicle for transporting people."
    }
];

const maxAttempts = 6;

/*---------------------------- Variables (state) ----------------------------*/

let currentLetter;
let currentWord;
let incorrectAttempts = 0;
let correctLetters = [];

/*------------------------ Cached Element References ------------------------*/

const keyboardEl = document.querySelector(".keyboard");
const hintsEl = document.querySelector(".hint b");
const wordDisplayEl = document.querySelector(".word-display");
const guessesEl = document.querySelector(".guess b");
const hangImgEl = document.querySelector(".hangman img");
const model = document.querySelector(".model");
const playAgainEl = document.querySelector(".play-again");

/*-------------------------------- Functions --------------------------------*/

// for loop to create the keyboard letters buttons by using forCharCode to take the letters from the UTF-8 code units 

for(let i=97 ; i<=122 ; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardEl.appendChild(button);
    // adding event listener to know the clicked letter 
    button.addEventListener('click', (event) => {
        event.target.innerText = String.fromCharCode(i);
        currentLetter = event.target.innerText;
        button.disabled = true;
        init();
    });
};

const reset = () => {
    correctLetters = [];
    incorrectAttempts = 0;
    model.classList.add("hidden");
    hangImgEl.src = "./assest/hang1.png";
    guessesEl.innerText = `${incorrectAttempts} / ${maxAttempts}`;
    keyboardEl.querySelectorAll("button").forEach(button => button.disabled = false);
}

const getRandom = () => {
    model.classList.add("hidden");
    const {word, hint} = wordList[Math.floor(Math.random()* wordList.length)];
    // to save the current word
    currentWord = word;
    // to display the hint
    hintsEl.innerText = hint;
    // to reset and play again
    reset();
    // split is used to split the word into letters , map is used to create a list item for each letter , join used to join all the li's 
    wordDisplayEl.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("");
};

const gameOver = (win) => {
    setTimeout(() => {
        if (win === true) {
            const text = 'You found the word:';
            model.querySelector("img").src = "./assest/victory.gif";
            model.querySelector("h4").innerText = 'Congratulations!';
            model.querySelector("p").innerHTML = `${text} <b>${currentWord}</b>`;
            model.classList.remove("hidden");
        } else if (win === false) {
            const text1 = 'The correct word is:';
            model.querySelector("img").src = "./assest/gameover.gif";
            model.querySelector("h4").innerText = 'GAME OVER!!!';
            model.querySelector("p").innerHTML = `${text1} <b>${currentWord}</b>`;
            model.classList.remove("hidden");
        }
    },1000)
}


const init = () => {
    // checking if the letter exist in the word or not using includes method 
    if(currentWord.includes(currentLetter)) {
        console.log(`${currentLetter} exist in word`);
        // Showing the correct letters 
        [...currentWord].forEach((letter, index) => {
            if(letter === currentLetter) {
                correctLetters.push(currentLetter);
                wordDisplayEl.querySelectorAll("li")[index].innerText = letter;
                wordDisplayEl.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        incorrectAttempts++;
        console.log(`${currentLetter} does not exist in word`);
        // updating the images 
        if (incorrectAttempts === 1) {
            hangImgEl.src = `./assest/hang2.png`;
        } else if (incorrectAttempts === 2) {
            hangImgEl.src = "./assest/hang3.png";
        } else if (incorrectAttempts === 3) {
            hangImgEl.src = "./assest/hang4.png";
        } else if (incorrectAttempts === 4) {
            hangImgEl.src = "./assest/hang5.png";
        } else if (incorrectAttempts === 5) {
            hangImgEl.src = "./assest/hang6.png";
        } else if (incorrectAttempts === maxAttempts) {
            hangImgEl.src = "./assest/hang7.png";
            if (correctLetters.length !== currentWord.length){
                gameOver(false);
            }
        } 
    }
    guessesEl.innerText = `${incorrectAttempts} / ${maxAttempts}`;
    if (correctLetters.length === currentWord.length) {
        gameOver(true);
    }
};

getRandom();

/*----------------------------- Event Listeners -----------------------------*/

playAgainEl.addEventListener('click', getRandom);