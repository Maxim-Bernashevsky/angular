import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent  {
  todos: TODO[] = [];

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
      this.emptyInput();
    }
  }
  emptyInput(){
    document.getElementById("newTask").classList.add("empty");
    document.getElementById("labelNewTask").innerText = "Заполните текст инпута";
    document.getElementById("labelNewTask").style.color = "red";
    setTimeout(function () {
      document.getElementById("newTask").classList.remove("empty");
    }, 300);
    setTimeout(function () {
      document.getElementById("labelNewTask").innerText = "Предстоит сделать";
      document.getElementById("labelNewTask").style.color = "";
    }, 2000);
  }
}

interface TODO{
  title: string;
  completed: boolean;
}

