/** Variables **/
let operandA = 0;
let operandB = 0;
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

/* operands.find(op => op.symbol==="+").function(1, 2) */
function operate(operator, operand1, operand2){
    return operators.find(op => op.symbol === operator).function(operand1, operand2);
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