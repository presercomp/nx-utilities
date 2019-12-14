import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[dvOnly]'
})
export class dvOnly {

    constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent> event;
        let allowKeys =[] 
        const arrows = [37, 38, 39, 40];
        const numberAlpha = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        const numberPad = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
        const specials = [8, 46]; 
        const key = [75];
        allowKeys = allowKeys.concat(arrows, numberAlpha, numberPad, specials, key).sort((a, b) => a - b);        
        if (e.shiftKey || allowKeys.indexOf(e.keyCode) == -1) {
            e.preventDefault();
        }
    }
}