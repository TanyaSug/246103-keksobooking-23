import {formAddress} from './dom-elements.js';
import {initialCoordinates} from './initial-coords.js';

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

export const mainPinMarker = L.marker({
  lat: initialCoordinates.lat,
  lng: initialCoordinates.lng,
},
{
  draggable: true,
  icon: mainPinIcon,
},
);
const getCoordinate = (lat, lng) => `широта: ${lat.toFixed(4)}  долгота: ${lng.toFixed(4)}`;
mainPinMarker.on('drag', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  formAddress.value = getCoordinate(lat, lng);
});


