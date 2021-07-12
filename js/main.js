import {mainPinMarker} from './main-marker.js';
import {showMessageBlock} from './message-block.js';
import {bindFormApi, getUserOffers} from './api.js';
import {initMap} from './map.js';
import {showOffersMarker} from './user-offers.js';

// export const initialCoordinates =  {
//   lat: 35.68950,
//   lng: 139.69171,
// };

export const formField = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const canvas = document.querySelector('#map-canvas');

initMap(canvas, mainPinMarker);
bindFormApi(formField, mapFilterForm, mainPinMarker);

// export const markerGroup = L.layerGroup().addTo(map);

const filterSelects = mapFilterForm.querySelectorAll('select');
const featuresInputs = mapFilterForm.querySelectorAll('input[name=features]');

const getCurrentFeatures = (featuresInp) => [...featuresInp]
  .filter((element) => element.checked)
  .map((element) => element.value);

const defaultFilters = {};

const collectCurrentFilters = (currentFilters, featuresInp, selectedFilters) => {
  currentFilters.features = getCurrentFeatures(featuresInp);
  [...selectedFilters].reduce((accum, elem) => {
    accum[elem.name] = elem.value;
    return accum;
  }, currentFilters);
};

const showCurrentMarkerValue = (allOffers) => {
  collectCurrentFilters(defaultFilters, featuresInputs, filterSelects);
  showOffersMarker(allOffers, defaultFilters);
};

// initial data fetching after map initialization
const allOffersPromise = getUserOffers();
allOffersPromise.then(showCurrentMarkerValue).catch((errorText) => {
  showMessageBlock(false, errorText);
});

// initial data fetching after filtering
let timerId = 0;
const DEBOUNCE_TIMEOUT = 500;
const runFiltering = () => {
  allOffersPromise.then(showCurrentMarkerValue).catch((errorText) => {
    showMessageBlock(false, errorText);
  });
};

mapFilterForm.addEventListener('change', (evt) => {
  if (evt.target.name === 'features') {
    defaultFilters.features = getCurrentFeatures(featuresInputs);
  } else {
    defaultFilters[evt.target.name] = evt.target.value;
  }
  clearTimeout(timerId);
  timerId = setTimeout(runFiltering, DEBOUNCE_TIMEOUT);
});
