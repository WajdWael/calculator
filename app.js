/* 2) Creat a clss with methods : */


// Why we create a classes? 
// --- classes are a template for creating object.

// What class really means?
// --- classes are speical kind of functions

// What are the class components?
// --- tow components : 1) class experssions && 2) class declaration 

// what is the class expressions?
// --- to define the name of the class like the function.

// what is the class declartion?
// --- is to declare a class you have to use the {CLASS} keyword with the name of the class

// when to get access to the class?
// --- after create a class you can declar it using new keyword and then the name of the class

// what is constructor?
// --- Constructor is a method for creating and initalizing an objcet. 

// how many constructor method i can use?
// --- you can use just one Constructor method or it would be a syntaxError

// the step for creating a class? 
// --- first : use the keyword class to create a class.
// --- second : always add a Constructor() method.
// --- third : then add any nunber of method.

class Calculator{
    constructor(currentOprentxtEle, prevOprentxtEle) {
        this.prevOprentxtEle = prevOprentxtEle;
        this.currentOprentxtEle = currentOprentxtEle;
        this.clear()
    }
    clear() {
        this.prevOpren = ""
        this.currentOpren = ""
        this.opreation = undefined
    }
    delet() {
        this.currentOpren = this.currentOpren.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === "." && this.currentOpren.includes(".")) return 
        this.currentOpren = this.currentOpren.toString() + number.toString()
    }

    chooseOpreation(opreation) {
        if (this.currentOpren === "") return
        if (this.prevOpren !== "") {
            this.compute()
        }
        this.opreation = opreation;
        this.prevOpren = this.currentOpren;
        this.currentOpren = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOpren)
        const current = parseFloat(this.currentOpren)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.opreation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '×':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return;
        }
        this.currentOpren = computation
        this.opreation = undefined
        this.prevOpren = ''
    }
    getDisplay(number) {
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integerDispaly
        if (isNaN(integerDigits)) {
            integerDispaly = ''
        } else {
            integerDispaly = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDispaly}.${decimalDigits}`
        } else {
            return integerDispaly
        }
    }
    updateDisplay() {
        this.currentOprentxtEle.innerText =
            this.getDisplay(this.currentOpren);
        if (this.opreation != null) {
            this.prevOprentxtEle.innerText = `${this.getDisplay(this.prevOpren)} ${this.opreation}`;
        } else {
            this.prevOprentxtEle.innerText = ''
        }
    }
}



/* 1) Defining the var : */

// All Number-btn and Operation-btn
const numberBtns = document.querySelectorAll('[data-number]');
const opreationBtns = document.querySelectorAll('[data-operation]')

// clearBtn and DeletBtn and equalsBtn
const allClearBtn = document.querySelector('[data-all-clear]')
const equalsBtn = document.querySelector('[data-equals]')
const deletBtn = document.querySelector('[data-delet]')

// Output Text-element
const currentOprentxtEle = document.querySelector('[data-current-operand]')
const prevOprentxtEle = document.querySelector('[data-prev-operand]')

// call a class by using new keyword
const calc = new Calculator(currentOprentxtEle, prevOprentxtEle);



/* 3) Add Event Listener for all method at the class : */

// number-Btns
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
})

// opreation-Btns
opreationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOpreation(button.innerText);
        calc.updateDisplay();
    })
})

// equals-Btn
equalsBtn.addEventListener('click', button => {
    calc.compute();
    calc.updateDisplay();
})

// allClear-Btn
allClearBtn.addEventListener('click', button => {
    calc.clear();
    calc.updateDisplay();
})

// delet-Btn
deletBtn.addEventListener('click', button => {
    calc.delet();
    calc.updateDisplay();
})