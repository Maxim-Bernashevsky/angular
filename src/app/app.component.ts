import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],

  animations: [
    trigger('shakeInput', [
      state('animationFirst', style({transform: 'translateX(0)'})),
      state('animationSecond', style({transform: 'translateX(100px)'})),
      state('animationThree', style({transform: 'translateX(-100px)'})),
      transition('animationFirst <=> animationSecond', [
        animate('200ms ease-in')
      ]),
      transition('animationThree <=> animationSecond', [
        animate('200ms ease-in')
      ]),
      transition('animationFirst <=> animationThree', [
        animate('200ms ease-in')
      ]),
    ]),
    trigger('errText', [
      state('errF', style({color: 'black'})),
      state('errS', style({color: 'red'})),
      transition('errF <=> errS', [
        animate('200ms ease-in')
      ])
    ])
  ]

})

export class AppComponent  {
  todos: TODO[] = [];

  stateInput: string = 'animationFirst';
  stateLabel: string = 'errF';

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
      this.stateInputFoo();
      //this.emptyInput();
    }
  }
  stateInputFoo() {
    let el = this;
    el.stateInput = 'animationSecond';

    setTimeout(function () {
      el.stateInput = 'animationThree';
    }, 100);
    setTimeout(function () {
      el.stateInput = 'animationFirst';
    }, 200);
  }

  stateErrText() {
    let el = this;
    el.stateLabel = 'errS';

    setTimeout(function () {
      el.stateLabel = 'errF';
    }, 2000);
  }

  emptyInput(){
    document.getElementById("labelNewTask").innerText = "Заполните текст инпута";

    setTimeout(function () {
      document.getElementById("labelNewTask").innerText = "Предстоит сделать";
    }, 2000);
  }
}

interface TODO{
  title: string;
  completed: boolean;
}

