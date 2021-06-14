function getRandomNumber (min, max) {
  if (max <= min) {
    throw Error('Minimum value must be less than maximum');
  }
  return Math.random() * (max - min + 1);
}

function getRandomNumberInclusive(min, max) {
  return Math.floor(getRandomNumber(min, max)) + min;
}

function getRandomNumberFloat(min, max, decimalNumbers) {
  const randomInt = getRandomNumber(min, max) + min;
  return randomInt.toFixed(decimalNumbers);
}

getRandomNumberInclusive(47, 240);
getRandomNumberFloat(30.75, 90.46, 2);

export {getRandomNumberInclusive, getRandomNumberFloat};
