import {initialCoordinates} from './data.js';

const map = L.map('map-canvas')
  .setView({
    lat: initialCoordinates.lat,
    lng: initialCoordinates.lng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createOfferMarker = () => {
};


// const formField =  document.querySelector('.ad-form');
// formField.addEventListener('submit', (evt) => {
//   createOfferMarker(evt);
//   formField.reset();
// });
export {createOfferMarker};
