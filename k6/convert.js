/**
 * convertBaseCharacter
 * @param {Number} target Any number in base 10
 * @param {String, Array} characterSet A string consisting of characters.
 * The length of the character set determines the base of the output.
 * @param {Number} padTo Any number, representing the place the output
 * will be padded to with the zeroth character
 * @returns {String} A string expressing the number with the given character set
 */

module.exports = function(target, characterSet = [], padTo = 0) {
  if (characterSet.length === 0) {
    return target;
  }

  const base = characterSet.length;
  let result = '';
  let divisor = target;
  let mod = 0;

  while (divisor >= base) {
    mod = divisor % base;
    divisor = Math.trunc(divisor / base);
    result = characterSet[mod] + result;
  }

  result = characterSet[divisor] + result;

  while (result.length < padTo) {
    result = characterSet[0] + result;
  }

  return result;
};