import {toggleFormsCondition, addressField} from './form.js';
import {createNewCard} from './card.js';
import {initialCoordinates} from './data.js';
import {getUserOffers} from './user-offers.js';
// import {fetchOffers} from './main.js';


const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormsCondition(false);
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

const createUserOfferMarkers = (offers) => {
  offers.slice(0, 1).forEach((offer) => {
    const userOfferPinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const userOfferMarker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: userOfferPinIcon,
    },
    );

    userOfferMarker
      .addTo(map);
    // .bindPopup(JSON.stringify(offer, null, 2),
    //   {
    //     keepInView: true,
    //   },
    // );
  });
};

// fetch userOffers from server
const USER_OFFER_MARKERS_COUNT = 10;
getUserOffers().then((offers) => {
  createUserOfferMarkers(offers.slice(0, USER_OFFER_MARKERS_COUNT));
});

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

const createOfferMarker = () => {
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


// const formField =  document.querySelector('.ad-form');
// formField.addEventListener('submit', (evt) => {
//   createOfferMarker(evt);
//   formField.reset();
// });
export {createOfferMarker, mainPinMarker};
