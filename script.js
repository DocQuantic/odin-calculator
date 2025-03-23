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
    display.textContent = text;
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
    calculatorStatus = "operand1";
    setDisplay(textToDisplay);
})

const operandBtns = document.querySelectorAll(".operand");
for(button of operandBtns){
    button.addEventListener("click", (e) => {
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
            operator = e.target.textContent;
            if(operand1 === null && operand2 === null){
                operand1 = parseFloat(textToDisplay);
                textToDisplay = null;
            } else if(operand1 !== null && operand2 === null){
                operand2 = parseFloat(getDisplay());
                operand1 = operate(operator, operand1, operand2);
                setDisplay(operand1.toString());
                operator = e.target.textContent;
                textToDisplay = null;
                lastOperationSource = "operator";
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
        lastOperationSource = "equal";
    }
})