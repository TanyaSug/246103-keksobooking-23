import {toggleFormsCondition} from './toggle-form-condition.js';
import {initialCoordinates} from './initial-coords.js';
import {addMarkerTooltip} from './offer-card-popup.js';
import {getDataOffer} from './data-converter.js';

let map;
let markerGroup;

const MAP_RESOLUTION = 13;
const iconConfig = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

export const createOfferMarker = (mainPinMarker, data) => {
  const offerPinIcon = L.icon(iconConfig);
  const offerPinMarker = L.marker(

    mainPinMarker.getLatLng(),
    {
      icon: offerPinIcon,
    },
  );
  offerPinMarker
    .addTo(map)
    .bindPopup(addMarkerTooltip(data),
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


export const showSingleMarker = (data) => {
  const sameOfferIcon =  L.icon(iconConfig);
  const sameOfferMarker = L.marker({
    lat: data.location.lat,
    lng: data.location.lng,
  },
  {
    icon: sameOfferIcon,
  },
  );
  const dataOffer = getDataOffer(data);

  sameOfferMarker
    .addTo(markerGroup)
    .bindPopup(addMarkerTooltip(dataOffer),
      {
        keepInView: true,
      },
    );
};
export const clearLayer = () => {
  markerGroup.clearLayers();
};
export const hidePopup = () => {
  if(typeof map !== 'undefined') {
    map.closePopup();
  }
};
