function getRandomNumber (min, max) {
  if (max <= min) {
    throw Error('Minimum value must be less than maximum');
  }
  return Math.random() * (max - min + 1);  // Reference: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

function getRandomNumberInclusive(min, max) {
  return Math.floor(getRandomNumber(min, max)) + min;  // Reference: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
}

function getRandomNumberFloat(min, max, decimalNumbers) {
  const randomInt = getRandomNumber(min, max) + min;
  return randomInt.toFixed(decimalNumbers);  // Reference: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
}

getRandomNumberInclusive(47, 240);
getRandomNumberFloat(30.75, 90.46, 2);

