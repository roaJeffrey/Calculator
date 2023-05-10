let number = "";
let preNumber = "";
let curNumber = "";
let operator = "";

const predisNum = document.querySelector(".preNum");
const curdisNum = document.querySelector(".curNum");

const numberButtons = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

const equal = document.querySelector(".equal");
equal.addEventListener('click', calculate);

const clear = document.querySelector(".clear");
clear.addEventListener('click', clearEquations);

const decimal = document.querySelector(".decimal");
decimal.addEventListener('click', addDecimal);

const del = document.querySelector(".delete");
del.addEventListener('click', deleteNumber);

window.addEventListener('keydown', keyPressed)

// Functions for Numbers
numberButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    // if(preNumber !== "" && curNumber !== "" && operator === "") {
    //     preNumber = ""
    //     curdisNum.textContent = curNumber
    // }
    if (curNumber.length <= 14) {
        curNumber += number;
        curdisNum.textContent = curNumber;
    }
}

// Function for Operators
operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperators(e.target.textContent);
    });
});

function handleOperators(op) {
    if(preNumber === "") {
        preNumber = curNumber;
        checkOperator(op);
    }
    else if(curNumber === "") {
        checkOperator(op);
    }
    else {
        calculate();
        operator = op;
        curdisNum.textContent = "0";
        predisNum.textContent = preNumber + " " + operator + " " + number;
    }
}

function checkOperator(text) {
    operator = text;
    curdisNum.textContent = "";
    predisNum.textContent = preNumber + " " + operator + " " + number;
    curNumber = "";
}


function calculate() {
    preNumber = Number(preNumber);
    curNumber = Number(curNumber);

    if (operator === "+") {
        preNumber += curNumber;
    }
    else if (operator === "-") {
        preNumber -= curNumber;
    }
    else if (operator === "*") {
        preNumber *= curNumber;
    }
    else if (operator === "/") {
        if (curNumber <= 0){
            preNumber = "Can't divide by zero"
            predisNum.textContent = "";
            curdisNum.textContent = preNumber;
            operator = "";
            return;
        }
    preNumber /= curNumber;
    }
    else if (operator === "%") {
        preNumber /= 100;
    }
    preNumber = preNumber.toString();
    displayResults();
}

function displayResults() {
    predisNum.textContent = "";
    operator = "";
    curNumber = "";
    if(preNumber.length <= 14) {
        curdisNum.textContent = preNumber;
    }
    else{
        curdisNum.textContent = preNumber.slice(0, 14) + "...";
    }
}

function clearEquations() {
    curNumber = "";
    preNumber = "";
    operator = "";
    curdisNum.textContent = "0";
    predisNum.textContent = "";
}

function deleteNumber() {
    if (curNumber != "") {
        curNumber = curNumber.slice(0, -1);
        curdisNum.textContent = curNumber;
        if(curNumber === "") {
            curdisNumber.textContent = "0";
        }
    }
    if(curNumber === "" && preNumber !== "" && operator === "") {
        preNumber = preNumber.slice(0, -1);
        curdisNum.textContent - preNumber;
    }
}

function addDecimal() {
    if (!curNumber.includes(".")) {
        curNumber += ".";
        curdisNum.textContent = curNumber;
    }
}

function keyPressed(e) {
    e.preventDefault()
    if(e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    else if (e.key === "Enter" || (e.key === "=" && curNumber != "" && preNumber != "")) {
        calculate();
    }
    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        handleOperators(e.key);
    }
    else if(e.key === ".") {
        addDecimal();
    }
    else if(e.key === "Backspace") {
        deleteNumber();
    }
}