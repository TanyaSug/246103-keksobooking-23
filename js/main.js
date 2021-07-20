import {mainPinMarker} from './main-marker.js';
import {showMessageBlock} from './message-block.js';
import {submitForm, getUserOffers} from './api.js';
import {initMap} from './map.js';
import {showOffersMarker} from './same-markers.js';
import {formField, mapFilterForm, canvas, featuresInputs, filterSelects, formPriceInput, formTitleInput, formTypeSelect} from './dom-elements.js';
import {initializeFormTitleInput, initializePriceTypeValidators} from './form-validation.js';
import {resetFormAndMapField} from './form-data-reset.js';
import {toggleFormsCondition} from './toggle-form-condition.js';
import { collectCurrentFilters} from './collect-filters.js';
import {getCurrentFeatures} from './get-current-filters.js';
import {showAvatarPreview, showImgOfferPreview} from './avatar.js';

let timerId = 0;
const DEBOUNCE_TIMEOUT = 500;

const defaultFilters = {};
const userOffersPromised = getUserOffers();

const showCurrentMarkerValue = (allOffers) => {
  collectCurrentFilters(defaultFilters, featuresInputs, filterSelects);
  showOffersMarker(allOffers, defaultFilters);
};

// initial data fetching after filtering
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

// disable elements and initially map
toggleFormsCondition(true);
initMap(canvas, mainPinMarker, runFiltering);

initializeFormTitleInput(formTitleInput);
initializePriceTypeValidators(formPriceInput, formTypeSelect);

// subscribe submit and reset actions
submitForm(formField, mapFilterForm, mainPinMarker, runFiltering);
resetFormAndMapField(formField, mapFilterForm, runFiltering);

showAvatarPreview();
showImgOfferPreview();
