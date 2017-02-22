import {Component, HostListener} from '@angular/core';

enum BUTTONS {
  AC,
  NEGATE,
  PERCENT,
  DIVIDE,
  SEVEN,
  EIGHT,
  NINE,
  MULTIPLY,
  FOUR,
  FIVE,
  SIX,
  SUBTRACT,
  ONE,
  TWO,
  THREE,
  ADDITION,
  SETTINGS,
  ZERO,
  PERIOD,
  EQUAL
}

@Component({
  selector: 'calculator',
  templateUrl: 'app/calc/calc.component.html',
  styleUrls: ['app/calc/calc.component.css']
})
export class Calculator {
  displayText:string = '0';
  BUTTONS = BUTTONS;
  operator:BUTTONS = null; //Desired operator and used for computing the equals button
  selectedOperator:BUTTONS = null; //This is the operator that the user has selected but not confirm
  firstOperand: number = null;
  secondOperand: number = null;
  hasProcessedEqual: boolean = false;

  onClick(event:any, button:BUTTONS) {
    this.processButton(button);
  }

  @HostListener('window:keypress', ['$event'])
  onKeyUp(event:any) {
    let buttonPressed:BUTTONS;
    switch(event.key) {
      case "0":
        buttonPressed = BUTTONS.ZERO;
        break;
      case "1":
        buttonPressed = BUTTONS.ONE;
        break;
      case "2":
        buttonPressed = BUTTONS.TWO;
        break;
      case "3":
        buttonPressed = BUTTONS.THREE;
        break;
      case "4":
        buttonPressed = BUTTONS.FOUR;
        break;
      case "5":
        buttonPressed = BUTTONS.FIVE;
        break;
      case "6":
        buttonPressed = BUTTONS.SIX;
        break;
      case "7":
        buttonPressed = BUTTONS.SEVEN;
        break;
      case "8":
        buttonPressed = BUTTONS.EIGHT;
        break;
      case "9":
        buttonPressed = BUTTONS.NINE;
        break;
      case ".":
        buttonPressed = BUTTONS.PERIOD;
        break;
      default:

    }
    this.processButton(buttonPressed);
  }

  allClear() {
    this.displayText = '0';
    this.selectedOperator = null;
    this.selectedOperator = null;
    this.firstOperand = null;
    this.secondOperand = null;
  }

  processButton(button:BUTTONS) {
    switch(button) {
      case BUTTONS.AC:
        this.allClear();
        break;
      case BUTTONS.DIVIDE:
        if(this.secondOperand != null && !this.hasProcessedEqual) this.processEqual();
        this.selectedOperator = BUTTONS.DIVIDE;
        break;
      case BUTTONS.MULTIPLY:
        if(this.secondOperand != null && !this.hasProcessedEqual) this.processEqual();
        this.selectedOperator = BUTTONS.MULTIPLY;
        break;
      case BUTTONS.SUBTRACT:
        if(this.secondOperand != null && !this.hasProcessedEqual) this.processEqual();
        this.selectedOperator = BUTTONS.SUBTRACT;
        break;
      case BUTTONS.ADDITION:
        if(this.secondOperand != null && !this.hasProcessedEqual) this.processEqual();
        this.selectedOperator = BUTTONS.ADDITION;
        break;
      case BUTTONS.EQUAL:
        this.processEqual();
        break;
      default:
        this.processNumber(button);
    }
  }

  processEqual() {
    switch(this.operator) {
      case BUTTONS.ADDITION:
        this.displayText = String(this.firstOperand + this.secondOperand);
        break;
      case BUTTONS.SUBTRACT:
        this.displayText = String(this.firstOperand - this.secondOperand);
        break;
      case BUTTONS.MULTIPLY:
        this.displayText = String(this.firstOperand * this.secondOperand);
        break;
      case BUTTONS.DIVIDE:
        this.displayText = String(this.firstOperand / this.secondOperand);
        break;
      default:
    }
    this.firstOperand = Number(this.displayText);
    this.hasProcessedEqual = true;
  }

  processNumber(button:BUTTONS) {
    if(this.displayText == '0' || this.selectedOperator != null || this.hasProcessedEqual) {
      this.displayText = '';
      this.operator = this.selectedOperator;
      this.selectedOperator = null;
      this.hasProcessedEqual = false;
    }
    if(this.displayText.length < 15) {
      switch(button) {
        case BUTTONS.NEGATE:
          let operand:number = -1*Number(this.displayText);
          this.displayText = String(operand);
          break;
        case BUTTONS.PERCENT:
          if(this.displayText != '' || this.displayText != '0.') {
            let operand:number = Number(this.displayText) / 100;
            this.displayText = String(operand);
          }
          break;
        case BUTTONS.PERIOD:
          if(!this.displayText.includes('.')) {
            if(this.displayText == '') {
              this.displayText += '0.';
            }
            else {
              this.displayText += '.';
            }
          }
          break;
        case BUTTONS.ZERO:
          this.displayText += '0';
          break;
        case BUTTONS.ONE:
          this.displayText += '1';
          break;
        case BUTTONS.TWO:
          this.displayText += '2';
          break;
        case BUTTONS.THREE:
          this.displayText += '3';
          break;
        case BUTTONS.FOUR:
          this.displayText += '4';
          break;
        case BUTTONS.FIVE:
          this.displayText += '5';
          break;
        case BUTTONS.SIX:
          this.displayText += '6';
          break;
        case BUTTONS.SEVEN:
          this.displayText += '7';
          break;
        case BUTTONS.EIGHT:
          this.displayText += '8';
          break;
        case BUTTONS.NINE:
          this.displayText += '9';
          break;
        default:
      }
    }
    if(this.operator == null) {
      this.firstOperand = Number(this.displayText);
    }
    else {
      this.secondOperand = Number(this.displayText);
    }
  }
}
