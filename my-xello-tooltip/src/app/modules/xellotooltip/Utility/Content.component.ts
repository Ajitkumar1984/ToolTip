import { ContentOptions } from './Options'
import { Component,AfterContentChecked , ElementRef, HostListener } from '@angular/core';
@Component({
  templateUrl:'./content.component.html',
styles : [`
        .ng-tool-tip-content{
                z-index : 10;
                padding: 2px;
                border: 1px solid #DDD;
                color: #333;
                background-color: #FFF;
                position: absolute;  
                visibility: visible;
            }
          `]           
})

export class HoveredContent implements AfterContentChecked{

    private _options : ContentOptions;

    constructor(private elRef:ElementRef){

    }

    set options(op : ContentOptions){
        this._options = op;
    }

    get options():ContentOptions{
        return this._options;
    }

  ngAfterContentChecked(){
    let toolTipWidth:number = this.elRef.nativeElement.querySelector('div.ng-tool-tip-content').offsetWidth;
    if(window.innerWidth < (toolTipWidth+this.options.x)){
      this.options.x = this.options.x - toolTipWidth;
    }
    if(this.options.offset && this.options.offset.x){
        this.options.x +=this.options.offset.x
    }
    if(this.options.offset && this.options.offset.y){
        this.options.y +=this.options.offset.y
    }
  }
  @HostListener('click', ['$event'])
  clickout(event){
   return;   
     
  }

}