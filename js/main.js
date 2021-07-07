import {mainPinMarker} from './main-marker.js';
import './user-offers.js';
// import './utils.js';
// import './data.js';
// import './card.js';
// import './form.js';
import {bindFormApi, getUserOffers} from './api.js';
import {initMap} from './map.js';
import {showSingleMarker, showOffersMarker} from './user-offers.js';

const formField = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const canvas = document.querySelector('#map-canvas');
initMap(canvas, mainPinMarker);
bindFormApi(formField, mapFilterForm, mainPinMarker);

const allOffers = getUserOffers();
allOffers.then (showOffersMarker);

mapFilterForm
