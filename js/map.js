import {toggleFormsCondition} from './toggle-form-condition.js';
import {initialCoordinates} from './initial-coords.js';
import {addMarkerTooltip, createUserOfferPopup} from './offer-card-popup.js';

export let map;
export let markerGroup;

const MAP_RESOLUTION = 13;
const iconConfig = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

export const createOfferMarker = (mainPinMarker) => {
  const offerPinIcon = L.icon(iconConfig);
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

export const initMap = (canvas, mainPinMarker, runFiltering) => {
  map = L.map(canvas)
    .on('load', () => {
      runFiltering().then(() => toggleFormsCondition(false));
    })
    .setView({
      lat: initialCoordinates.lat,
      lng: initialCoordinates.lng,
    }, MAP_RESOLUTION);

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
  const sameOfferIcon =  L.icon(iconConfig);
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
