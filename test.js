/*global require:false, describe:false, it:false*/
'use strict';

var assert = require('chai').assert,
    Quantity = require('./quantities');

describe('Quantity', function () {

  it('should instantiate properly without "new"', function () {
    var quantity = Quantity(101.101, Quantity.KG);
    assert.instanceOf(quantity, Quantity, 'is instance of Quantity');
  });

  it('should hold value and units', function () {
    var quantity = new Quantity(101.101, Quantity.KG);
    assert.equal(quantity.value, 101.101, 'correct value');
    assert.equal(quantity.units, Quantity.KG, 'correct units');
  });

  it('should throw error for unknown unit conversion', function () {
    assert.throws(function () {
        new Quantity(101, Quantity.KG).convertTo('foobar');
      },
      TypeError,
      /unknown units/i,
      'throws error when conversion to unknown units');
    assert.throws(function () {
        new Quantity(101, 'foobar').convertTo(Quantity.KG);
      },
      TypeError,
      /unknown units/i,
     'throws error when original has unknown units');
    assert.doesNotThrow(function () {
        new Quantity(101, 'foobar').convertTo('foobar');
      },
      'does not throw error when same unknown units converted');
  });

  function testConversion (srcQuantity, dstValue, dstUnits) {
    var quantity = srcQuantity.convertTo(dstUnits);
    assert.instanceOf(quantity, Quantity, 'is instance of Quantity');
    assert.equal(quantity.units, dstUnits, 'converted has ' + dstUnits + ' units');
    assert(Math.abs(quantity.value - dstValue) < 0.001,
        'converted to ' + dstUnits + ' correctly, actual: ' + quantity.value + ', expected: ' + dstValue);
  }

  describe('conversions', function () {

    it('should convert from kilograms to pounds', function () {
      testConversion(new Quantity(101, Quantity.KG), 222.667, Quantity.LB);
    });

    it('should convert from pounds to kilograms', function () {
      testConversion(new Quantity(222.667, Quantity.LB), 101, Quantity.KG);
    });

    it('should convert from mm to m', function () {
      testConversion(new Quantity(10100, Quantity.MM), 10.1, Quantity.M);
    });

    it('should convert from m to mm', function () {
      testConversion(new Quantity(10.1, Quantity.M), 10100, Quantity.MM);
    });

    it('should convert from cm to m', function () {
      testConversion(new Quantity(10100, Quantity.CM), 101, Quantity.M);
    });

    it('should convert from m to cm', function () {
      testConversion(new Quantity(101, Quantity.M), 10100, Quantity.CM);
    });

    it('should convert from cm to inches', function () {
      testConversion(new Quantity(256.54, Quantity.CM), 101, Quantity.IN);
    });

    it('should convert from inches to cm', function () {
      testConversion(new Quantity(101, Quantity.IN), 256.54, Quantity.CM);
    });

    it('should convert from mm to inches', function () {
      testConversion(new Quantity(256.54, Quantity.MM), 10.1, Quantity.IN);
    });

    it('should convert from inches to mm', function () {
      testConversion(new Quantity(10.1, Quantity.IN), 256.54, Quantity.MM);
    });

    it('should convert from m to inches', function () {
      testConversion(new Quantity(256.54, Quantity.M), 10100, Quantity.IN);
    });

    it('should convert from inches to m', function () {
      testConversion(new Quantity(10100, Quantity.IN), 256.54, Quantity.M);
    });

  });

  describe('conversions to same unit', function () {

    function testConversion(unit) {
      var quantity = new Quantity(101, unit);
      assert.deepEqual(quantity, quantity.convertTo(unit));
    }

    [ Quantity.KG, Quantity.LB, Quantity.M, Quantity.CM, Quantity.IN ].forEach(function (unit) {
      it('should convert from ' + unit + ' to ' + unit + ' and remain the same', function () {
        testConversion(unit);
      });
    });

  });

  describe('convert same quantity to different units', function () {
    var quantity = new Quantity(101, Quantity.M);

    it('should convert to cm', function () {
      testConversion(quantity, 10100, Quantity.CM);
    });

    it('should convert to mm', function () {
      testConversion(quantity, 101000, Quantity.MM);
    });

    it('should convert to inches', function () {
      testConversion(quantity, 3976.378, Quantity.IN);
    });

  });

});