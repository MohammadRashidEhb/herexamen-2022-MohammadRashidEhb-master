"use strict";

export default class Klasse {
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
      return this._timestamp;
    }

    get date () {
      return this._timestamp;
    }


    get htmlString() {

        return `
          <thead>
            <tr><th>${this._unit}</th><th>${this._value}</th><th>${this._timestamp}</th></tr>
          </thead>
          <tbody id="measurements">
          </tbody>
        </table>
      </div>`
    }
}