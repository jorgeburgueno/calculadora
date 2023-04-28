class Calculadora {
    constructor (valorPrevioTextElement, valorActualTextElement){
        this.valorPrevioTextElement = valorPrevioTextElement
        this.valorActualTextElement = valorActualTextElement
        this.clear()
        
    }
    clear() {
      this.valorActual = ''
      this.valorPrevio = ''
      this.operacion = undefined

    }
    

    delete() {
      this.valorActual = this.valorActual.toString().slice(0,-1)

    }

    appendNumber(numero) {
      if (numero === '.' && this.valorActual.includes('.')) return
      this.valorActual = this.valorActual.toString() + numero.toString()

    }

    chooseOperation(operacion) {
      if (this.valorActual === '') return
      if (this.valorPrevio !== '') {
        this.compute()
      }
      this.operacion = operacion
      this.valorPrevio = this.valorActual
      this.valorActual = ''
    }

    compute() {
      let computacion
      const prev = parseFloat(this.valorPrevio)
      const current = parseFloat(this.valorActual)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operacion) {
        case '+':
          computacion = prev + current
          break
        case '-':
          computacion = prev - current
          break
        case '*':
          computacion = prev * current
          break
        case '/':
          computacion = prev / current
          break
        default:
          return  
      }
      this.valorActual = computacion
      this.operacion = undefined
      this.valorPrevio = ''

    }

    getDisplayNumber(numero){
      const stringNumber = numero.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)){
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0})
      } 
      if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }

    updateDisplay(){
      this.valorActualTextElement.innerText = 
        this.getDisplayNumber(this.valorActual)
      if (this.operacion != null){
        this.valorPrevioTextElement.innerText = 
          `${this.getDisplayNumber(this.valorPrevio)} ${this.operacion}`
      } else {
        this.valorPrevioTextElement.innerText = ''
      }
      
    }

}

const numeroButton = document.querySelectorAll('[data-numero]')
const operacionButton = document.querySelectorAll('[data-operacion]')
const igualButton = document.querySelector('[data-igual]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const valorPrevioTextElement = document.querySelector('[data-valor-previo]')
const valorActualTextElement = document.querySelector ('[data-valor-actual]')

const calculador = new Calculadora (valorPrevioTextElement, valorActualTextElement)

numeroButton.forEach(button => {
  button.addEventListener('click', () => {
    calculador.appendNumber(button.innerText)
    calculador.updateDisplay()
  })
})

operacionButton.forEach(button => {
  button.addEventListener('click', () => {
    calculador.chooseOperation(button.innerText)
    calculador.updateDisplay()
  })
})

igualButton.addEventListener('click', button => {
  calculador.compute()
  calculador.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculador.clear()
  calculador.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculador.delete()
  calculador.updateDisplay()
})