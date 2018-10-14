import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XellotooltipDirective } from './modules/xellotooltip/xellotooltip.directive';
import { XellotooltipModule } from './modules/xellotooltip/xellotooltip.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,XellotooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
