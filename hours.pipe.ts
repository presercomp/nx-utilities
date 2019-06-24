import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'hours'
})

export class HoursPipe implements PipeTransform {
    constructor(
        public dp: DatePipe
    ) {}
    transform(value: string, format: string): string {
        let d = new Date();
        const p = value.split(':');
        switch (p.length) {
        case 1:
            d.setHours(parseInt(p[0], 10));
            break;
        case 2:
            d.setHours(parseInt(p[0], 10));
            d.setMinutes(parseInt(p[1], 10));
            break;
        case 3:
            d.setHours(parseInt(p[0], 10));
            d.setMinutes(parseInt(p[1], 10));
            d.setSeconds(parseInt(p[2], 10));
            break;
        case 4:
            d.setHours(parseInt(p[0], 10));
            d.setMinutes(parseInt(p[1], 10));
            d.setSeconds(parseInt(p[2], 10));
            d.setMilliseconds(parseInt(p[3], 10));
            break;
        }
        return this.dp.transform(d, format);
    }
}
