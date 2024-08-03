const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;
let round=1;
let score = 0;


const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        if(round<6){
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
        }else{
            return;
        }
      
    },1000);
}

const initGame = () => {
    
    initTimer(15);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();


const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord){
        round++;
        return alert(`Oops! ${userWord} is not a correct word`);
    }else{
        alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    score++;
    round++;
    }
    
    if(round<6){
        initGame();
        
    }else{
        Swal.fire({
            title: "Good job!",
            text: `Your Score : ${score}`,
            icon: "success"
          });
        
        document.querySelector(".container").style.display = "none";
        
        
       
    }
    
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);