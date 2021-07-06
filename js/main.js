import './map.js';
import {mainPinMarker} from './main-marker.js';
// import './utils.js';
// import './data.js';
// import './card.js';
// import './form.js';
import {bindFormApi} from './api.js';
import {initMap} from './map.js';

const formField = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const canvas = document.querySelector('#map-canvas');
initMap(canvas, mainPinMarker);
bindFormApi(formField, mapFilterForm, mainPinMarker);
