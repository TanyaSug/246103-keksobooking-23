import {initialCoordinates} from './initial-coords.js';
import {mainPinMarker} from './main-marker.js';
import {resetAvatarAndImgOfferPreview} from './avatar.js';
import {formPriceInput} from './dom-elements.js';
import {hidePopup} from './map.js';
import {typeAndPrice} from './type-settings.js';

export const resetFormAndMapField = (formField, mapFilterForm, runFiltering) => {
  const formReset = formField.querySelector('.ad-form__reset');
  formReset.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: initialCoordinates.lat,
      lng: initialCoordinates.lng,
    });
    formField.reset();
    mapFilterForm.reset();
    resetAvatarAndImgOfferPreview();
    formPriceInput.placeholder = typeAndPrice.house;
    hidePopup();
    runFiltering();
  });
};

