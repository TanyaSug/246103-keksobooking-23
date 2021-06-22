import {getRandomNumberInclusive, getRandomNumberFloat} from './utils.js';

const OFFER = {
  title: 'Три поросенка',
  address: '',
  price: '',
  type: 'palace',
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

const lastCheckoutElementIndex = OFFER.checkout.length -1;
const lastCheckinElementIndex = OFFER.checkin.length -1;

const getAuthor = () => {
  const randomAvatarIndex = getRandomNumberInclusive(1, 8);
  const avatar = `img/avatars/user0${randomAvatarIndex}.png`;
  return {
    avatar,
  };
};

const address = {
  lat: getRandomNumberFloat(10.00000, 100.00000, 5),
  lng: getRandomNumberFloat(10.00000, 100.00000, 5),
};

const getOffer = () => ({
  title: OFFER.title,
  address: `${address.lat}, ${address.lng}`,
  price: getRandomNumberInclusive(100, 1000),
  type: OFFER.type,
  rooms: getRandomNumberInclusive(1, 5),
  guests: getRandomNumberInclusive(1, 10),
  checkin: OFFER.checkin[getRandomNumberInclusive(0, lastCheckinElementIndex)],
  checkout: OFFER.checkout[getRandomNumberInclusive(0, lastCheckoutElementIndex)],
  features: OFFER.features,
  description: OFFER.description,
  photos: OFFER.photos,
});


const getLocation = () => ({
  lat: getRandomNumberFloat(10.65000, 135.70000, 5),
  lng: getRandomNumberFloat(10.70000, 139.80000, 5),
});

const getOfferTypes = () => ({
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
});

export {getAuthor, getOffer, getLocation, getOfferTypes};
