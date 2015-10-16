/// <reference path="../typings/tsd.d.ts" />
import _ from '_'

export const type = {
  array: _.isArray,
  boolean: _.isBoolean,
  function: _.isFunction,
  number: _.isNumber,
  object: _.isPlainObject,
  string: _.isString,
  instanceOf: a => _ => _ instanceof a,
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  not: _ => !_
}