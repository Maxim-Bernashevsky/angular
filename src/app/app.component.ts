import { Component, trigger, keyframes, state, style, transition, animate } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { firebaseConfig }  from '../environments/firebase.config.js';

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
  todos: FirebaseListObservable<TODO[]>;
  stateInput: string = 'shakeStand';
  stateLabel: string = 'textBlack';
  itemObservable = this.af.database.object('/todos');

  constructor(private af: AngularFire){
    this.todos = af.database.list('/todos');
  }

  add(text: string) {
    this.todos.push({
        title: text,
        status: false
    });
  }

  toggle(todo: TODO){
    const key = todo['$key'];
    this.af.database.object('/todos/' + key).update({
      status: !todo.status
    });
  }

  remove(key: string){
    this.af.database.object('todos/' + key).remove();
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
  status: boolean;
}

