/** Variables **/
let textToDisplay = null;
let operand1 = null;
let operand2 = null;
let operator = null;
let lastOperationSource = null;
const operators = [
    {
        name: "addition",
        symbol: "+",
        function: add,
    },
    {
        name: "subtraction",
        symbol: "-",
        function: subtract,
    },
    {
        name: "multiplication",
        symbol: "*",
        function: multiply,
    },
    {
        name: "division",
        symbol: "/",
        function: divide,
    },
]

function operate(operator, operand1, operand2){
    return operators.find(op => op.symbol === operator).function(operand1, operand2);
}

const display = document.querySelector(".display p");
function setDisplay(text){
    if(text === null){
        display.textContent = text;
    } else {
        const num = parseFloat(text);
        display.textContent = (Math.round(num*100)/100).toString();
    }
}

function getDisplay(){
    return display.textContent;
}

/** Basic operations functions **/

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

/** Event Listeners **/

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", (e) => {
    textToDisplay = null;
    operand1 = null;
    operand2 = null;
    operator = null;
    setDisplay(textToDisplay);
})

const operandBtns = document.querySelectorAll(".operand");
for(button of operandBtns){
    button.addEventListener("click", (e) => {
        if(operator === null){
            operand1 = null;
        }
        if(textToDisplay === null){
            textToDisplay = e.target.textContent;
        } else {
            textToDisplay += e.target.textContent;
        }
        setDisplay(textToDisplay);
    })
}

const operatorBtns = document.querySelectorAll(".operator");
for(button of operatorBtns){
    button.addEventListener("click", (e) => {
        if(getDisplay() !== ""){
            if(operand1 === null && operator === null){
                operand1 = parseFloat(textToDisplay);
                operator = e.target.textContent;
                textToDisplay = null;
            } else if(operand1 !== null && operator !== null){
                operand2 = parseFloat(getDisplay());
                operand1 = operate(operator, operand1, operand2);
                setDisplay(operand1.toString());
                textToDisplay = null;
                operator = e.target.textContent;
            } else if(operand1 !== null && operator === null){
                operator = e.target.textContent;
                operand2 = parseFloat(getDisplay());
                textToDisplay = null;
            }
        }
    })
}

const equalBtn = document.querySelector("#eq");
equalBtn.addEventListener("click", () => {
    if(operand1 !== null && operator !== null && getDisplay() !== ""){
        operand2 = parseFloat(textToDisplay);
        operand1 = operate(operator, operand1, operand2);
        setDisplay(operand1.toString());
        operand2 = null;
        operator = null;
        textToDisplay = null;
    }
})