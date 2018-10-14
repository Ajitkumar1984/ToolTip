import { ContentOptions, Offset } from './Utility/options';
import { HoveredContent } from './Utility/Content.Component';
import { Directive,Inject, ComponentFactoryResolver,
          Input,Output, ElementRef, Renderer, 
          ViewContainerRef,ComponentRef, EventEmitter, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[Xellotooltip]'
})
export class XellotooltipDirective {

  @Output() beforeShow : EventEmitter<XellotooltipDirective> = new EventEmitter<XellotooltipDirective>();
    @Output() show : EventEmitter<XellotooltipDirective> = new EventEmitter<XellotooltipDirective>();
    @Output() beforeHide : EventEmitter<XellotooltipDirective> = new EventEmitter<XellotooltipDirective>();
    @Output() hide : EventEmitter<XellotooltipDirective> = new EventEmitter<XellotooltipDirective>();
    @Input()  public content: string;
    @Input()  public header: string;
    @Input()  public ngToolTipClass: string;
    @Input() tooltipDisplayOffset : Offset;
    /** set it to true, which will show tooltip on click */
    @Input() showOnClick:boolean = false;
    @Input() autoShowHide:boolean = true;

    private contentCmpRef : ComponentRef<HoveredContent>;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver,
                private _viewContainerRef:ViewContainerRef,
                private _renderer: Renderer,private eRef: ElementRef,
                @Inject(DOCUMENT) private _document:any) {
    }
   
    @HostListener('document:click', ['$event'])
    clickout(event){
     // alert("Hi");
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.class;
      if(idAttr){
        if(idAttr.nodeValue=='ng-tool-tip-content')
           {
            // alert(idAttr.nodeValue);
             return;
           }
      }
        if(this.eRef.nativeElement.contains(event.target)) {
          this.buildTooltip(event);
         } else {
          this.hideTooltip();          
         }      
       
    }

    public showTooltip(options:ContentOptions){
     // this.hide.emit(this);
     if(this.contentCmpRef==null){
      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(HoveredContent);
      this.contentCmpRef = this._viewContainerRef.createComponent(componentFactory);
      var before= this.beforeShow.emit(this);
     // alert(before);
      this._document.querySelector('body').appendChild(this.contentCmpRef.location.nativeElement);
      this.contentCmpRef.instance.options = options;
      this.show.emit(this);
      }
    }
    private buildTooltip(event:any){
      let options:ContentOptions = {
        content : this.content,
        cls : this.ngToolTipClass,
        x : event.clientX,
        y: event.clientY,
        offset : this.tooltipDisplayOffset,
        header:this.header
      };
      this.showTooltip(options);
    }

    public hideTooltip(){
      if(this.contentCmpRef){
        this.beforeHide.emit(this);
        this.contentCmpRef.destroy();
        this.hide.emit(this);
        this.contentCmpRef=null;
      }
    }
   

}
