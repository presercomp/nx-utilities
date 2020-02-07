import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[enterAsTab]'
})
export class enterAsTab {

    constructor(private el: ElementRef) {}

    @HostListener('keypress', ['$event']) onKeyPress(event) {
        let e = <KeyboardEvent> event;              
        if (e.keyCode == 13) {
            e.preventDefault();
            var universe = document.querySelectorAll('input, button, select, textarea, a[href]');
            var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
            var index = list.indexOf(document.activeElement);
            var next = list[index + 1] || list[0];
            next.focus();
            next.select();            
        }
    }
}