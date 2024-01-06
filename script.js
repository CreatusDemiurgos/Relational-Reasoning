import ShapeGenerator from './functions/shapeGenerator.js';

const canvas = document.getElementById("canvas1");
const cntx = canvas.getContext("2d");

const canvas2 = document.getElementById("canvas2");
const cntx2 = canvas2.getContext("2d");

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
    "is lighter ",
    "is darker ",
    "is bigger ",
    "is smaller ",
];




function displayRandomShape(){
    cntx.clearRect(0, 0, canvas.width, canvas.height);
    const randomIndex = Math.floor(Math.random() * shapeGenerators.length);
    shapeGenerators[randomIndex](cntx);
    cntx2.clearRect(0, 0, canvas2.width, canvas2.height);
    const randomIndex2 = Math.floor(Math.random() * shapeGenerators.length);
    shapeGenerators[randomIndex2](cntx2);
    const randomIndexPhrase = Math.floor(Math.random() * twoCanvasComparisonPhrases.length);
    var finalPhrase = shapeName[randomIndex] + twoCanvasComparisonPhrases[randomIndexPhrase] + shapeName[randomIndex2]
    var paragraph = document.getElementById("statement");
    paragraph.textContent = finalPhrase;
}


document.getElementById("falseBtn").addEventListener("click", displayRandomShape);
document.getElementById("trueBtn").addEventListener("click", displayRandomShape);