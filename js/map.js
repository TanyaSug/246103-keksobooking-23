import {toggleFormsCondition} from './user-form.js';
import {initialCoordinates} from './initial-coords.js';
import {addMarkerTooltip, createUserOfferPopup} from './offer-card-popup.js';

export let map;
export let markerGroup;

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
    .bindPopup(createUserOfferPopup(),
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
  markerGroup = L.layerGroup().addTo(map);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
};

export const showSingleMarker = (offer) => {
  const sameOfferIcon =  L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const sameOfferMarker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng,
  },
  {
    icon: sameOfferIcon,
  },
  );
  sameOfferMarker
    .addTo(markerGroup)
    .bindPopup(addMarkerTooltip(offer),
      {
        keepInView: true,
      },
    );
};
export const clearLayer = () => {
  markerGroup.clearLayers();
};
