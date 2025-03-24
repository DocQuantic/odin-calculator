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
    if(operator === "/" && operand2 === 0){
        return "/!\\ Division by 0 /!\\";
    } else {
        return operators.find(op => op.symbol === operator).function(operand1, operand2);
    }
}

const display = document.querySelector(".display p");
function setDisplay(text){
    if(text === null || typeof(text) === "string"){
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
    enableMin();
    enableSep();
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
            /* 
            *  After pressing equal, if a number is pressed, operand1 is set to null
            *  in order start the calculation from the beginning
            */
            operand1 = null;
        }
        /*
        let text = null;
        e.target.id === "minus" ? text = "-" : text = e.target.textContent;
        */
       const text = e.target.textContent;
        
        if(textToDisplay === null){
            textToDisplay = text;
        } else {
            textToDisplay += text;
        }
        setDisplay(textToDisplay);
    })
}

const sepBtn = document.querySelector("#sep");
function enableSep(){
    sepBtn.disabled = false;
}
sepBtn.addEventListener("click", () => {sepBtn.disabled = true});

const minusBtn = document.querySelector("#minus");
function enableMin(){
    minusBtn.disabled = false;
}
minusBtn.addEventListener("click", () => {
    textToDisplay = "-" + textToDisplay;
    setDisplay(textToDisplay);
    minusBtn.disabled = true;
});

const operatorBtns = document.querySelectorAll(".operator");
for(button of operatorBtns){
    button.addEventListener("click", (e) => {
        if(textToDisplay !== null){
            enableSep();
            enableMin();
            if(operand1 === null && operator === null){
                /*
                *  If operand1 and operator are null, the calculation starts from the beginning
                *  and pressing operator sets operand1 and operator
                */
                operand1 = parseFloat(textToDisplay);
                operator = e.target.textContent;
                textToDisplay = null;
            } else if(operand1 !== null && operator !== null){
                /*
                *  If operand1 and operator are not null, pressing operator sets operand 2 and performs 
                *  calculation. It also sets the operator for the next calculation.
                */
                operand2 = parseFloat(getDisplay());
                operand1 = operate(operator, operand1, operand2);
                setDisplay(operand1.toString());
                textToDisplay = null;
                operator = e.target.textContent;
            } 
        } else {
            if(operand1 !== null && operator === null){
                /* 
                *  If operand1 is not null and operator is null, it means that last calculation was performed 
                *  by pressing equal button. In this case, operator and operand2 are set. But the calculation is not performed.
                */
                operator = e.target.textContent;
                operand2 = parseFloat(getDisplay());
                textToDisplay = null;
            }
        }
    })
}

const equalBtn = document.querySelector("#eq");
equalBtn.addEventListener("click", () => {
    if(operand1 !== null && operator !== null && textToDisplay !== null){
        enableSep();
        enableMin();
        operand2 = parseFloat(textToDisplay);
        operand1 = operate(operator, operand1, operand2);
        setDisplay(operand1.toString());
        operand2 = null;
        operator = null;
        textToDisplay = null;
    }
})