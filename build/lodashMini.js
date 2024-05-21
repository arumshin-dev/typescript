"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the first element of `array`.
 *
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @see last
 * @example
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
function head(array) {
    return array != null && array.length ? array[0] : undefined;
}
//export default head;
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see has, hasPath, hasPathIn
 * @example
 *
 * const object = create({ 'a': create({ 'b': 2 }) })
 *
 * hasIn(object, 'a')
 * // => true
 *
 * hasIn(object, 'b')
 * // => false
 */
function hasIn(object, key) {
    return object != null && key in Object(object);
}
//export default hasIn;
const getTag_js_1 = __importDefault(require("./.internal/getTag.js"));
const isObjectLike_js_1 = __importDefault(require("./isObjectLike.js"));
/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
function isBoolean(value) {
    return (value === true ||
        value === false ||
        ((0, isObjectLike_js_1.default)(value) && (0, getTag_js_1.default)(value) === '[object Boolean]'));
}
//export default isBoolean;
const isSymbol_js_1 = __importDefault(require("./isSymbol.js"));
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
function toString(value) {
    if (value == null) {
        return '';
    }
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value === 'string') {
        return value;
    }
    if (Array.isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return `${value.map((other) => (other == null ? other : toString(other)))}`;
    }
    if ((0, isSymbol_js_1.default)(value)) {
        return value.toString();
    }
    const result = `${value}`;
    return result === '0' && 1 / value === -INFINITY ? '-0' : result;
}
//export default toString;
const castSlice_js_1 = __importDefault(require("./.internal/castSlice.js"));
const hasUnicode_js_1 = __importDefault(require("./.internal/hasUnicode.js"));
const isRegExp_js_1 = __importDefault(require("./isRegExp.js"));
const stringToArray_js_1 = __importDefault(require("./.internal/stringToArray.js"));
/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;
/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * split('a-b-c', '-', 2)
 * // => ['a', 'b']
 */
function split(string, separator, limit) {
    limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
    if (!limit) {
        return [];
    }
    if (string && (typeof separator === 'string' || (separator != null && !(0, isRegExp_js_1.default)(separator)))) {
        if (!separator && (0, hasUnicode_js_1.default)(string)) {
            return (0, castSlice_js_1.default)((0, stringToArray_js_1.default)(string), 0, limit);
        }
    }
    return string.split(separator, limit);
}
//export default split;
const castPath_js_1 = __importDefault(require("./.internal/castPath.js"));
const isArguments_js_1 = __importDefault(require("./isArguments.js"));
const isIndex_js_1 = __importDefault(require("./.internal/isIndex.js"));
const isLength_js_1 = __importDefault(require("./isLength.js"));
const toKey_js_1 = __importDefault(require("./.internal/toKey.js"));
/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Checks if `path` is a direct property of `object`.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPath(object, 'a.b')
 * // => true
 *
 * hasPath(object, ['a', 'b'])
 * // => true
 */
function hasPath(object, path) {
    path = (0, castPath_js_1.default)(path, object);
    let index = -1;
    let { length } = path;
    let result = false;
    let key;
    while (++index < length) {
        key = (0, toKey_js_1.default)(path[index]);
        if (!(result = object != null && hasOwnProperty.call(object, key))) {
            break;
        }
        object = object[key];
    }
    if (result || ++index !== length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return (!!length &&
        (0, isLength_js_1.default)(length) &&
        (0, isIndex_js_1.default)(key, length) &&
        (Array.isArray(object) || (0, isArguments_js_1.default)(object)));
}
//export default hasPath;
/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * filter(users, ({ active }) => active)
 * // => objects for ['barney']
 */
function filter(array, predicate) {
    let index = -1;
    let resIndex = 0;
    const length = array == null ? 0 : array.length;
    const result = [];
    while (++index < length) {
        const value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}
//export default filter;
/**
 * Checks if `predicate` returns truthy for **all** elements of `array`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * **Note:** This method returns `true` for
 * [empty arrays](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty arrays.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * every([true, 1, null, 'yes'], Boolean)
 * // => false
 */
function every(array, predicate) {
    let index = -1;
    const length = array == null ? 0 : array.length;
    while (++index < length) {
        if (!predicate(array[index], index, array)) {
            return false;
        }
    }
    return true;
}
//export default every;
/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */
function map(array, iteratee) {
    let index = -1;
    const length = array == null ? 0 : array.length;
    const result = new Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
//export default map;
exports.default = {
    head,
    hasIn,
    isBoolean,
    toString,
    split,
    hasPath,
    filter,
    every,
    map,
};
