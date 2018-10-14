import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XellotooltipDirective } from './xellotooltip.directive';
import { HoveredContent } from './Utility/Content.Component';

@NgModule({
  imports: [CommonModule],
  declarations: [HoveredContent,XellotooltipDirective],
  exports: [XellotooltipDirective],
  entryComponents: [HoveredContent]
})
export class XellotooltipModule { }
