// Array of Words

const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// levels

const lvls = {
  "Easy": 5,
  "Medium": 3,
  "Hard": 2,
};



let defaultLevel = "Easy";
// Default Level

let deafultLevelSeconds= lvls[defaultLevel];

let levelName = document.querySelector(".message .lvl");
let levelSecs = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let allWords = document.querySelector(".words");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let start = document.querySelector(".start");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let select = document.querySelector("select");
let levelMenu = document.querySelector(".custom-select");



select.onchange = function() {
  let option = select.options[select.selectedIndex].value;
  defaultLevel = option;
  levelName.innerHTML = defaultLevel;
  deafultLevelSeconds = lvls[defaultLevel];
  levelSecs.innerHTML=  deafultLevelSeconds;
  timeLeft.innerHTML=  deafultLevelSeconds;


}

// Settings
levelName.innerHTML = defaultLevel;
levelSecs.innerHTML = deafultLevelSeconds;
timeLeft.innerHTML = deafultLevelSeconds;
scoreTotal.innerHTML = words.length;


input.onpaste=function() {
    return false;
}


// Start Game

startBtn.onclick= function() {
    this.remove();
    input.focus();
    levelMenu.remove();

    // generate Word Function
    genWord();
    
}   



function genWord() {
    
    // Get Random Word From the array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    //Remove WordFrom Array
    words.splice(wordIndex,1);
    //display the random word
    allWords.innerHTML=randomWord;
    //Empty UpComing Words
    upcomingWords.innerHTML= "";

    for(i=0; i < words.length; i++ ) {
        let div = document.createElement("div");
        let text = document.createTextNode(words[i]);
        div.appendChild(text);
        upcomingWords.appendChild(div);
    }

    // play function
    startPlay()
}

function startPlay() {
  timeLeft.innerHTML = deafultLevelSeconds;
  if (words.length == 29) {
    timeLeft.innerHTML= 8;
  }
  let start = setInterval(() => {
    timeLeft.innerHTML--;
   
    if(timeLeft.innerHTML === "0") {
      clearInterval(start);
     
      // Compare Words
      if(allWords.innerHTML.toLocaleLowerCase().trim() === input.value.toLocaleLowerCase().trim()) {
        
        input.value= "";
        scoreGot.innerHTML++;

       
        
        
        if(words.length > 0) {
          genWord()
          
        }
        
        else {
          let span =document.createElement("span");
          span.className = "win";
          let spanText =document.createTextNode("congratulations")
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.remove();
          localStorage.setItem(scoreGot.innerHTML, new Date);
        }
      }
      else {
        let span = document.createElement("span");
        span.className = 'lose';
        let spanText=document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        input.blur();
        input.style.pointerEvents= "none";
        input.style.borderColor="var(--red-color)";
        localStorage.setItem(scoreGot.innerHTML, new Date);

      }

    }
  }, 1000);
}



