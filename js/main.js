import {mainPinMarker} from './main-marker.js';
import {showMessageBlock} from './message-block.js';
import {submitForm, getUserOffers} from './api.js';
import {initMap} from './map.js';
import {showOffersMarker} from './same-markers.js';
import {formField, mapFilterForm, canvas, featuresInputs, filterSelects} from './dom-elements.js';
import './form-validation.js';
import {resetFormAndMapField} from './form-data-reset.js';
import {toggleFormsCondition} from './toggle-form-condition.js';

let timerId = 0;
const DEBOUNCE_TIMEOUT = 500;

const defaultFilters = {};

const getCurrentFeatures = (featuresInp) => [...featuresInp]
  .filter((element) => element.checked)
  .map((element) => element.value);


const collectCurrentFilters = (currentFilters, featuresInp, selectedFilters) => {
  currentFilters.features = getCurrentFeatures(featuresInp);
  [...selectedFilters].reduce((accum, elem) => {
    accum[elem.name] = elem.value;
    return accum;
  }, currentFilters);
};

export const showCurrentMarkerValue = (allOffers) => {
  collectCurrentFilters(defaultFilters, featuresInputs, filterSelects);
  showOffersMarker(allOffers, defaultFilters);
};

// initial data fetching after filtering
const runFiltering = () => {
  getUserOffers().then(showCurrentMarkerValue).catch((errorText) => {
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

// disable elements ans initially map
toggleFormsCondition(true);
initMap(canvas, mainPinMarker);

// subscribe submit and reset actions
submitForm(formField, mapFilterForm, mainPinMarker);
resetFormAndMapField(formField,mapFilterForm);
