# Quantities

[![Build Status](https://secure.travis-ci.org/rvagg/quantities.png)](http://travis-ci.org/rvagg/quantities)

**A super-simple JavaScript library for physical quantity representation and conversion**

Can be used in the browser or in Node. Compatible with browser stand-alone, CommonJS and AMD.

## API

### Quantity(value, units)

Create a new `Quantity` object to hold `value` and `units`.

```js
var kg101 = new Quantity(101, Quantity.KG);
var lb202 = Quantity(202, Quantity.LB); // will do an implicit 'new' for you

kg101.value === 101;
lb202.value === 202;
kg101.units === 'kg' === Quantity.KG;
lb202.units === 'lb' === Quantity.LB;
```

Units available are:

```js
Quantity.KG // kilograms
Quantity.LB // pounds
Quantity.MM // millimetres 
Quantity.CM // centimetres
Quantity.M  // metres
Quantity.IN // inches
```

### Quantity#convertTo(units)

Convert a `Quantity` object to another `Quantity` object of specified `units.

```js
var lb = new Quantity(101, Quantity.KG).convertTo(Quantity.LB);

lb.value === 222.667; // approx
lb.units === 'lb';
```

## License

**Quantities** is Copyright (c) 2013 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.


***Note about style:*** *this project is far from my normal coding style; it's roughly equivalent to "Crockford-style". It also uses Mocha, Chai and Istanbul which I also don't normally use. But it is my code! This project is for experimentation and teaching.*