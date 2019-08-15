import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

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
      /* Por alguna razón me daba que 11 % 11 = 11. Esto lo resuelve. */
      dv = resto === 11 ? '0' : (resto === 10 ? 'K' : resto.toString());
      return dv;
  }

  public validaRUN(run: number, dv: string) {
    const digito = this.getDV(run).toString();
    return String(digito).toUpperCase() === String(dv).toUpperCase();
  }

  public validaMail(mail: string): boolean {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  public encriptar(data: any) {
    try {
      const jss = JSON.stringify(data);
      return CryptoJS.AES.encrypt(jss, environment.encryptSecretKey).toString();
    } catch (e) {

    }
  }

  public desencriptar(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {

    }
  }

  public cargando(mostrar: boolean, mensaje?: string) {
    const cortina = document.getElementsByClassName('page-loader-wrapper').item(0) as HTMLElement;
    const mensajero = document.getElementById('msjeCargaApp') as HTMLElement;
    cortina.style.display = mostrar ? 'block' : 'none';
    if (mensaje !== undefined) {
      mensajero.innerHTML = mensaje;
    }
  }

  public precarga() {
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
    if (null == obj || 'object' !== typeof obj) {
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

  public order(obj: any, field: string, asc: boolean) {
    const typeOrder = asc ? [-1, 1] : [1, -1];
    return obj.sort((a, b) => {
      if ( a[field] < b[field] ) {
        return typeOrder[0];
      }
      if ( a[field] > b[field] ) {
        return typeOrder[1];
      }
      return 0;
    });
  }


  public arrayObjCompare(objA: any, objB: any) {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }

  public tiempoDiferencia(inicio: string, termino: string) {
    const ini = inicio.split(':');
    const fin = termino.split(':');
    const ini_h = parseInt(ini[0], 10);
    const ini_m = parseInt(ini[1], 10);
    const fin_h = parseInt(fin[0], 10);
    const fin_m = parseInt(fin[1], 10);
    const ini_x = moment().set({'hour': ini_h, 'minute': ini_m, 'seconds': 0, 'milliseconds': 0});
    const fin_x = moment().set({'hour': fin_h, 'minute': fin_m, 'seconds': 0, 'milliseconds': 0});
    const ms = moment.duration(fin_x.diff(ini_x)).as('ms');
    const tiempo = moment().set({'hour': 0, 'minute': 0, 'seconds': 0, 'milliseconds': ms}).format('HH:mm');
    return tiempo;
  }

  public tiempoSumar(primero: string, segundo: string) {
    return this._tiempoOperar(primero, segundo, 'sumar');
  }

  public tiempoRestar(primero: string, segundo: string) {
    return this._tiempoOperar(primero, segundo, 'restar');
  }

  public tiempoAcomular(primero: string, segundo: string) {
    const h = parseInt(primero.split(':')[0], 10);
    const m = parseInt(primero.split(':')[1], 10);
    const a = parseInt(segundo.split(':')[0], 10);
    const b = parseInt(segundo.split(':')[1], 10);

    let minutos = m + b;
    let horas = h + a;
    if (minutos > 60) {
      const hrs = Math.round(minutos / 60);
      horas += hrs;
      minutos -= hrs * 60;
    }
    return horas + ':' + this.padLeft(minutos, 1);
  }

  private _tiempoOperar(primero: string, segundo: string, accion: string) {
    const h = parseInt(primero.split(':')[0], 10);
    const m = parseInt(primero.split(':')[1], 10);
    const a = parseInt(segundo.split(':')[0], 10);
    const b = parseInt(segundo.split(':')[1], 10);
    const tiempo = moment().set({'hour': h, 'minute': m});
    switch (accion) {
      case 'sumar':
          tiempo.add(a, 'hours');
          tiempo.add(b, 'minute');
      break;
      case 'restar':
          tiempo.subtract(a, 'hours');
          tiempo.subtract(b, 'minute');
      break;
    }

    return tiempo.format('HH:mm');
  }

  public meses() {
    return ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  }

  public getDatesBetween(startDate, stopDate) {
      const dateArray = [];
      const currentDate = moment(startDate);
      while (currentDate.format('YYYY-MM-DD') <= moment(stopDate).format('YYYY-MM-DD')) {
          dateArray.push(currentDate.format('YYYY-MM-DD'));
          currentDate.add(1, 'days');
      }
      return dateArray;
  }

  public removeAccents(str: string): string {
    const ACCENTS = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    const NON_ACCENTS = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';

    const strAccents: string[] = str.split('');
    const strAccentsOut: string[] = new Array();

    const strAccentsLen: number = strAccents.length;

    for (let y = 0; y < strAccentsLen; y++) {
        if (ACCENTS.indexOf(strAccents[y]) !== -1) {
          strAccentsOut[y] = NON_ACCENTS.substr(ACCENTS.indexOf(strAccents[y]), 1);
        } else {
          strAccentsOut[y] = strAccents[y];
        }
    }

    const newString: string = strAccentsOut.join('');
    return newString;
  }

  public getCredencial() {
    const credencial = this.desencriptar(sessionStorage.getItem('credencial'));
    return credencial;
  }

}
