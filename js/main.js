import {initMap} from './map.js';
import {mainPinMarker} from './main-marker.js';
import {bindFormApi, getUserOffers} from './api.js';
import {showOffersMarker} from './filter-offers.js';
import {showMessageBlock} from './message-block.js';
import {formField, mapFilterForm, canvas} from './dom-elements.js';


initMap(canvas, mainPinMarker);
bindFormApi(formField, mapFilterForm, mainPinMarker);


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
