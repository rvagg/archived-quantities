/*global require:false, module:false, define:false*/
'use strict';

//-----------------------------------------------------------------------------//
// Quantities: Physical quantity representation and conversion
// (c) Rod Vagg (@rvagg) 2013
// https://github.com/rvagg/quantities
// License: MIT
//-----------------------------------------------------------------------------//

// Boilerplate for browser stand-alone, CommonJS and AMD use
(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) {
    module.exports = definition();
  } else if (typeof define == 'function' && define.amd) {
    define(definition);
  } else {
    context[name] = definition();
  }
})('Quantity', this, function () {

//-----------------------------------------------------------------------------//
// Quantity                                                                    //
//-----------------------------------------------------------------------------//

  function Quantity (value, units) {
    if (!(this instanceof Quantity)) {
      return new Quantity(value, units);
    }
    this.value = value;
    this.units = units;
  }

  Quantity.MM = 'mm';
  Quantity.CM = 'cm';
  Quantity.M = 'm';
  Quantity.IN = 'inches';
  Quantity.KG = 'kg';
  Quantity.LB = 'lb';

  var toInternalUnits = { };
  toInternalUnits[Quantity.LB] = 45359237 / 100000000;
  toInternalUnits[Quantity.KG] = 1;
  toInternalUnits[Quantity.MM] = 0.001;
  toInternalUnits[Quantity.CM] = 0.01;
  toInternalUnits[Quantity.M] = 1;
  toInternalUnits[Quantity.IN] = 25.4 / 1000;

  Quantity.prototype.convertTo = function (units) {
    if (this.units == units) {
      return this;
    }
    
    if (!toInternalUnits[this.units] || !toInternalUnits[units]) {
      throw new TypeError('Unknown units: ' + this.units + ' to ' + units);
    }

    //TODO: check for conversion from weight to length and throw

    if (typeof this._internalUnits != 'number') {
      this._internalUnits = this.value * toInternalUnits[this.units];
    }

    return new Quantity(this._internalUnits * (1 / toInternalUnits[units]), units);
  };

//-----------------------------------------------------------------------------//

  return Quantity;
});
