/* eslint-disable */
// import {createNewCard} from './card.js';

const getUserOffers = () => fetch(
  'https://23.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .catch((err) => {
    console.log(err);
  });

export {getUserOffers};
