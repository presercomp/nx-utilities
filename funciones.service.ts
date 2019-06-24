import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor() { }

  public encrypt(data: any) {
    try {
      const jss = JSON.stringify(data);
      return CryptoJS.AES.encrypt(jss, environment.encryptSecretKey).toString();
    } catch (e) {
      
    }
  }

  public decrypt(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      
    }
  }

  public loading(mostrar: boolean, mensaje?: string) {
    const cortina = document.getElementsByClassName('page-loader-wrapper').item(0) as HTMLElement;
    const mensajero = document.getElementById('msjeCargaApp') as HTMLElement;
    cortina.style.display = mostrar ? 'block' : 'none';
    if (mensaje !== undefined) {
      mensajero.innerHTML = mensaje;
    }
  }

  public preload() {
    const cortina = document.getElementsByClassName('page-loader-wrapper').item(0) as HTMLElement;
    const mensajero = document.getElementById('msjeCargaApp') as HTMLElement;
    cortina.style.display = 'block';
    mensajero.innerHTML = 'Procesando datos...';
  }

  public padLeft(value: any, zeros: number) {
    return (value.toString().length < zeros) ? this.padLeft('0' + value, zeros) : value;
  }

  public by = function (attr, menor) {
    return function (o, p) {
        let a, b;

        if (typeof o === 'object' && typeof p === 'object' && o && p ) {
          a = o[attr].trim();
          b = p[attr].trim();
          if (a === b ) {
            return typeof menor === 'function' ? menor(o, p) : 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        } else {
          throw{
              name : 'Error',
              message : 'Esto no es un objeto, al menos no tiene la propiedad ' + attr
          };
        }
    };
  };

  public groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  public clone(obj: any) {
    if (null == obj || 'object' !== typeof obj) {
      return obj;
    }
    const copy = obj.constructor();
    for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = obj[attr];
        }
    }
    return copy;
  }

  public deepClone(obj: any) {
    let copy: any;
    if (null == obj || "object" !== typeof obj) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.deepClone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
              copy[attr] = this.deepClone(obj[attr]);
            }
        }
        return copy;
    }
    throw new Error('Imposible copiar objeto. El tipo no está soportado');
  }

  public arrayObjCompare(objA: any, objB: any) {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }

}

export class RUN {

  constructor() {}

  public getDV(run: number) {
    let factor = 2;
    let suma = 0;
    const rut = String(run);
    for (let i = rut.length - 1; i >= 0; i--) {
        suma += factor * parseInt(rut[i], 10);
        factor = factor % 7 === 0 ? 2 : factor + 1;
    }
    const resto = 11 - suma % 11;
    let dv: string;    
    dv = resto === 11 ? '0' : (resto === 10 ? 'K' : resto.toString());
    return dv;
}

public validate(run: number, dv: string) {
  const digito = this.getDV(run).toString();
  return String(digito).toUpperCase() === String(dv).toUpperCase();
}
}
