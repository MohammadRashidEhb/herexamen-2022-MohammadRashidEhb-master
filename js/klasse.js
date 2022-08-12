"use strict";

export class Klasse {
    constructor(value, unit, timestamp) {
        this._value = value;
        this._unit = unit;
        this._timestamp = timestamp;
    }

    get unit () {
      return this._unit;
    }

    get value() {
      return this._value;
    }

    get time () {
      return this._timestamp.toLocaleString("nl-BE");
    }

    get date () {
      return this.toLocaleDateString("nl-BE");
    }


    get htmlString() {
        return `
          <thead>
            <tr><th>${this._unit}</th>
            <th>${this._value}</th>
            <th>${this.time}</th></tr>
          </thead>`;
    }
}