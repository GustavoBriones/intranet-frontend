import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'appFoco'
})
export class FocoDirective implements AfterViewInit {

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    console.log('cargo?');
    this.element.nativeElement.focus();
  }
}
