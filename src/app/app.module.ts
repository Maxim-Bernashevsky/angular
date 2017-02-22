import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Calculator }    from './calc/calc.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
                  AppComponent,
                  Calculator
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
