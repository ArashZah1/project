
class Calculator {
    constructor(previousValueTextElement, currentValueTextElement) {
        this.previousValueTextElement = previousValueTextElement
        //this line allows the previous operation to be stored into the top display, waiting for the next input to calculate.
        this.currentValueTextElement = currentValueTextElement
        this.clear()
    }
//  this line allows the previous operation to be stored into the top display, waiting for the next input to calculate. WHile the other line shows the current button being pressed.
    clear() {
        this.currentValue = ''
        this.previousValue = ''
        // this.operation = undefined
    }
//clear previous and current value and operation leads to new value
    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }
//delete button deletes first number on right side
    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) 
            return
//adds number to the screen that user chose
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentValue === '') 
            return
        if(this.previousValue !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousValue = this.currentValue
        this.currentValue = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if(isNaN(prev) || isNaN(current)) 
        return 
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break   
            default:
                return      
         }
        this.currentValue = computation
        this.operation = undefined
        this.previousValue = ''
    }
    //depending on the case, sets each value to run the operation and return the computation value to be the current value. We are also converting the numbers that are returned as strings back to numbers using the parsefloat method and checking the previous and current values are
    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }
    //converts number to display
    updateScreen() {
        this.currentValueTextElement.innerText = 
        this.getDisplayNumber(this.currentValue)
        if (this.operation != null) {
            this.previousValueTextElement.innerText = 
            `${this.getDisplayNumber(this.previousValue)} ${this.operation}`
        } else {
            this.previousValueTextElement.innerText = ''
        }
    }
}
const allClearButton = document.querySelector('[data-all-clear]')
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const numberButtons = document.querySelectorAll('[data-number]')
const previousValueTextElement = document.querySelector('[data-previous-value]')
const currentValueTextElement = document.querySelector('[data-current-value]')

const calculator = new Calculator (previousValueTextElement, currentValueTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateScreen()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateScreen()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateScreen()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateScreen()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateScreen()
})
