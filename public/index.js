
class Calculator {
    constructor(previousValueTextElement, currentValueTextElement) {
        this.previousValueTextElement = previousValueTextElement
        this.currentValueTextElement = currentValueTextElement
    }
    clear() {
        this.currentValue = ''
        this.previousValue = ''
        this.operation = ''
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) 
            return
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
    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }
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
