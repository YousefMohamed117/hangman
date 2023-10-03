const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");

  let theLetter = document.createTextNode(letter);

  span.appendChild(theLetter);

  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scale",
    "fortran",
    "r",
    "mysql",
    "python",
    "qqqq",
  ],
  movies: [
    "Prestige",
    "Inception",
    "parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Gandhi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allkeys = Object.keys(words);

let randomPropNum = Math.floor(Math.random() * allkeys.length);
let randomPropName = allkeys[randomPropNum];
let randomPropval = words[randomPropName];

let randomValNum = Math.floor(Math.random() * randomPropval.length);
let randomValName = randomPropval[randomValNum];

document.querySelector(".game-info span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");
let letterAndSpaces = Array.from(randomValName.toLowerCase());

letterAndSpaces.forEach((letter) => {
  let span = document.createElement("span");

  if (letter === " ") {
    span.className = "with-space";
  }

  lettersGuessContainer.appendChild(span);
});

let draw = document.querySelector(".hangman-draw");

let guessSpans = document.querySelectorAll(".letters-guess span");
counter = 0;
trueCounter = 0;
wins = 0;
console.log(letterAndSpaces);
let clickedWord = [];
document.addEventListener("click", (e) => {
  let status = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    theClickedLetter = e.target.innerHTML.toLowerCase();

    letterAndSpaces.forEach((letter, i) => {
      if (theClickedLetter == letter) {
        status = true;
        clickedWord.push(theClickedLetter);
        guessSpans.forEach((span, spanindex) => {
          if (i === spanindex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    if (status !== true) {
      counter++;
      draw.classList.add(`wrong-${counter}`);
      document.getElementById("fail").play();

      if (counter === 8) {
        lettersContainer.classList.add("finished");
        endgame();
        document.getElementById("lose").play();
        setTimeout(function reset() {
          location.reload();
        }, 3000);
        wins = 0;
      }
    } else {
      document.getElementById("success").play();
    }
    clickedWord.forEach((l) => {
      if (theClickedLetter == l) {
        trueCounter++;
        if (trueCounter == letterAndSpaces.length) {
          let div = document.createElement("div");
          let txt = document.createTextNode(`Congrats!!!!!!`);
          div.className = "popup2";
          div.appendChild(txt);
          document.body.appendChild(div);
          document.getElementById("finish").play();
          setTimeout(reset(), 30000);
          wins++;
          console.log();
        }
      }
    });
  }
  window.localStorage.setItem("wins", wins);
  document.getElementById("win").innerHTML = `${wins}`;
});

function endgame() {
  let div = document.createElement("div");

  let txt = document.createTextNode(`You Lost!
   the word is ${randomValName}`);
  div.className = "popup";
  div.appendChild(txt);

  document.body.appendChild(div);
}

document.getElementById("reset").onclick = reset()
 function reset() {
  location.reload();
}

console.log(reset())