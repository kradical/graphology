/* eslint no-nested-ternary: 0 */
/**
 * Graphology Utilities
 * =====================
 *
 * Collection of helpful functions used by the implementation.
 */

/**
 * Very simple Object.assign-like function.
 *
 * @param  {object} [...objects] - Target objects.
 * @return {object}
 */
export function assign(...objects) {
  const o = objects[0];

  for (let i = 1, l = objects.length; i < l; i++) {
    for (const k in objects[i])
      o[k] = objects[i][k];
  }

  return o;
}

/**
 * Class emulating a Set object & used internally to reduce memory footprint &
 * ensure ES5 compatibility.
 *
 * @constructor
 */
export class BasicSet {
  constructor(values) {
    this.entries = {};

    if (values) {
      for (let i = 0, l = values.length; i < l; i++)
        this.entries[values[i]] = true;
    }
  }

  add(value) {
    this.entries[value] = true;
  }

  has(value) {
    return value in this.entries;
  }

  values() {
    return Object.keys(this.entries);
  }
}

/**
 * Checks whether the given value is a potential bunch.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
export function isBunch(value) {
  return (
    !!value &&
    typeof value === 'object' &&
    (
      (
        Array.isArray(value) ||
        (typeof Map === 'function' && value instanceof Map) ||
        (typeof Set === 'function' && value instanceof Set)
      ) ||
      (
        !(value instanceof Date) &&
        !(value instanceof RegExp)
      )
    )
  );
}

/**
 * Checks whether the given value is a plain object.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
export function isPlainObject(value) {
  return (
    !!value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp) &&
    !(typeof Map === 'function' && value instanceof Map) &&
    !(typeof Set === 'function' && value instanceof Set)
  );
}

/**
 * Iterates over the provided bunch.
 *
 * @param {object}   bunch    - Target bunch.
 * @param {function} callback - Function to call.
 */

// TODO: error management
// TODO: support ES6 Maps as attributes
export function overBunch(bunch, callback) {

  // Array
  if (Array.isArray(bunch)) {
    for (let i = 0, l = bunch.length; i < l; i++) {
      const shouldBreak = callback(null, bunch[i], {}) === false;

      if (shouldBreak)
        break;
    }
  }

  else if (typeof bunch.forEach === 'function') {
    for (const [k, v] of bunch.entries()) {
      let shouldBreak = false;

      if (v === k)
        shouldBreak = callback(null, v, {}) === false;
      else
        shouldBreak = callback(null, k, v) === false;

      if (shouldBreak)
        break;
    }
  }

  // Plain object
  else {
    for (const key in bunch) {
      const attributes = bunch[key];

      const shouldBreak = callback(null, key, attributes);

      if (shouldBreak)
        break;
    }
  }
}

/**
 * Pretty prints the given integer.
 *
 * @param  {number}  integer - Target integer.
 * @return {string}          - The pretty string.
 */
export function prettyPrint(integer) {
  const string = '' + integer;

  let prettyString = '';

  for (let i = 0, l = string.length; i < l; i++) {
    const j = l - i - 1;

    prettyString = string[j] + prettyString;

    if (!((i - 2) % 3))
      prettyString = ',' + prettyString;
  }

  return prettyString;
}

/**
 * Creates a "private" property for the given member name by concealing it
 * using the `enumerable` option.
 *
 * @param {object} target - Target object.
 * @param {string} name   - Member name.
 */
export function privateProperty(target, name, value) {
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: false,
    writable: true,
    value
  });
}


/**
 * Creates a read-only property for the given member name & the given getter.
 *
 * @param {object}   target - Target object.
 * @param {string}   name   - Member name.
 * @param {function} getter - The attached getter function.
 */
export function readOnlyProperty(target, name, getter) {
  Object.defineProperty(target, name, {
    enumerable: true,
    configurable: false,
    get: getter
  });
}

/**
 * Simple uuid v4 function.
 *
 * @return {string} - The uuid.
 */
export function uuid() {
  let id = '',
      random,
      i;

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += '-';
    }
    id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }

  return id;
}