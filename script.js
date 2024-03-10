import ShapeGenerator from './functions/shapeGenerator.js';
import UserScore from './functions/userScore.js';
import anime from './functions/anime.es.js'

const canvas = document.getElementById("canvas1");
const cntx = canvas.getContext("2d");
canvas.width= innerWidth/4;
canvas.height= innerWidth/4;
const canvas2 = document.getElementById("canvas2");
const cntx2 = canvas2.getContext("2d");
canvas2.width= innerWidth/4;
canvas2.height= innerWidth/4;
const canvas3 = document.getElementById("canvas3");
const cntx3 = canvas3.getContext("2d");
canvas3.width= innerWidth/4;
canvas3.height= innerWidth/4;

let score = 0;
let scoreNav = document.getElementById("scoreNav");

let randomIndexPhrase;
let randomIndexOneCanvas;
let randomIndexColorPhrase;
let randomPhraseTypeChooser;
let displayRandomComparison;
let colorChoosen;
let colorChoosen2;

var introPage = document.getElementById("introPage");
var bt = document.getElementById("bt");

let countdownTime;
let actualTime;
let countdownInterval;

let XClicked = false;

let chevronClicked = false;
// let distanceFromRight = document.getElementById("main").offsetWidth/10;

const shapeGenerator = new ShapeGenerator();
const userScore = new UserScore("dataBase", "objScore");
userScore.createDatabase();

let correctSound = new Audio("./assets/correct.wav");
let wrongSound = new Audio("./assets/wrong.wav");

let shapesToDisplay;

const shapeGenerators = [ 
    shapeGenerator.makeTriangle.bind(shapeGenerator),
    shapeGenerator.makeSquare.bind(shapeGenerator),
    shapeGenerator.makeRectangle.bind(shapeGenerator),
    shapeGenerator.makePentagon.bind(shapeGenerator),
    shapeGenerator.makeHexagon.bind(shapeGenerator),
    shapeGenerator.makeCircle.bind(shapeGenerator)
];

const shapeName = ["triangle ", "square ", "rectangle ", "pentagon ", " hexagon ", "circle "];

const twoCanvasComparisonPhrases = [
        "is west of ",
        "is east of ",
        "is to the left of ",
        "is to the right of ",
        "is not east of ",
        "is not west of ",
        "is not to the right of ",
        "is not to the left of "      
];

const oneCanvasComparisonPhrases = [
    "is outside of ",
    "is inside of ",
    "is not inside of ",
    "is not outside of ",
    "is englobing ",
    "is englobed by ",
    "is encapsulating ",
    "is encapsulated by ",
    "is bounding ",
    "is bounded by ",
    "is not encompassed by ",
    "is not encompassing ",
];

const colorComparisons = [
    "is lighter than ",
    "is darker than ",
    "is not darker than ",
    "is not lighter than ",
    "have the same color as "
];

//Definition: 1st2nd = The sentence is phrased in such a way that the first object is the one on the left and the second one is the one on the right


function comparisons(buttonClicked){
    let statementVeracity;
    if(displayRandomComparison === 0){
        switch(randomPhraseTypeChooser){
            case(0):
                statementVeracity = trueOrFalse("1st2nd", randomIndexPhrase % 2);
                break;
            case(1):
                statementVeracity = trueOrFalse("2nd1st", randomIndexPhrase % 2);
                break;
            case(2):
                statementVeracity = colorComparison(colorChoosen[0], colorChoosen2[0], "1st2nd", randomIndexColorPhrase);
                break;
            case(3):
                statementVeracity = colorComparison(colorChoosen[0], colorChoosen2[0], "2nd1st", randomIndexColorPhrase);
                break;
        }
    }else if(displayRandomComparison === 1){
        switch(randomPhraseTypeChooser){
            case(0):
                statementVeracity = trueOrFalse("1st2nd", randomIndexOneCanvas % 2);
                break;
            case(1):
                statementVeracity = trueOrFalse("2nd1st", randomIndexOneCanvas % 2);
                break;
            case(2):
                statementVeracity = colorComparison(colorChoosen[0], colorChoosen2[0], "1st2nd", randomIndexColorPhrase);
                break;
            case(3):
                statementVeracity = colorComparison(colorChoosen[0], colorChoosen2[0], "2nd1st", randomIndexColorPhrase);
                break;
        }
    }
    if(buttonClicked === statementVeracity){
        score += 1;
        correctSound.play();
    }else{
        score -= 1;
        wrongSound.play();
    }
}


function displayRandomShape(){
    // randomIndex is used to select a shape
    cntx.clearRect(0, 0, canvas.width, canvas.height);
    cntx2.clearRect(0, 0, canvas2.width, canvas2.height);
    cntx3.clearRect(0, 0, canvas3.width, canvas3.height);
    displayRandomComparison = Math.floor(Math.random() * 2);
    const randomIndex = Math.floor(Math.random() * shapeGenerators.length);
    let randomIndex2;
    do {
        randomIndex2 = Math.floor(Math.random() * shapeGenerators.length);
      } while (randomIndex2 === randomIndex);//needed to not compare the same shape, added for later
    randomPhraseTypeChooser = Math.floor(Math.random() * 2);
    let finalPhrase;
    if(displayRandomComparison === 0){
        colorChoosen = shapeGenerators[randomIndex](cntx, canvas.width, canvas.height, 1);
        colorChoosen2 = shapeGenerators[randomIndex2](cntx2, canvas2.width, canvas2.height, 1);
        if(colorChoosen[1] === colorChoosen2[1]){
            randomPhraseTypeChooser = 2 + Math.floor(Math.random() * 2);//the 2 and 3 phrase types compare color
            randomIndexColorPhrase = Math.floor(Math.random() * colorComparisons.length);
        }else{
            randomPhraseTypeChooser = Math.floor(Math.random() * 2);
            randomIndexPhrase = Math.floor(Math.random() * twoCanvasComparisonPhrases.length);
        }
        switch(randomPhraseTypeChooser){
            case(0):
                finalPhrase = shapeName[randomIndex] + twoCanvasComparisonPhrases[randomIndexPhrase]  + shapeName[randomIndex2];
                break;
            case(1):
                finalPhrase = shapeName[randomIndex2] + twoCanvasComparisonPhrases[randomIndexPhrase]  + shapeName[randomIndex];
                break;
            case(2):
                finalPhrase = shapeName[randomIndex] + colorComparisons[randomIndexColorPhrase] + shapeName[randomIndex2];
                break;
            case(3):
                finalPhrase = shapeName[randomIndex2] + colorComparisons[randomIndexColorPhrase] + shapeName[randomIndex];
                break;
        }
    }else if(displayRandomComparison === 1){
        colorChoosen = shapeGenerators[randomIndex](cntx3, canvas3.width, canvas3.height, 1);
        colorChoosen2 = shapeGenerators[randomIndex2](cntx3, canvas3.width, canvas3.height, 3);
        if(colorChoosen[1] === colorChoosen2[1]){
            randomPhraseTypeChooser = 2 + Math.floor(Math.random() * 2);
            randomIndexColorPhrase = Math.floor(Math.random() * colorComparisons.length);
        }else{
            randomPhraseTypeChooser = Math.floor(Math.random() * 2);
            randomIndexOneCanvas = Math.floor(Math.random() * oneCanvasComparisonPhrases.length);
        }
        switch(randomPhraseTypeChooser){
            case(0):
                finalPhrase = shapeName[randomIndex] + oneCanvasComparisonPhrases[randomIndexOneCanvas] + shapeName[randomIndex2];
                break;
            case(1):
                finalPhrase = shapeName[randomIndex2] + oneCanvasComparisonPhrases[randomIndexOneCanvas] + shapeName[randomIndex];
                break;
            case(2):
                finalPhrase = shapeName[randomIndex] + colorComparisons[randomIndexColorPhrase] + shapeName[randomIndex2];
                break;
            case(3):
                finalPhrase = shapeName[randomIndex2] + colorComparisons[randomIndexColorPhrase] + shapeName[randomIndex];
                break;
        }
    }
    var paragraph = document.getElementById("statement");
    paragraph.textContent = finalPhrase;    
}

function colorComparison(shadeFirstShape, shadeSecondShape, phraseChoosen, phraseNumber){
    //1 = true, 2 = false. This will then be compared to what the user have choosen by clicking the buttons in the comparisons function
    if(phraseNumber === 4){
        if((shadeFirstShape === shadeSecondShape)){
            return 1;
        }else{
            return 2;
        }
    }
    if((shadeFirstShape === "dark") && (shadeSecondShape === "light")){
        if(phraseChoosen === "1st2nd"){
            if(phraseNumber % 2 === 1){
                return 1;
            }else if(phraseNumber % 2 === 0){
                return 2;
            }
        }else if(phraseChoosen === "2nd1st"){
            if(phraseNumber % 2 === 0){
                return 1;
            }else if(phraseNumber  %2 === 1){
                return 2;
            }
        }
    }else if((shadeFirstShape === "light") && (shadeSecondShape === "dark")){
        if(phraseChoosen === "1st2nd"){
            return trueOrFalse("1st2nd", phraseNumber % 2);
        }else if(phraseChoosen === "2nd1st"){
            return trueOrFalse("2nd1st", phraseNumber % 2);
        }
    }else if(shadeFirstShape === shadeSecondShape){
        if(phraseNumber === 2 || phraseNumber === 3){
            return 1;
        }else{
            return 2;
        }
        
    }
} 
function trueOrFalse(phraseChoosen, phraseType){
    if((phraseChoosen === "1st2nd") && phraseType === 0){
        return 1;
    }else if((phraseChoosen === "1st2nd") && phraseType === 1){
        return 2;
    }else if((phraseChoosen === "2nd1st") && phraseType === 0){
        return 2;
    }else if((phraseChoosen === "2nd1st") && phraseType === 1){
        return 1;
    }else{
        console.error("Comparison not as it should be");
    }
} 

//This lines of code are going to be run when the full page loads, they  ask for the username (useful for the future when I need to store data and link it with a
// user) and they display the  first shapes
displayRandomShape();
// document.getElementById('myCheckbox').checked = false;




function handleButtonClick(buttonClicked){
    //the comparison function NEED to be before display random shapes. This is due to the fact that we need to first compare
    //the displayed objects, then generate new ones.
    comparisons(buttonClicked);
    displayRandomShape();
    
}


// document.getElementById('myCheckbox').addEventListener("click", function(){
//     if(document.getElementById('myCheckbox').checked === false){
//         document.getElementById("t1").style.display = "none";
//         document.querySelectorAll('.auto-select').forEach(function(input) {
//             input.value = 0;
//         });
//     }else if(document.getElementById('myCheckbox').checked === true){
//         document.getElementById("t1").style.display = "flex";
//     }
// })


function incrementChev(myInput, maxValue){
    if(myInput.value < parseInt(maxValue)){
        myInput.value = parseInt(myInput.value) + 1;
    }   
}   
function decreaseChev(myInput){
    if(myInput.value > 0){
        myInput.value = parseInt(myInput.value) - 1;
    }
}

function chevMaxValue(e, number){
    let value;
    if(parseInt(e.target.value) != 0){
        value = e.target.value.replace(/^0+/, '');
    }else{
        value = e.target.value;
    }
    if (parseInt(value) > parseInt(number)) {
        e.target.value = 0;
    } else {
        e.target.value = value;
    }
    if(parseInt(e.target.value) === 0){
        e.target.value = 0;
    }
}

function countdown(){
    countdownTime--;
    if(countdownTime <= 0){
        clearInterval(countdownInterval);
        bt.style.display = "none";
        introPage.style.display = "flex";
        if(XClicked === false){
            const scorePerSec = (score/actualTime).toFixed(2); 
            const newItem = {
                name: score,
                time: actualTime,
                scorePerSec: scorePerSec,
            };
            userScore.addItem(newItem); 
            userScore.allScores();
        }else{ XClicked = false;}
        
    }
}


document.getElementById("exit").addEventListener("click", function(){
    //This is used to exit if you have untimed on or you want to finish early. The score will not be saved in either case
    XClicked = true;
    countdownTime = 0;
    bt.style.display = "none";
    introPage.style.display = "flex";
});

document.getElementById("falseBtn").addEventListener("click", function(){handleButtonClick(2)});
document.getElementById("trueBtn").addEventListener("click", function(){handleButtonClick(1)}); 
document.addEventListener("keydown", function(event){
    //L and A to answer, where L is false and A is true
    if(event.key === "l"){
        handleButtonClick(2);
    }else if(event.key === "a"){
        handleButtonClick(1);
    }
});

let clock = document.getElementById("clock");
let scoreTable = document.getElementById("scoreTable");

let clockVisibility = 0;
let scoreVisibility = 0;

let hours;
let minutes;
let seconds;

document.getElementsByClassName("bx-time-five")[0].addEventListener("click", function(){
    if(clockVisibility === 0){
        scoreTable.style.display = "none";
        scoreVisibility = 0;

        clock.style.display = "flex";
        document.getElementById("main").style.filter = "blur(2vw)";
        let timerSubUnits = (clock.offsetWidth / 3) + "px";
        document.getElementById("hour").style.width = timerSubUnits;
        document.getElementById("minutes").style.width = timerSubUnits;
        document.getElementById("seconds").style.width = timerSubUnits;        
        clockVisibility = 1;
    }else{
        hours = parseInt(document.getElementById("inputH").value)*60*60;
        minutes = parseInt(document.getElementById("inputM").value)*60;
        seconds = parseInt(document.getElementById("inputS").value);
        clock.style.display = "none";
        document.getElementById("main").style.filter = "blur(0)";
        clockVisibility = 0;
    }
});

document.getElementsByClassName("bx-spreadsheet")[0].addEventListener("click", function(){
    if(scoreVisibility === 0){
        clock.style.display = "none";
        clockVisibility = 0;

        scoreTable.style.display = "flex";
        document.getElementById("main").style.filter = "blur(2vw)";
        scoreVisibility = 1;
    }else{
        scoreTable.style.display = "none";
        document.getElementById("main").style.filter = "blur(0vw)";
        scoreVisibility = 0;
    }
});

document.getElementById("chevronUpH").addEventListener("click", function(){incrementChev(document.getElementById("inputH"), 23)});
document.getElementById("chevronDownH").addEventListener("click", function(){decreaseChev(document.getElementById("inputH"))});

document.getElementById("chevronUpM").addEventListener("click", function(){incrementChev(document.getElementById("inputM"), 59)});
document.getElementById("chevronDownM").addEventListener("click", function(){decreaseChev(document.getElementById("inputM"))});

document.getElementById("chevronUpS").addEventListener("click", function(){incrementChev(document.getElementById("inputS"), 59)});
document.getElementById("chevronDownS").addEventListener("click", function(){decreaseChev(document.getElementById("inputS"))});


document.getElementById('inputH').addEventListener('input', function (e) { chevMaxValue(e, 23);});
document.getElementById('inputM').addEventListener('input', function (e) { chevMaxValue(e, 59);});
document.getElementById('inputS').addEventListener('input', function (e) { chevMaxValue(e, 59);});

document.querySelectorAll('.auto-select').forEach(function (input) {
    input.addEventListener('focus', function (e) {
        e.target.select();
    });
});





// document.getElementById("checkbox2").addEventListener("click", function(){
//     document.getElementById("checkbox3").checked = false;
//     shapesToDisplay = 2;
// });
// document.getElementById("checkbox3").addEventListener("click", function(){
//     document.getElementById("checkbox2").checked = false;
//     shapesToDisplay = 3;
// });


document.addEventListener("DOMContentLoaded", function () {
    //Used to change page, from the start menu to the actual gameplay
    document.getElementById("startBtn").addEventListener("click", function(){
        introPage.style.display = "none";
        bt.style.display = "block";
        countdownTime =  hours + minutes + seconds;
        if(countdownTime != 0){ 
            actualTime = countdownTime;
            countdownInterval = setInterval(countdown, 1000);   
        } 
    });
  });
  


// document.getElementById("latestScore").addEventListener("click", function(){
//     if(chevronClicked === false){
//         document.getElementById("startBtn").disabled = true;
//         document.getElementById("main").style.filter = "blur(0.3vw)";            
//         this.style.right = distanceFromRight + "px";
//         chevronClicked = true;
          
//         scoreNav.style.width = distanceFromRight + "px";
//         let currentWidth = parseFloat(scoreNav.style.width);
//         let newDivWidth = currentWidth - currentWidth / 5;
//         Array.from(scoreNav.children).forEach(child => { 
//             child.style.width = newDivWidth + "px";
//         });
//         }else{
//             document.getElementById("startBtn").disabled = false;
//             document.getElementById("main").style.filter = "blur(0vw)";
//             document.getElementById("scoreNav").style.width = "0px";
//             chevronClicked = false;
//             this.style.right = "0";
//         }
// });

//document.getElementById("checkbox2").checked = true;

userScore.allScores();

anime({
    targets: '#animate path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5000,
    direction: 'alternate',
    loop: true
  });




