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

const OFFER = {
  title: 'Три поросенка',
  address: '',
  price: '',
  type: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ],
  rooms: '',
  guests: '',
  checkin:[
    '12:00',
    '13:00',
    '14:00',
  ],
  checkout:[
    '12:00',
    '13:00',
    '14:00',
  ],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'],
  description: 'Очень уютное и красивое место',
  photos:  [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const lastFeaturesElementIndex = OFFER.features.length - 1;
const lastPhotosElementIndex = OFFER.photos.length - 1;
const lastCheckoutElementIndex = OFFER.checkout.length -1;
const lastCheckinElementIndex = OFFER.checkin.length -1;
const lastTypeElementIndex = OFFER.type.length -1;

const getAuthor = () => {
  const randomAvatarIndex = getRandomNumberInclusive(1, 8);
  const avatar = `img/avatars/user0${randomAvatarIndex}.png`;
  return {
    avatar,
  };
};


const features = new Array(getRandomNumberInclusive(1, lastFeaturesElementIndex))
  .fill(null)
  .map(() => OFFER.features[getRandomNumberInclusive(0, lastFeaturesElementIndex)]);

const photos = new Array(getRandomNumberInclusive(1, lastPhotosElementIndex))
  .fill(null)
  .map(() => OFFER.photos[getRandomNumberInclusive(0, lastPhotosElementIndex)]);

const address = {
  lat: getRandomNumberFloat(10.00000, 100.00000, 5),
  lng: getRandomNumberFloat(10.00000, 100.00000, 5),
};

const getOffer = () => ({
  title: OFFER.title,
  address: `${address.lat}, ${address.lng}`,
  price: getRandomNumberInclusive(100, 1000),
  type: OFFER.type[getRandomNumberInclusive(0, lastTypeElementIndex)],
  rooms: getRandomNumberInclusive(1, 5),
  guests: getRandomNumberInclusive(1, 10),
  checkin: OFFER.checkin[getRandomNumberInclusive(0, lastCheckinElementIndex)],
  checkout: OFFER.checkout[getRandomNumberInclusive(0, lastCheckoutElementIndex)],
  features,
  description: OFFER.description,
  photos,
});


const getLocation = () => ({
  lat: getRandomNumberFloat(10.65000, 135.70000, 5),
  lng: getRandomNumberFloat(10.70000, 139.80000, 5),
});

getAuthor();
getOffer();
getLocation();
