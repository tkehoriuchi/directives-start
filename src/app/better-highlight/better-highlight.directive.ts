import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultBackgroundColor: string = 'transparent';
  // one other option:
  // @Input('appBetterHighlight') highlightColor: string = 'darkblue';
  // in markup file:
  // <p [appBetterHighlight]="'pink'">
  @Input() highlightColor: string = 'darkblue';
  @Input() defaultFontColor: string = 'black';
  @Input() newFontColor: string = 'white';
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') fontColor: string = 'black';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // in general, it's better to manipulate the DOM via a "side door" like the renderer rather than directly
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'darkblue');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');

    this.backgroundColor = this.defaultBackgroundColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // TWO WAYS TO GO ABOUT THIS:
    // @HostBinding() method:
    this.backgroundColor = this.highlightColor;
    this.fontColor = this.newFontColor;

    // renderer method:
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'darkblue');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // SAME AS ABOVE
    this.backgroundColor = this.defaultBackgroundColor;
    this.fontColor = this.defaultFontColor;
    
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
  }
}

// NOTE:
// in a markup file, the '*' before *ngIf and *ngFor denotes a `structural directive`
// it's equivalent to this:
// <ng-template [ngIf]="condition"> ... </ng-template>