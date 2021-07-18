import {initialCoordinates} from './initial-coords.js';
import {mainPinMarker} from './main-marker.js';
import {formPriceInput} from './dom-elements.js';

export const resetFormAndMapField = (formField, mapFilterForm) => {
  const formReset = formField.querySelector('.ad-form__reset');
  formReset.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: initialCoordinates.lat,
      lng: initialCoordinates.lng,
    });
    formField.reset();
    mapFilterForm.reset();
    formPriceInput.placeholder = 5000;
  });
};

