import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { AngularFireModule }  from  'angularfire2';
import { firebaseConfig }     from '../environments/firebase.config.js';

import { AppComponent }  from './app.component';
import { Calculator }    from './calc/calc.component';



@NgModule({
  imports:      [ BrowserModule,
                  AngularFireModule.initializeApp(firebaseConfig)
                ],
  declarations: [
                  AppComponent,
                  Calculator
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


