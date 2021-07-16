import {mainPinMarker} from './main-marker.js';
import {showMessageBlock} from './message-block.js';
import {submitForm, getUserOffers} from './api.js';
import {initMap} from './map.js';
import {formField,mapFilterForm,canvas,featuresInputs} from './dom-elements.js';
import {initializeFormTitleInput,initializePriceTypeValidators} from './form-validation.js';
import {resetFormAndMapField} from './form-data-reset.js';
import {toggleFormsCondition} from './toggle-form-condition.js';
import {getCurrentFeatures} from './get-current-fitlers.js';
import {collectCurrentFilters} from './collect-filters.js';
import {showOffersMarker} from './same-markers.js';
import {filterSelects} from './dom-elements.js';
import {formPriceInput,formTitleInput,formTypeSelect} from './dom-elements.js';

let timerId = 0;
const DEBOUNCE_TIMEOUT = 500;

toggleFormsCondition(true);
initializeFormTitleInput(formTitleInput);
initializePriceTypeValidators(formPriceInput, formTypeSelect);

const defaultFilters = {};
const userOffersPromised = getUserOffers();

const showCurrentMarkerValue = (allOffers) => {
  collectCurrentFilters(defaultFilters, featuresInputs, filterSelects);
  showOffersMarker(allOffers, defaultFilters);
};

const runFiltering = () => userOffersPromised.then(showCurrentMarkerValue).catch((errorText) => {
  showMessageBlock(false, errorText);
});

mapFilterForm.addEventListener('change', (evt) => {
  if (evt.target.name === 'features') {
    defaultFilters.features = getCurrentFeatures(featuresInputs);
  } else {
    defaultFilters[evt.target.name] = evt.target.value;
  }
  clearTimeout(timerId);
  timerId = setTimeout(runFiltering, DEBOUNCE_TIMEOUT);
});

initMap(canvas, mainPinMarker, runFiltering);

submitForm(formField, mapFilterForm, mainPinMarker);
resetFormAndMapField(formField, mapFilterForm);
