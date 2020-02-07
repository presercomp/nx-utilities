import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[lowerCaseOnly]'
})
export class lowerCaseOnly {

  constructor(
    private el: ElementRef
  ) { 
    el.nativeElement.style.textTransform = "lowercase";
  }

  @HostListener('keyup', ['$event']) onKeyUp(event) {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    event.target.value = event.target.value.toLowerCase();
    event.target.setSelectionRange(start, end);    
  }
}
