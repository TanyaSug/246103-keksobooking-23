// import {getRandomNumberInclusive, getRandomNumberFloat} from './utils.js';
// // const initialCoordinates =  {
// //   lat: 35.68950,
// //   lng: 139.69171,
// // };
// const mockOffer = {
//   title: 'Три поросенка',
//   address: '',
//   price: '',
//   type: 'palace',
//   rooms: '',
//   guests: '',
//   checkin:[
//     '12:00',
//     '13:00',
//     '14:00',
//   ],
//   checkout:[
//     '12:00',
//     '13:00',
//     '14:00',
//   ],
//   features: [
//     'wifi',
//     'dishwasher',
//     'parking',
//     'washer',
//     'elevator',
//     'conditioner'],
//   description: 'Очень уютное и красивое место',
//   photos:  [
//     'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
//     'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
//     'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
//   ],
// };
//
// const lastCheckoutElementIndex = mockOffer.checkout.length -1;
// const lastCheckinElementIndex = mockOffer.checkin.length -1;
//
// const getAuthor = () => {
//   const randomAvatarIndex = getRandomNumberInclusive(1, 8);
//   const avatar = `img/avatars/user0${randomAvatarIndex}.png`;
//   return {
//     avatar,
//   };
// };
//
// const address = {
//   lat: getRandomNumberFloat(10.00000, 100.00000, 5),
//   lng: getRandomNumberFloat(10.00000, 100.00000, 5),
// };
//
// const getOffer = () => ({
//   title: mockOffer.title,
//   address: `${address.lat}, ${address.lng}`,
//   price: getRandomNumberInclusive(100, 1000),
//   type: mockOffer.type,
//   rooms: getRandomNumberInclusive(1, 5),
//   guests: getRandomNumberInclusive(1, 10),
//   checkin: mockOffer.checkin[getRandomNumberInclusive(0, lastCheckinElementIndex)],
//   checkout: mockOffer.checkout[getRandomNumberInclusive(0, lastCheckoutElementIndex)],
//   features: mockOffer.features,
//   description: mockOffer.description,
//   photos: mockOffer.photos,
// });
//
//
// const getLocation = () => ({
//   lat: getRandomNumberFloat(10.65000, 135.70000, 5),
//   lng: getRandomNumberFloat(10.70000, 139.80000, 5),
// });
//
// const getOfferTypes = () => ({
//   flat: 'Квартира',
//   bungalow: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец',
//   hotel: 'Отель',
// });
//
// export {getAuthor, getOffer, getLocation, getOfferTypes};
