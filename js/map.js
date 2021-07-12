import {toggleFormsCondition, initialCoordinates} from './user-form.js';
import {createNewCard} from './card.js';
// import {initialCoordinates} from './user-form.js';

export let map;

export const createOfferMarker = (mainPinMarker) => {
  const offerPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const offerPinMarker = L.marker(

    mainPinMarker.getLatLng(),
    {
      icon: offerPinIcon,
    },
  );
  offerPinMarker
    .addTo(map)
    .bindPopup(createNewCard(),
      {
        keepInView: true,
      },
    );
};

export const initMap = (canvas, mainPinMarker) => {
  map = L.map(canvas)
    .on('load', () => {
      setTimeout(() => {
        toggleFormsCondition(false);
      }, 1000);
    })
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

  mainPinMarker.addTo(map);
};


