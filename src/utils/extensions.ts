interface Number {
    padZero(length: number) : string;
    toCurrency(symbol: string, locale?: string): string;
    toPhoneNumber(): string;
}

interface String {
    padZero(length: number) : string;
    toTitleCase(): string;
}


String.prototype.padZero = function(length: number): string {
    var s: string = String(this);
    while(s.length < length) {
        s = '0' + s;
    }
    return s;
}

// Convert text to Title Case format
String.prototype.toTitleCase = function() : string {
    let str = this;
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

Number.prototype.padZero = function(length: number) : string {
    return String(this).padZero(length);
}

Number.prototype.toCurrency = function(symbol: string, locale?: string): string {
    locale = locale === undefined || locale == null ? 'es-CL' : locale;
    return symbol + this.toLocaleString(locale);
}

Number.prototype.toPhoneNumber = function(): string {
    return this.toLocaleString('es-CL').replace('.', ' ');
}