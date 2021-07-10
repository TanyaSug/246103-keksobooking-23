import {mainPinMarker} from './main-marker.js';
// import './user-offers.js';
// import './utils.js';
// import './data.js';
// import './card.js';
// import './form.js';
import {bindFormApi, getUserOffers} from './api.js';
import {initMap} from './map.js';
import {showSingleMarker, showOffersMarker} from './user-offers.js';

export const formField = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const canvas = document.querySelector('#map-canvas');
initMap(canvas, mainPinMarker);
bindFormApi(formField, mapFilterForm, mainPinMarker);

const filterSelects = mapFilterForm.querySelectorAll('select');

const featuresInputs = mapFilterForm.querySelectorAll('input[name=features]');
const getCurrentFeatures = (featuresInputs) => [...featuresInputs]
  .filter((element) => element.checked)
  .map((element) => element.value);
const currentFilters = {};
// [... a].reduce((a,b) => {a[b.name] = b.value; return a;},{})
const collectCurrentFilters = (currentFilters, featuresInputs, filterSelects) => {
  currentFilters.features = getCurrentFeatures(featuresInputs);
  [... filterSelects].reduce((accum, elem) => {accum[elem.name] = elem.value; return accum;}, currentFilters);
};

const showCurrentMarkerValue = (data) => {
  collectCurrentFilters(currentFilters, featuresInputs, filterSelects);
  showOffersMarker(data, currentFilters);
};

const allOffers = getUserOffers();
allOffers.then (showCurrentMarkerValue);

let timerId = 0;
const DEBOUNCE_TIMEOUT = 5000;
const runFiltering = () => {
  allOffers.then(showCurrentMarkerValue);
};

mapFilterForm.addEventListener('change', (evt) => {
  if (evt.target.name === 'features') {
    currentFilters.features = getCurrentFeatures(featuresInputs);
  } else {
    currentFilters[evt.target.name] = evt.target.value;
  }
  clearTimeout(timerId);
  timerId = setTimeout(runFiltering,DEBOUNCE_TIMEOUT);
});
