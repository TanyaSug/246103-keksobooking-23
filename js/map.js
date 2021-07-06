import {toggleFormsCondition, addressField} from './form.js';
import {createNewCard} from './card.js';
import {initialCoordinates} from './data.js';

const map = L.map('map-canvas')
  .on('load', () => {
    setTimeout(() => {
      toggleFormsCondition(false);

    }, 1000);
  })
  .setView({
    lat: initialCoordinates.lat,
    lng: initialCoordinates.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: initialCoordinates.lat,
  lng: initialCoordinates.lng,
},
{
  draggable: true,
  icon: mainPinIcon,
},
);
mainPinMarker.addTo(map);
const getCoordinate = (lat, lng) => `широта: ${lat.toFixed(4)}  долгота: ${lng.toFixed(4)}`;
mainPinMarker.on('drag', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressField.value = getCoordinate(lat, lng);
});

const createOfferMarker = (evt) => {
  evt.preventDefault();
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

const formField =  document.querySelector('.ad-form');
formField.addEventListener('submit', (evt) => {
  createOfferMarker(evt);
  formField.reset();
});
