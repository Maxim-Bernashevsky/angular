import { Component, trigger, keyframes, state, style, transition, animate } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],

  animations: [
    trigger('shakeInput', [
      state('shakeStand', style({transform: 'translateX(0)'})),
      state('shakeRight', style({transform: 'translateX(100px)'})),
      state('shakeLeft', style({transform: 'translateX(-100px)'})),
      transition('shakeStand <=> shakeRight', [
        animate('200ms ease-in')
      ]),

      transition('shakeLeft <=> shakeRight', [
        animate('200ms ease-in')
      ]),
      transition('shakeStand <=> shakeLeft', [
        animate('200ms ease-in')
      ]),
      /*state('shakeStand', style({transform: 'translateX(0)'})), */
      transition('void => *', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateY(-180px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(25px)', offset: .75}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1}),
        ]))
      ])
    ]),
    trigger('errText', [
      state('textBlack', style({color: 'black'})),
      state('textRed', style({color: 'red'})),
      transition('textBlack <=> textRed', [
        animate('300ms ease-in')
      ])
    ])
  ]

})

export class AppComponent  {
  todos: TODO[] = [];

  stateInput: string = 'shakeStand';
  stateLabel: string = 'textBlack';

  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  add(text: string) {
    let item: TODO = { title: text, completed: false };
    this.todos.push(item);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  toggle(todo: TODO){
    todo.completed = !todo.completed;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  remove(todo: TODO){
    let index = this.todos.indexOf(todo);
    if(index > -1){
      this.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }
  checkAdd(event: Event, text: string){
    event.preventDefault();
    if(text['match'](/[A-zА-я0-9]/)){
      this.add(text);
    }else {
      this.stateErrText();
      this.animateShakeInput();
    }
  }
  animateShakeInput() {
    let el = this;
    el.stateInput = 'shakeRight';

    setTimeout(function () {
      el.stateInput = 'shakeLeft';
    }, 100);
    setTimeout(function () {
      el.stateInput = 'shakeStand';
    }, 200);
  }
  stateErrText() {
    let el = this;
    el.stateLabel = 'textRed';
    setTimeout(function () {
      el.stateLabel = 'textBlack';
    }, 2000);
  }
}

interface TODO{
  title: string;
  completed: boolean;
}

