import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[upperCaseOnly]'
})
export class upperCaseOnly {

  constructor(
    private el: ElementRef
  ) {
    el.nativeElement.style.textTransform = "uppercase";
   }

  @HostListener('keyup', ['$event']) onKeyUp(event) {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    event.target.value = event.target.value.toUpperCase();
    event.target.setSelectionRange(start, end);
  }
}