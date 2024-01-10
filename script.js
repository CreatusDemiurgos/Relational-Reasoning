import ShapeGenerator from './functions/shapeGenerator.js';

const canvas = document.getElementById("canvas1");
const cntx = canvas.getContext("2d");

const canvas2 = document.getElementById("canvas2");
const cntx2 = canvas2.getContext("2d");

const tableScore = document.getElementById("score");
const tableName = document.getElementById("name");
let score = 0;

let right;
let left;
let randomIndexPhrase;
let phraseTypeChosen;

const shapeGenerator = new ShapeGenerator();

const shapeGenerators = [ 
    shapeGenerator.makeTriangle.bind(shapeGenerator),
    shapeGenerator.makeSquare.bind(shapeGenerator),
    shapeGenerator.makeRectangle.bind(shapeGenerator),
    shapeGenerator.makePentagon.bind(shapeGenerator),
    shapeGenerator.makeHexagon.bind(shapeGenerator),
    shapeGenerator.makeCircle.bind(shapeGenerator)
];

const shapeName = ["triangle ", "square ", "rectangle ", "pentagon ", "hexagon ", "circle "];

const twoCanvasComparisonPhrases = [
        "is west of ",
        "is east of ",
        "is to the left of ",
        "is to the right of "        
];

function comparisonPosition(buttonClicked){
    //checking if the phrase stated is ture or false. If it is true then its equal to 1, if its false its equal to 2
    let statementVeracity;
    if(randomIndexPhrase === 0 || randomIndexPhrase === 2){
        if(phraseTypeChosen === 1){
            statementVeracity = 1;
        }else if(phraseTypeChosen === 2){
            statementVeracity = 2;
        }
    }else if(randomIndexPhrase === 1 || randomIndexPhrase === 3){
        if(phraseTypeChosen === 1){
            statementVeracity = 2;
        }else if(phraseTypeChosen === 2){
            statementVeracity = 1;
        }
    }

    if(buttonClicked === statementVeracity){
        score += 1;
        tableScore.textContent = score;
    }else{
        score -= 1;
        tableScore.textContent = score;
    }
}

function displayRandomShape(){
    cntx.clearRect(0, 0, canvas.width, canvas.height);
    const randomIndex = Math.floor(Math.random() * shapeGenerators.length);
    left = randomIndex;
    shapeGenerators[randomIndex](cntx);
    cntx2.clearRect(0, 0, canvas2.width, canvas2.height);
    const randomIndex2 = Math.floor(Math.random() * shapeGenerators.length);
    right = randomIndex2;
    shapeGenerators[randomIndex2](cntx2);
    randomIndexPhrase = Math.floor(Math.random() * twoCanvasComparisonPhrases.length);
    const randomPhraseTypeChooser = Math.floor(Math.random());
    let finalPhrase;
    if(randomPhraseTypeChooser === 0){
        finalPhrase = shapeName[randomIndex] + twoCanvasComparisonPhrases[randomIndexPhrase] + shapeName[randomIndex2];
        phraseTypeChosen = 1;
    }else{
        finalPhrase = shapeName[randomIndex2] + twoCanvasComparisonPhrases[randomIndexPhrase] + shapeName[randomIndex];
        phraseTypeChosen = 2;
    }
    var paragraph = document.getElementById("statement");
    paragraph.textContent = finalPhrase;
}


//This lines of code are going to be run when the full page loads, they  ask for the username (useful for the future when I need to store data and link it with a
// user) and they display the  first shapes
displayRandomShape();
var userInput = 0;
userInput = prompt("Enter your username");
tableName.textContent = userInput;



function handleButtonClick(buttonClicked){
    //the comparison function NEED to be before display random shapes. This is due to the fact that we need to first compare
    //the displayed objects, then generate new ones.
    comparisonPosition(buttonClicked);
    displayRandomShape();
    
}

document.getElementById("falseBtn").addEventListener("click", function(){handleButtonClick(2)});
document.getElementById("trueBtn").addEventListener("click", function(){handleButtonClick(1)}); 